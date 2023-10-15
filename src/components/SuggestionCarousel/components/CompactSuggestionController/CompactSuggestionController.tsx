import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import CompactSuggestionItem, {
  CompactSuggestionItemProps,
} from "../CompactSuggestionItem/CompactSuggestionItem";
import {
  HaloSavedSourceObjectType,
  Maybe,
  useHaloAddSourceSavedObjectMutation,
  useHaloConnectivityLazyQuery,
  useHaloDeleteSourceSavedObjectMutation,
  useHaloNodeDisplayImageUrlLazyQuery,
  useHaloNodeLazyQuery,
  useHaloSourcesQuery,
} from "../../../../generated/types";
import { Popper, useTheme } from "@mui/material";
import { getSuggestionItemAnimationDuration } from "../../SuggestionCarousel.constants";
import { sleep } from "../../../../utils/timing";
import FocusedSuggestion, {
  FocusedSuggestionProps,
} from "../FocusedSuggestion/FocusedSuggestion";
import { SuggestionItemProps } from "../types";
import { getHaloSourceGraphQLArgs } from "../../../../services/halo/halo";
import SaveControl, {
  SaveControlProps,
} from "../../../SaveControl/SaveControl";
import { useSnackbar } from "notistack";
import { SaveSnackbarProps } from "../../../SaveControl/components/SaveSnackbar";

export type CompactSuggestionControllerProps = SuggestionItemProps & {
  /**
   * A hint if this object should load immediately, or delay until in view.
   * This should be used for any items that couldn't be on the initial screen load.
   **/
  lazy?: CompactSuggestionItemProps["lazy"];
  nodeId?: Maybe<string>;
  sourceId?: string;
  sourceUrl?: string;
};
/**
 * Provides property translation from query results,
 * interaction tracking, and data loading to sync the display
 * of <FocusedSuggestion /> with the triggering <CompactSuggestionItem />.
 *
 * If you just need the <CompactSuggestionItem loading />, do not use this component.
 */
const CompactSuggestionController: FunctionComponent<
  CompactSuggestionControllerProps
> = ({ lazy, ...props }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const animationDuration = getSuggestionItemAnimationDuration(theme);
  const [element, setElement] =
    useState<CompactSuggestionItemProps["element"]>(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  // Node images are base64 encoded, if you request it, you've already loaded it.
  // img[loading=lazy] does nothing for you. So we'll instead use automatic firing and IntersectionObservers.
  // This will work because of the Apollo cache's merge of HaloNode by id and new properties.
  const [getNodeDisplayImage, nodeDisplayImageQuery] =
    useHaloNodeDisplayImageUrlLazyQuery({
      fetchPolicy: "no-cache",
    });

  useEffect(() => {
    if (!props.nodeId || !props.sourceId || !props.sourceUrl) {
      return;
    }
    if (props.displayImageUrl) {
      return;
    }

    const exec = () =>
      getNodeDisplayImage({
        variables: {
          id: props.nodeId!,
          sourceId: props.sourceId!,
          sourceUrl: props.sourceUrl!,
        },
      });

    if (!lazy) {
      exec();
      return;
    }

    // To save someone the trouble later. I attempted to use IntersectionObserver to load on demand.
    // I was defeated by some interaction with the flicking.js library's carousel. All of them
    // reported threshold 1 at all times.
    requestIdleCallback(exec);
  }, [
    getNodeDisplayImage,
    lazy,
    props.displayImageUrl,
    props.nodeId,
    props.sourceId,
    props.sourceUrl,
  ]);

  // Loads the extended node information to support the focused view
  const sourcesQuery = useHaloSourcesQuery();
  const [getNode, nodeQuery] = useHaloNodeLazyQuery();
  const [getConnectivity, connectivityQuery] = useHaloConnectivityLazyQuery();

  const onFocusIntended: NonNullable<
    CompactSuggestionItemProps["onFocusIntended"]
  > = useCallback(() => {
    if (!props.nodeId || !props.sourceId || !props.sourceUrl) {
      return;
    }

    const sourceArgs = getHaloSourceGraphQLArgs({
      id: props.sourceId,
      sourceUrl: props.sourceUrl,
    });
    getNode({ variables: { ...sourceArgs, id: props.nodeId! } });
    getConnectivity({ variables: sourceArgs });
  }, [getNode, getConnectivity, props.nodeId, props.sourceId, props.sourceUrl]);

  const onFocusCaptured: NonNullable<
    CompactSuggestionItemProps["onFocusCaptured"]
  > = useCallback((element) => {
    dispatch({ type: "focus", element });
  }, []);

  const onImageLoaded: NonNullable<FocusedSuggestionProps["onImageLoaded"]> =
    useCallback(() => {
      dispatch({ type: "expand" });
    }, []);

  const onDismiss: FocusedSuggestionProps["onDismiss"] =
    useCallback(async () => {
      dispatch({ type: "collapse" });
      await sleep(animationDuration);
      requestAnimationFrame(() => {
        dispatch({ type: "reset" });
      });
    }, [animationDuration]);

  const [addSavedObject, addSavedObjectMutation] =
    useHaloAddSourceSavedObjectMutation();
  const [deleteSavedObject, deleteSavedObjectMutation] =
    useHaloDeleteSourceSavedObjectMutation();

  const SaveControlInstance = useMemo(() => {
    const node = nodeQuery.data?.halo.node;
    const saved: boolean = !!node?.saved;
    const onClick: SaveControlProps["onClick"] = async () => {
      const saveAlertDefaults: Pick<
        SaveSnackbarProps,
        "displayImageUrl" | "displayName"
      > = {
        displayName: node?.displayName,
        displayImageUrl: node?.displayImageUrl,
      };

      if (node?.saved?.id) {
        return deleteSavedObject({
          variables: { id: node?.saved?.id },
          onCompleted: () => {
            enqueueSnackbar({
              ...saveAlertDefaults,
              variant: "save",
              action: "removed",
            });
            nodeQuery.refetch();
          },
          onError: (error) =>
            enqueueSnackbar({
              ...saveAlertDefaults,
              variant: "save",
              action: "removed",
              error,
            }),
        });
      }

      if (props.sourceId && node?.id) {
        return addSavedObject({
          variables: {
            objectId: node!.id,
            objectType: HaloSavedSourceObjectType.HaloNode,
            sourceId: props.sourceId,
          },
          onCompleted: () => {
            enqueueSnackbar({
              ...saveAlertDefaults,
              variant: "save",
              action: "saved",
            });
            nodeQuery.refetch();
          },
          onError: (error) =>
            enqueueSnackbar({
              ...saveAlertDefaults,
              variant: "save",
              action: "saved",
              error,
            }),
        });
      }
    };

    return (
      <SaveControl
        disabled={!!nodeQuery.error || !node}
        loading={nodeQuery.loading}
        mutating={
          addSavedObjectMutation.loading || deleteSavedObjectMutation.loading
        }
        onClick={onClick}
        saved={saved}
      />
    );
  }, [
    enqueueSnackbar,
    addSavedObject,
    addSavedObjectMutation,
    deleteSavedObject,
    deleteSavedObjectMutation,
    props.sourceId,
    nodeQuery,
  ]);

  const displayImageUrl =
    props.displayImageUrl ||
    nodeDisplayImageQuery.data?.halo.node.displayImageUrl;

  return (
    <>
      <CompactSuggestionItem
        {...props}
        element={element}
        setElement={setElement}
        displayImageUrl={displayImageUrl}
        loading={
          !props.displayImageUrl &&
          (!nodeDisplayImageQuery.called || nodeDisplayImageQuery.loading)
        }
        lazy={lazy}
        onFocusIntended={onFocusIntended}
        onFocusCaptured={onFocusCaptured}
      />
      {state.focused && state.element && (
        <Popper
          open
          anchorEl={state.element}
          sx={{ zIndex: theme.zIndex.tooltip }}
          placement={"bottom"}
          popperOptions={{
            modifiers: [
              { name: "flip", enabled: false },
              {
                name: "offset",
                enabled: true,
                options: {
                  offset: [
                    0,
                    // Shift up exactly enough to cover the anchor
                    state.element.clientHeight * -1 -
                      // And some additional pixels to cover rounding errors
                      3,
                  ],
                },
              },
            ],
          }}
        >
          <FocusedSuggestion
            {...props}
            anchorWidth={state.element.clientWidth}
            displayImageUrl={displayImageUrl}
            expanded={state.expanded}
            connectivityQuery={connectivityQuery}
            nodeQuery={nodeQuery}
            onDismiss={onDismiss}
            onImageLoaded={onImageLoaded}
            sourcesQuery={sourcesQuery}
            SaveControl={SaveControlInstance}
          />
        </Popper>
      )}
    </>
  );
};
export default CompactSuggestionController;

type State = {
  focused: boolean;
  expanded: boolean;
  element?: HTMLElement;
};
const initialState: State = {
  focused: false,
  expanded: false,
};
export type StateAction =
  | { type: "reset" }
  | {
      type: "focus";
      element: HTMLElement;
    }
  | {
      type: "expand";
    }
  | {
      type: "collapse";
    };
const reducer = (state: State, action: StateAction): State => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "focus":
      return {
        ...state,
        focused: true,
        element: action.element,
      };
    case "expand":
      return {
        ...state,
        expanded: true,
      };
    case "collapse":
      return {
        ...state,
        expanded: false,
      };
  }
};
