import { Camera } from "expo-camera";
import type { CameraService } from "./contracts";

export const expoCameraService: CameraService = {
  async requestPermission() {
    const permission = await Camera.requestCameraPermissionsAsync();
    return {
      granted: permission.granted,
      canAskAgain: permission.canAskAgain,
    };
  },
};
