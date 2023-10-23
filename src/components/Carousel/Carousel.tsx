import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
  useReducer,
} from "react";
import Flicking, { FlickingProps, ViewportSlot } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { useTheme } from "@mui/material";
import { Arrow as ArrowPlugin } from "@egjs/flicking-plugins";
import Arrow, {
  nextArrowClassName,
  previousArrowClassName,
} from "./components/CarouselArrow/CarouselArrow";
import { DIRECTION } from "@egjs/flicking/src/const/external";
import { Plugin } from "@egjs/flicking";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";

export type CarouselProps = {
  arrows?: {
    enabled?: false | true | "hover";
    behavior?: "item" | "viewport";
  };
  flickingProps?: Partial<FlickingProps>;
  /** A set of CarouselPanels */
  children: ReactNode;
};
const Carousel: FunctionComponent<CarouselProps> = ({
  arrows,
  flickingProps,
  children,
}) => {
  const theme = useTheme();
  const duration =
    theme.transitions.duration.complex *
    (arrows?.behavior === "viewport" ? 2 : 1);
  const plugins = useMemo(
    () =>
      [
        arrows?.enabled
          ? new ArrowPlugin({
              prevElSelector: `.${previousArrowClassName}`,
              nextElSelector: `.${nextArrowClassName}`,
              moveByViewportSize: arrows.behavior === "viewport",
            })
          : undefined,
      ].filter(Boolean) as Plugin[],
    [arrows?.enabled, arrows?.behavior],
  );

  // https://naver.github.io/egjs-flicking/docs/quick-start
  const [state, dispatch] = useReducer(reducer, initialState);

  const onMouseEnter = useCallback(() => {
    dispatch({ type: "mouseEnter" });
  }, []);
  const onMouseLeave = useCallback(() => {
    dispatch({ type: "mouseLeave" });
  }, []);

  useLayoutEffect(() => {
    if (!state.flicking) {
      return;
    }

    const element = state.flicking.element;
    element.addEventListener("mouseenter", onMouseEnter);
    element.addEventListener("mouseleave", onMouseLeave);
    return () => {
      element.removeEventListener("mouseenter", onMouseEnter);
      element.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [state.flicking, onMouseEnter, onMouseLeave]);

  return (
    <ErrorBoundary>
      <Flicking
        plugins={plugins}
        align="prev"
        useResizeObserver
        resizeDebounce={100}
        duration={duration}
        circular
        circularFallback={"bound"}
        onReady={(e) => {
          dispatch({ type: "initialize", flicking: e.currentTarget });

          // state.flicking.camera.rangeDiff >= state.flicking.camera.size
          // state.flicking.circularEnabled
          // debugger;
        }}
        onMove={(e) => {
          switch (e.direction) {
            case DIRECTION.NEXT:
              dispatch({ type: "next" });
              break;
            case DIRECTION.PREV:
              dispatch({ type: "previous" });
              break;
          }
        }}
        {...flickingProps}
      >
        {children}
        <ViewportSlot>
          {arrows?.enabled && (
            <>
              <Arrow
                direction={"previous"}
                visible={
                  arrows.enabled === true ||
                  (arrows.enabled === "hover" && state.hovered)
                }
              />
              <Arrow
                direction={"next"}
                visible={
                  arrows.enabled === true ||
                  (arrows.enabled === "hover" && state.hovered)
                }
              />
            </>
          )}
        </ViewportSlot>
      </Flicking>
    </ErrorBoundary>
  );
};
export default Carousel;

type State = {
  flicking?: Flicking;
  hasPaged: boolean;
  hovered: boolean;
};
const initialState: State = {
  flicking: undefined,
  hasPaged: false,
  hovered: false,
};
export type StateAction =
  | { type: "reset" }
  | { type: "initialize"; flicking: Flicking }
  | {
      type: "mouseEnter";
    }
  | {
      type: "mouseLeave";
    }
  | {
      type: "next";
    }
  | {
      type: "previous";
    };
const reducer = (state: State, action: StateAction): State => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "initialize":
      return {
        ...initialState,
        flicking: action.flicking,
      };
    case "mouseEnter":
      return {
        ...state,
        hovered: true,
      };
    case "mouseLeave":
      return {
        ...state,
        hovered: false,
      };
    case "next":
    case "previous":
      return {
        ...state,
        hasPaged: true,
      };
  }
};
