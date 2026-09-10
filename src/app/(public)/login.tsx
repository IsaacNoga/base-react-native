import { Button, Col, FormItem, Row } from "@/components";
import { useAuth } from "@/features/auth/context";
import { Login, login as LoginSchema } from "@/features/auth/schemas";
import { ApiError } from "@/lib/api/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { usuario: "", clave: "" },
    mode: "onChange",
  });

  const onLogin = handleSubmit(async (data: Login) => {
    setError(null);
    try {
      const res = await login(data);
      router.replace("/");
    } catch (e) {
      setError(
        e instanceof ApiError
          ? e.message
          : "No se pudo iniciar sesión. Inténtalo de nuevo.",
      );
    }
  });

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
            Ingresa tus credenciales para acceder a tu cuenta.
          </Text>
        </View>
      </View>
      <Row gutter={[5, 5]}>
        <Col span={24}>
          <FormItem
            label="Correo"
            name="usuario"
            control={control}
            render={({ value, onChange }) => (
              <TextInput
                className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-base"
                placeholder="correo@correo.com"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </Col>
        <Col span={24}>
          <FormItem
            label="Contraseña"
            name="clave"
            control={control}
            render={({ value, onChange }) => (
              <TextInput
                className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-base"
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
            )}
          />
        </Col>
      </Row>
      <View className="w-full">
        {error ? (
          <Text className="mb-2 text-sm text-red-500">{error}</Text>
        ) : null}
        <Button onPress={onLogin} disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </Button>
      </View>
      <View className="h-px w-full bg-neutral-300 my-10" />
      <View className="w-full flex flex-col gap-4">
        <Text className="font-semibold text-md text-center text-neutral-500">
          ¿Aún no tienes una cuenta?
        </Text>
        <View className="w-full">
          <Pressable
            onPress={() => router.replace("/registro")}
            className="px-4 py-1.5 border border-neutral-400 rounded-xl w-full group active:border-teal-500 active:bg-teal-100"
          >
            <Text className="text-black font-semibold text-center text-lg active:text-teal-400 active:scale-105 transition-all ease-in-out duration-200">
              Registrarme
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
