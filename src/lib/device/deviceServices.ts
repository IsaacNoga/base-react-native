import type { LocationService } from "./location/contracts";
import { expoLocationService } from "./location/expoLocationService";

interface DeviceServices {
  location: LocationService;
}

export const deviceServices: DeviceServices = {
  location: expoLocationService,
};
