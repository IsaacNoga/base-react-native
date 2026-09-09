import { api } from "@/lib/api/client";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  const fetchTest = async () => {
    const res = await api.get(
      "pos/cliente/buscar-cliente.json?buscar=6622793384&limite=50",
    );
    console.log(res);
  };

  return (
    <View className="flex-col justify-center items-center h-full gap-4 p-6 bg-white">
      <View className="flex flex-col gap-10 justify-center items-center">
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: 100, height: 100 }}
          contentFit="contain"
        />
        <View className="flex-col items-center gap-1">
          <Text className="font-bold text-xl">¡Bienvenido de Nuevo!</Text>
          <Text className="font-semibold text-xs text-center text-neutral-400">
            Ingresa tus credenciales para acceder a tu Monedero Digital.
          </Text>
        </View>
      </View>
      <View className="w-full">
        <View className="w-full gap-1">
          <Text className="text-lg font-medium text-red-500 flex flex-row gap-1 items-center">
            *
            <Text className="text-xs font-medium text-neutral-700">
              CORREO ELECTRÓNCIO O TELÉFONO
            </Text>
          </Text>
          <TextInput
            className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-base"
            placeholder="ejemplo@correo.com"
          />
        </View>
      </View>
      <View className="w-full">
        <Pressable
          className="bg-teal-400 px-4 py-1.5 rounded-xl w-full active:opacity-80 transition-opacity ease-in-out duration-200"
          onPress={fetchTest}
        >
          <Text className="text-white font-semibold text-center text-lg">
            Ingresar
          </Text>
        </Pressable>
      </View>
      <View className="h-px w-full bg-neutral-300 my-10" />
      <View className="w-full flex flex-col gap-4">
        <Text className="font-semibold text-md text-center text-neutral-500">
          ¿Aún no tienes una cuenta de Turquessa Rewards?
        </Text>
        <View className="w-full">
          <Pressable
            onPress={() => router.replace("/registro")}
            className="px-4 py-1.5 border border-neutral-400 rounded-xl w-full group active:border-teal-500 active:bg-teal-100"
          >
            <Text className="text-black font-semibold text-center text-lg active:text-teal-400 active:scale-105 transition-all ease-in-out duration-200">
              Registrarme gratis
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
