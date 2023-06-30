import { styles } from "./styles.mediaModal";
import { Text, View, Image, Pressable } from "react-native";
import Button from "../../Button/button";
import { MEDIUM_GREY, WHITE } from "../../../../utils/colors";
import { useState } from "react";
import AddImageGalery from "../../../../assets/images/general/galleryadd.svg";
import AddImageCamera from "../../../../assets/images/general/cameraIcon.svg";
import CloseIcon from "../../../../assets/images/general/closeIcon.svg";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';

const MAX_FILE_SIZE = 20000000;

const MediaModal = ({
  imageAspect = [1, 1],
  onUpload,
  onClose,
  type = "image",
  buttonText = "Upload",
  title = "Upload an image",
}) => {
  const [media, setMedia] = useState(null);
  const [error, setError] = useState("");

  const mediaOptions = {
    mediaTypes: type === "image" ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: true,
    aspect: imageAspect,
    quality: 1,
  };
  const handleEditImageCamera = async () => {
    setError("")
    let result = await ImagePicker.launchCameraAsync(mediaOptions);

    if (!result.canceled) {
      const { size } = await FileSystem.getInfoAsync(
          result.assets[0].uri
      );
      if(size > MAX_FILE_SIZE){
        setError("File size must be less than 20MB")
      } else {
        setMedia(result.assets[0].uri);
      }
    }
  };

  const handleEditImageGalery = async () => {
    setError("")
    let result = await ImagePicker.launchImageLibraryAsync(mediaOptions);

    if (!result.canceled) {
      const { size } = await FileSystem.getInfoAsync(
        result.assets[0].uri
      );
      if(size > MAX_FILE_SIZE){
        setError("File size must be less than 20MB")
      } else {
        setMedia(result.assets[0].uri);
      }
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
        <Text style={{...styles.title, color: error ? "red" : "black"}}>{error ? error : title}</Text>
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
