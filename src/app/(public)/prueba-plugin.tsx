import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { CameraCapture } from "@/lib/device/camera/CameraCapture";
import { deviceServices } from "@/lib/device/deviceServices";
import type { DeviceLocation } from "@/lib/device/location/contracts";
import { SignatureCapture } from "@/lib/device/signature/SignatureCapture";
import type { Signature } from "@/lib/device/signature/contracts";

function ActionButton({
  children,
  onPress,
  disabled = false,
}: {
  children: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      className={`rounded-xl px-4 py-3 ${disabled ? "bg-neutral-300" : "bg-teal-600 active:bg-teal-700"}`}
      disabled={disabled}
      onPress={onPress}
    >
      <Text className="text-center font-semibold text-white">{children}</Text>
    </Pressable>
  );
}

export default function PruebaPluginScreen() {
  const [location, setLocation] = useState<DeviceLocation | null>(null);
  const [message, setMessage] = useState(
    "Prueba cada plugin y confirma los permisos del dispositivo.",
  );
  const [signature, setSignature] = useState<Signature | null>(null);

  const getLocation = async () => {
    const permission = await deviceServices.location.requestPermission();
    if (!permission.granted) {
      setMessage("Se necesita permiso de ubicación para consultar el GPS.");
      return;
    }

    try {
      const currentLocation = await deviceServices.location.getCurrent();
      setLocation(currentLocation);
      setMessage("Ubicación obtenida correctamente.");
    } catch {
      setMessage("No fue posible obtener la ubicación actual.");
    }
  };

  return (
    <ScrollView className="flex-1 bg-neutral-100" contentContainerClassName="gap-6 p-5">
      <View className="gap-1">
        <Text className="text-2xl font-bold text-neutral-900">Prueba de plugins</Text>
        <Text className="text-sm text-neutral-600">{message}</Text>
      </View>

      <View className="gap-3 rounded-2xl bg-white p-4">
        <Text className="text-lg font-semibold text-neutral-900">Cámara</Text>
        <CameraCapture
          onCaptured={() => setMessage("Fotografía capturada correctamente.")}
          onError={setMessage}
        />
      </View>

      <View className="gap-3 rounded-2xl bg-white p-4">
        <Text className="text-lg font-semibold text-neutral-900">GPS</Text>
        <ActionButton onPress={getLocation}>Obtener ubicación</ActionButton>
        {location ? (
          <Text className="text-sm text-neutral-700">
            Latitud: {location.latitude.toFixed(6)}{"\n"}
            Longitud: {location.longitude.toFixed(6)}{"\n"}
            Precisión: {Math.round(location.accuracy ?? 0)} m
          </Text>
        ) : null}
      </View>

      <View className="gap-3 rounded-2xl bg-white p-4">
        <Text className="text-lg font-semibold text-neutral-900">Firma</Text>
        <Text className="text-sm text-neutral-600">
          Dibuja tu firma en el recuadro. La prueba se conserva solo en memoria.
        </Text>
        <SignatureCapture onChange={setSignature} />
        <Text className="text-sm text-neutral-700">
          Estado: {signature ? "firma capturada" : "sin firma"}
        </Text>
      </View>
    </ScrollView>
  );
}
