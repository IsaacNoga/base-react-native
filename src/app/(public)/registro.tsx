import { Avatar, Button, Col, FormItem, Row } from "@/components";
import { Image } from "expo-image";
import { Coffee, Gift, ShieldAlert, Wallet } from "lucide-react-native";
import { useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

export default function RegistroScreen() {
  const { control, handleSubmit } = useForm({
    defaultValues: { nombre: "", correo: "", telefono: "" },
  });

  return (
    <View className="flex-1 justify-center items-center h-full gap-4 p-4">
      <Image
        source={require("@/assets/images/background.jpg")}
        className="brightness-80"
        style={{ position: "absolute", width: "100%", height: "100%" }}
        contentFit="cover"
      />
      <View className="flex flex-col gap-1 bg-white p-6 h-full rounded-xl">
        <View className="flex flex-col justify-center items-center">
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: 120, height: 120 }}
            contentFit="contain"
          />
          <Text className="font-semibold text-lg text-teal-400">
            • Rewards •
          </Text>
          <Text className="font-semibold text-xl">
            Únete a Turquessa Rewards
          </Text>
          <Text className="text-center text-md text-neutral-400">
            Regístrate en segundos y comienza a acumular pesos en tu wallet para
            utilizarlos en tus próximas visitas.
          </Text>
        </View>
        <View className="w-full flex flex-col gap-5">
          <Row>
            <Col span={24}>
              <FormItem
                label="Nombre Completo"
                name="nombre"
                control={control}
                render={({ value, onChange }) => (
                  <TextInput
                    className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-base"
                    placeholder="Su nombre"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <FormItem
                label="Correo"
                name="correo"
                control={control}
                render={({ value, onChange }) => (
                  <TextInput
                    className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-base"
                    placeholder="ejemplo@correo.com"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <FormItem
                label="Teléfono"
                name="telefono"
                control={control}
                render={({ value, onChange }) => (
                  <TextInput
                    className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-base"
                    placeholder="ejemplo@correo.com"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </Col>
          </Row>
          <View className="w-full flex flex-col gap-2">
            <Button type="primary">Registrar</Button>
            <Text className="font-semibold text-xs text-neutral-400 text-center">
              ¿Ya tienes una cuenta de Turquessa Rewards? Iniciar Sesión
            </Text>
          </View>
          <Row>
            <Col span={8} className="items-center">
              <Avatar>
                <Wallet className="text-teal-400" />
              </Avatar>
              <Text className="text-[10px] font-semibold text-center w-4/5">
                Acumula en cada compra
              </Text>
            </Col>
            <Col span={8} className="items-center">
              <Avatar>
                <Gift className="text-teal-400" />
              </Avatar>
              <Text className="text-[10px] font-semibold text-center w-4/5">
                Saldo en pesos mexicanos
              </Text>
            </Col>
            <Col span={8} className="items-center">
              <Avatar>
                <Coffee className="text-teal-400" />
              </Avatar>
              <Text className="text-[10px] font-semibold text-center w-4/5">
                Úsalo en tus próximas visitas
              </Text>
            </Col>
          </Row>
          <View className="flex gap-1">
            <Text className="flex flex-row text-[10px] text-center text-neutral-400">
              <ShieldAlert />
              Tus datos se utilizarán únicamente para identificar tu cuenta de
              recompensas y administrar el saldo de tu wallet.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
