import * as Location from "expo-location";
import type { LocationService } from "./contracts";

export const expoLocationService: LocationService = {
  async requestPermission() {
    const permission = await Location.requestForegroundPermissionsAsync();
    return {
      granted: permission.granted,
      canAskAgain: permission.canAskAgain,
    };
  },

  async getCurrent() {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      accuracy: location.coords.accuracy,
    };
  },
};
