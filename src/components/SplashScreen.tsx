import { Image } from "expo-image";
import * as NativeSplash from "expo-splash-screen";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const SplashScreen = () => {
  useEffect(() => {
    NativeSplash.hideAsync();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white gap-6">
      <Image
        source={require("@/assets/images/logo.png")}
        style={{ width: 100, height: 100 }}
        contentFit="contain"
      />
      <ActivityIndicator size="small" color="#a3a3a3" />
    </View>
  );
};

export default SplashScreen;