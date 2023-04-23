import {styles} from "./styles.imageModal";
import {Text, View, Image, Pressable} from "react-native";
import Button from "../../Button/button";
import {LIGHT_GREY, MEDIUM_GREY, WHITE} from "../../../../utils/colors";
import {useState} from "react";
import AddImageGalery from "../../../../assets/images/general/galleryadd.svg"
import AddImageCamera from "../../../../assets/images/general/cameraIcon.svg"
import CloseIcon from "../../../../assets/images/general/closeIcon.svg"
import * as ImagePicker from "expo-image-picker";

const ImageModal = ({imageAspect = [1, 1], onUpload, onClose}) => {
    const [image, setImage] = useState(null);

    const imageOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: imageAspect,
        quality: 1,
    }
    const handleEditImageCamera = async () => {
        let result = await ImagePicker.launchCameraAsync(imageOptions)

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    const handleEditImageGalery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync(imageOptions)

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    console.log(image)
    return (
        <View style={styles.modalContainer}>
            <View style={styles.modal}>
                <CloseIcon color={"black"} height={30} width={30} position={"absolute"} top={10} right={10} onPress={onClose}/>
                <Text style={styles.title}>Upload an image</Text>
                {!image ? <View style={styles.iconsContainer}>
                    <AddImageGalery onPress={handleEditImageGalery}/>
                    <Text style={styles.or}>Or</Text>
                    <AddImageCamera color={MEDIUM_GREY} onPress={handleEditImageCamera}/>
                </View>
                    :
                <Pressable onPress={() => setImage(null)}>
                    <Image source={{uri: image}} style={styles.image}/>
                </Pressable>
                }
                {image && <Button textColor={WHITE} style={styles.button} onPress={() => {
                    onUpload(image)
                }}>
                    Upload
                </Button>}
            </View>
        </View>
    )
}

export default ImageModal;
