import {
  FunctionComponent,
  useCallback,
  useLayoutEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import CompactSuggestionItem, {
  CompactSuggestionItemProps,
} from "../CompactSuggestionItem/CompactSuggestionItem";
import { Popper, useTheme } from "@mui/material";
import { getSuggestionItemAnimationDuration } from "../../SuggestionCarousel.constants";
import FocusedSuggestion, {
  FocusedSuggestionProps,
} from "../FocusedSuggestion/FocusedSuggestion";
import { SuggestionItemProps } from "../types";
import SaveControl, {
  SaveControlProps,
} from "../../../SaveControl/SaveControl";
import { useSnackbar } from "notistack";
import { SaveSnackbarProps } from "../../../SaveControl/components/SaveSnackbar";
import {
  Maybe,
  useContentAddSavedObjectMutation,
  useContentDeleteSavedObjectMutation,
  useContentItemDisplayImageUrlLazyQuery,
  useContentItemLazyQuery,
} from "../../../../generated/types";
import { sleep } from "../../../../utils/timing";

export type CompactSuggestionControllerProps = SuggestionItemProps & {
  /**
   * A hint if this object should load immediately, or delay until in view.
   * This should be used for any items that couldn't be on the initial screen load.
   **/
  lazy?: CompactSuggestionItemProps["lazy"];
  id?: Maybe<string>;
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
    useContentItemDisplayImageUrlLazyQuery({
      fetchPolicy: "no-cache",
    });

  const intersectionObserver = useMemo(
    () =>
      new IntersectionObserver(
        (entries, observer) => {
          if (!entries.at(0)?.isIntersecting) {
            return;
          }
          observer.disconnect();

          if (
            // Already included, skip it
            props.displayImageUrl ||
            // Nothing to request, skip it
            !props.id
          ) {
            return;
          }

          getNodeDisplayImage({
            variables: { id: props.id! },
          });
        },
        {
          rootMargin: "-30px 0px 0px -30px",
          threshold: 0.02,
        },
      ),

    [getNodeDisplayImage, props.displayImageUrl, props.id],
  );
  useLayoutEffect(() => {
    if (!element) {
      return;
    }

    intersectionObserver.observe(element);
    return () => {
      intersectionObserver.disconnect();
    };
  }, [intersectionObserver, element]);

  // Loads the extended node information to support the focused view
  const [getItem, itemQuery] = useContentItemLazyQuery();

  const onFocusIntended: NonNullable<
    CompactSuggestionItemProps["onFocusIntended"]
  > = useCallback(() => {
    if (!props.id) {
      return;
    }

    getItem({ variables: { id: props.id! } });
  }, [getItem, props.id]);

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
    useContentAddSavedObjectMutation();
  const [deleteSavedObject, deleteSavedObjectMutation] =
    useContentDeleteSavedObjectMutation();

  const SaveControlInstance = useMemo(() => {
    const item = itemQuery.data?.content.item;
    const saved: boolean = !!item?.saved;
    const onClick: SaveControlProps["onClick"] = async () => {
      const saveAlertDefaults: Pick<
        SaveSnackbarProps,
        "displayImageUrl" | "displayName"
      > = {
        displayName: item?.displayName,
        displayImageUrl: item?.displayImageUrl,
      };

      if (item?.saved?.id) {
        return deleteSavedObject({
          variables: { id: item?.saved?.id },
          onCompleted: () => {
            enqueueSnackbar({
              ...saveAlertDefaults,
              variant: "save",
              action: "removed",
            });
            itemQuery.refetch();
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

      if (item?.id) {
        return addSavedObject({
          variables: {
            objectId: item!.id,
          },
          onCompleted: () => {
            enqueueSnackbar({
              ...saveAlertDefaults,
              variant: "save",
              action: "saved",
            });
            itemQuery.refetch();
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
        disabled={!!itemQuery.error || !item}
        loading={itemQuery.loading}
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
    itemQuery,
  ]);

  const displayImageUrl =
    props.displayImageUrl ||
    nodeDisplayImageQuery.data?.content.item.displayImageUrl;

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
            itemQuery={itemQuery}
            onDismiss={onDismiss}
            onImageLoaded={onImageLoaded}
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
