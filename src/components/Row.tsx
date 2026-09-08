import { RowContext } from "@/hooks/RowContext";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type Justify =
  | "start"
  | "end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
type Align = "top" | "middle" | "bottom" | "stretch";

interface IRowProps {
  gutter?: number | [number, number];
  justify?: Justify;
  align?: Align;
  style?: ViewStyle;
  children?: React.ReactNode;
}

const justifyMap: Record<Justify, ViewStyle["justifyContent"]> = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  "space-between": "space-between",
  "space-around": "space-around",
  "space-evenly": "space-evenly",
};

const alignMap: Record<Align, ViewStyle["alignItems"]> = {
  top: "flex-start",
  middle: "center",
  bottom: "flex-end",
  stretch: "stretch",
};

const Row = ({
  gutter = 0,
  justify = "start",
  align = "stretch",
  style,
  children,
}: IRowProps) => {
  const [gutterH, gutterV] = Array.isArray(gutter) ? gutter : [gutter, 0];

  return (
    <RowContext.Provider value={{ gutter: [gutterH, gutterV] }}>
      <View
        style={[
          styles.row,
          {
            justifyContent: justifyMap[justify],
            alignItems: alignMap[align],
            marginHorizontal: -gutterH / 2,
            marginTop: -gutterV / 2,
          },
          style,
        ]}
      >
        {children}
      </View>
    </RowContext.Provider>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Row;
