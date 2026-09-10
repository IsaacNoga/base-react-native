import { CameraView } from "expo-camera";
import { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { CameraPhoto, CameraService } from "./contracts";
import { expoCameraService } from "./expoCameraService";

interface CameraCaptureProps {
  service?: CameraService;
  onCaptured?: (photo: CameraPhoto) => void;
  onError?: (message: string) => void;
}

export function CameraCapture({
  service = expoCameraService,
  onCaptured,
  onError,
}: CameraCaptureProps) {
  const cameraRef = useRef<CameraView>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const openCamera = async () => {
    const permission = await service.requestPermission();
    if (!permission.granted) {
      onError?.("Se necesita permiso de cámara para tomar una fotografía.");
      return;
    }

    setCameraOpen(true);
  };

  const takePhoto = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.7 });
      if (!photo) return;

      const capturedPhoto = {
        uri: photo.uri,
        width: photo.width,
        height: photo.height,
      };
      setPhotoUri(photo.uri);
      setCameraOpen(false);
      onCaptured?.(capturedPhoto);
    } catch {
      onError?.("No fue posible capturar la fotografía.");
    }
  };

  if (cameraOpen) {
    return (
      <View className="gap-3">
        <CameraView ref={cameraRef} style={styles.camera} facing="back" />
        <ActionButton onPress={takePhoto}>Tomar fotografía</ActionButton>
        <Pressable onPress={() => setCameraOpen(false)}>
          <Text className="text-center font-medium text-neutral-600">Cancelar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="gap-3">
      <ActionButton onPress={openCamera}>Abrir cámara</ActionButton>
      {photoUri ? <Image source={{ uri: photoUri }} style={styles.photo} /> : null}
    </View>
  );
}

function ActionButton({ children, onPress }: { children: string; onPress: () => void }) {
  return (
    <Pressable
      className="rounded-xl bg-teal-600 px-4 py-3 active:bg-teal-700"
      onPress={onPress}
    >
      <Text className="text-center font-semibold text-white">{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  camera: {
    aspectRatio: 3 / 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  photo: {
    aspectRatio: 3 / 4,
    borderRadius: 12,
    width: "100%",
  },
});
