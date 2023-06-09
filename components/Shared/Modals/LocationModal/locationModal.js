import {styles} from "./style.location-modal";
import {Text, View} from "react-native";
import CloseIcon from "../../../../assets/images/general/closeIcon.svg";
import {WHITE} from "../../../../utils/colors";
import Button from "../../Button/button";
import {useEffect, useState} from "react";
import {useSetRecoilState} from "recoil";
import {locationState} from "../../../../atoms";
import * as Location from "expo-location";
import ProfileController from "../../../../utils/controllers/ProfileController";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../../../firebase";

const LocationModal = ({onClose, onFinish, onError}) => {
    const [user] = useAuthState(auth)
    const [submitting, setSubmitting] = useState(false);
    const setLocation = useSetRecoilState(locationState);

    useEffect(() => {
        if(submitting){
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
                const controller = new ProfileController(user);
                const { data, error } = await controller.updateProfile({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });

                if(error){
                    onError()
                } else {
                    onFinish(data)
                }
            })();
        }

    }, [submitting]);

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modal}>
                <CloseIcon
                    color={"black"}
                    height={30}
                    width={30}
                    position={"absolute"}
                    top={10}
                    right={10}
                    onPress={onClose}
                />
                <Text style={styles.title}>Refresh your location</Text>
                <Button
                    textColor={WHITE}
                    style={styles.button}
                    onPress={() => {
                        setSubmitting(true);
                    }}
                >
                    {!submitting ? "Refresh" : "Refreshing..."}
                </Button>
            </View>
        </View>
    )
}

export default LocationModal;
