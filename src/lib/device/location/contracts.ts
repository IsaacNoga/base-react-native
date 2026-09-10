import type { DevicePermission } from "../camera/contracts";

export interface DeviceLocation {
  latitude: number;
  longitude: number;
  accuracy: number | null;
}

export interface LocationService {
  requestPermission(): Promise<DevicePermission>;
  getCurrent(): Promise<DeviceLocation>;
}
