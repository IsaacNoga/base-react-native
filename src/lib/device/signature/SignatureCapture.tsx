import { useMemo, useRef, useState } from "react";
import { PanResponder, Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import type { Signature } from "./contracts";

interface Point {
  x: number;
  y: number;
}

interface SignatureCaptureProps {
  onChange?: (signature: Signature | null) => void;
}

function toPath(points: Point[]) {
  if (points.length === 0) return "";
  if (points.length === 1) {
    const point = points[0];
    return `M ${point.x} ${point.y} L ${point.x + 0.1} ${point.y + 0.1}`;
  }

  return points.reduce(
    (path, point, index) =>
      index === 0 ? `M ${point.x} ${point.y}` : `${path} L ${point.x} ${point.y}`,
    "",
  );
}

export function SignatureCapture({ onChange }: SignatureCaptureProps) {
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [activePath, setActivePath] = useState<Point[]>([]);
  const activeStroke = useRef<Point[]>([]);

  const notify = (nextStrokes: Point[][]) => {
    onChange?.(
      nextStrokes.length > 0
        ? { format: "svg", paths: nextStrokes.map(toPath) }
        : null,
    );
  };

  const responder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (event) => {
          activeStroke.current = [
            {
              x: event.nativeEvent.locationX,
              y: event.nativeEvent.locationY,
            },
          ];
          setActivePath(activeStroke.current);
        },
        onPanResponderMove: (event) => {
          activeStroke.current.push({
            x: event.nativeEvent.locationX,
            y: event.nativeEvent.locationY,
          });
          setActivePath([...activeStroke.current]);
        },
        onPanResponderRelease: () => {
          if (activeStroke.current.length > 0) {
            const nextStrokes = [...strokes, activeStroke.current];
            setStrokes(nextStrokes);
            notify(nextStrokes);
          }
          activeStroke.current = [];
          setActivePath([]);
        },
      }),
    [strokes, onChange],
  );

  const clear = () => {
    activeStroke.current = [];
    setStrokes([]);
    setActivePath([]);
    notify([]);
  };

  return (
    <View>
      <View
        {...responder.panHandlers}
        accessibilityLabel="Área para capturar firma"
        className="h-52 overflow-hidden rounded-xl border border-dashed border-neutral-400 bg-white"
      >
        <Svg width="100%" height="100%">
          {[...strokes, activePath].map((stroke, index) => (
            <Path
              key={`${index}-${stroke.length}`}
              d={toPath(stroke)}
              fill="none"
              stroke="#0f766e"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
            />
          ))}
        </Svg>
      </View>
      <Pressable className="mt-2 self-end px-2 py-1" onPress={clear}>
        <Text className="text-sm font-medium text-teal-700">Limpiar firma</Text>
      </Pressable>
    </View>
  );
}
