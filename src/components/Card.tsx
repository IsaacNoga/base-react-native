import { View } from "react-native";

interface ICard {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: ICard) => {
  return (
    <View
      className={
        className ? className : "border border-neutral-300 p-4 bg-white"
      }
    >
      {children}
    </View>
  );
};

export default Card;
