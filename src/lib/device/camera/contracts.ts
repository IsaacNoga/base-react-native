export interface DevicePermission {
  granted: boolean;
  canAskAgain: boolean;
}

export interface CameraPhoto {
  uri: string;
  width: number;
  height: number;
}

export interface CameraService {
  requestPermission(): Promise<DevicePermission>;
}
