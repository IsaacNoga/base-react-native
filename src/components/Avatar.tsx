import React from "react";
import { Image, Text, View, ViewStyle } from "react-native";

type AvatarSize = "small" | "default" | "large" | number;
type AvatarShape = "circle" | "square";

interface AvatarProps {
  children?: React.ReactNode;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  className?: string;
  style?: ViewStyle;
}

const SIZE_MAP: Record<Exclude<AvatarSize, number>, number> = {
  small: 24,
  default: 40,
  large: 64,
};

const Avatar = ({
  children,
  src,
  alt,
  size = "default",
  shape = "circle",
  className = "",
  style,
}: AvatarProps) => {
  const dimension = typeof size === "number" ? size : SIZE_MAP[size];
  const borderRadius = shape === "circle" ? dimension / 2 : dimension * 0.2;
  const fontSize = dimension * 0.4;

  return (
    <View
      className={`${className} bg-neutral-100 justify-center items-center overflow-hidden`}
      style={[
        {
          width: dimension,
          height: dimension,
          borderRadius,
        },
        style,
      ]}
    >
      {src ? (
        <Image
          source={{ uri: src }}
          accessibilityLabel={alt}
          style={{ width: dimension, height: dimension }}
          resizeMode="cover"
        />
      ) : typeof children === "string" ? (
        <Text
          style={{ fontSize }}
          className="text-neutral-600 font-medium"
          numberOfLines={1}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
};

export default Avatar;
