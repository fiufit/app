import { styles } from "./styles.imageModal";
import { Text, View, Image, Pressable } from "react-native";
import Button from "../../Button/button";
import { LIGHT_GREY, MEDIUM_GREY, WHITE } from "../../../../utils/colors";
import { useState } from "react";
import AddImageGalery from "../../../../assets/images/general/galleryadd.svg";
import AddImageCamera from "../../../../assets/images/general/cameraIcon.svg";
import CloseIcon from "../../../../assets/images/general/closeIcon.svg";
import * as ImagePicker from "expo-image-picker";

const MediaModal = ({
  imageAspect = [1, 1],
  onUpload,
  onClose,
  type = "image",
  buttonText = "Upload",
  title = "Upload an image",
}) => {
  const [media, setMedia] = useState(null);

  const mediaOptions = {
    mediaTypes: type === "image" ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: true,
    aspect: imageAspect,
    quality: 1,
  };
  const handleEditImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync(mediaOptions);

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  };

  const handleEditImageGalery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(mediaOptions);

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  };


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
        <Text style={styles.title}>{title}</Text>
        {!media ? (
          <View style={styles.iconsContainer}>
            <AddImageGalery onPress={handleEditImageGalery} />
            <Text style={styles.or}>Or</Text>
            <AddImageCamera
              color={MEDIUM_GREY}
              onPress={handleEditImageCamera}
            />
          </View>
        ) : (
          <Pressable onPress={() => setMedia(null)}>
            <Image source={{ uri: media }} style={styles.image} />
          </Pressable>
        )}
        {media && (
          <Button
            textColor={WHITE}
            style={styles.button}
            onPress={() => {
              onUpload(media);
            }}
          >
            {buttonText}
          </Button>
        )}
      </View>
    </View>
  );
};

export default MediaModal;
