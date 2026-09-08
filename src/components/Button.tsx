import { Pressable, Text } from "react-native";

type buttonTypes = "default" | "primary" | "danger" | "link";
type buttonSizes = "small" | "middle" | "large";

interface IButton {
  children: any;
  type?: buttonTypes;
  size?: buttonSizes;
  disabled?: boolean;
  onPress?: () => void;
}

const typeClass: Record<buttonTypes, any> = {
  default: {
    root: "border border-neutral-300 rounded-lg w-full bg-white group active:border-blue-500 active:bg-blue-50",
    child:
      "text-neutral-800 font-medium text-center group-active:text-blue-500 transition-all ease-in-out duration-150",
  },
  primary: {
    root: "border border-teal-500 rounded-lg w-full bg-teal-400 group active:bg-teal-600 active:border-teal-600",
    child:
      "text-white font-medium text-center transition-all ease-in-out duration-150",
  },
  danger: {
    root: "border border-red-500 rounded-lg w-full bg-white group active:bg-red-50 active:border-red-600",
    child:
      "text-red-500 font-medium text-center group-active:text-red-600 transition-all ease-in-out duration-150",
  },
  link: {
    root: "w-auto group",
    child:
      "text-blue-600 font-medium text-center group-active:text-blue-700 group-active:underline transition-all ease-in-out duration-150",
  },
};

const sizeClass: Record<buttonSizes, any> = {
  small: {
    root: "px-3 py-1",
    child: "text-sm",
  },
  middle: {
    root: "px-4 py-2",
    child: "text-base",
  },
  large: {
    root: "px-5 py-2.5",
    child: "text-lg",
  },
};

const disabledClass = {
  root: "opacity-40 border-neutral-200 bg-neutral-100",
  child: "text-neutral-400",
};

const Button = ({
  children,
  type = "default",
  size = "middle",
  disabled = false,
  onPress,
}: IButton) => {
  const rootClass = [
    typeClass[type].root,
    sizeClass[size].root,
    disabled ? disabledClass.root : "",
  ].join(" ");

  const childClass = [
    typeClass[type].child,
    sizeClass[size].child,
    disabled ? disabledClass.child : "",
  ].join(" ");

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      className={rootClass}
    >
      <Text className={childClass}>{children}</Text>
    </Pressable>
  );
};

export default Button;
