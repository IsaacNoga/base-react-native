import { AuthProvider, useAuth } from "@/features/auth/context";
import AppSplashScreen from "@/components/SplashScreen";
import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

function RootNavigation() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <AppSplashScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function MainLayout() {
  const queryClient = new QueryClient();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RootNavigation />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
