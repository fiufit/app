import * as Location from "expo-location";
import { useEffect } from "react";
import { locationState } from "../../atoms";
import { useSetRecoilState } from "recoil";

const LocationWrapper = ({ children }) => {
  const setLocation = useSetRecoilState(locationState);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (e) {
        console.log("Error getting location", e);
      }
    })();
  }, []);

  return <>
    {children}
    </>;
};

export default LocationWrapper;
