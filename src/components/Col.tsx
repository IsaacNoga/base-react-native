import {
  Breakpoint,
  BREAKPOINT_ORDER,
  getCurrentBreakpoint,
} from "@/hooks/breakpoints";
import { useRowContext } from "@/hooks/RowContext";
import React from "react";
import { useWindowDimensions, View, ViewStyle } from "react-native";

const GRID_COLUMNS = 24;

type ColSize = number | { span?: number; offset?: number };

interface IColProps {
  span?: number;
  offset?: number;
  xs?: ColSize;
  sm?: ColSize;
  md?: ColSize;
  lg?: ColSize;
  xl?: ColSize;
  xxl?: ColSize;
  style?: ViewStyle;
  className?: string;
  children?: React.ReactNode;
}

const normalize = (value?: ColSize) => {
  if (value === undefined) return {};
  if (typeof value === "number") return { span: value };
  return value;
};

const Col = (props: IColProps) => {
  const {
    span = 24,
    offset = 0,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    style,
    className,
    children,
  } = props;
  const { width } = useWindowDimensions();
  const { gutter } = useRowContext();
  const [gutterH, gutterV] = gutter;

  const breakpointValues: Partial<Record<Breakpoint, ColSize>> = {
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
  };
  const current = getCurrentBreakpoint(width);

  let resolved: { span?: number; offset?: number } = {};
  const currentIndex = BREAKPOINT_ORDER.indexOf(current);
  for (let i = currentIndex; i >= 0; i--) {
    const bp = BREAKPOINT_ORDER[i];
    if (breakpointValues[bp] !== undefined) {
      resolved = normalize(breakpointValues[bp]);
      break;
    }
  }

  const finalSpan = resolved.span ?? span;
  const finalOffset = resolved.offset ?? offset;

  return (
    <View
      className={className}
      style={[
        {
          width: `${(finalSpan / GRID_COLUMNS) * 100}%`,
          marginLeft: finalOffset
            ? `${(finalOffset / GRID_COLUMNS) * 100}%`
            : 0,
          paddingHorizontal: gutterH / 2,
          paddingTop: gutterV / 2,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Col;
