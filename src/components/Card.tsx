import { View } from "react-native";

interface ICard {
  hoverable?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className, hoverable = false }: ICard) => {
  return (
    <View
      className={
        hoverable
          ? `${className} border border-neutral-300 p-4 bg-white rounded-lg drop-shadow-md transition-transform ease-in-out duration-200`
          : `${className} border border-neutral-300 p-4 bg-white rounded-lg drop-shadow-md`
      }
    >
      {children}
    </View>
  );
};

export default Card;
