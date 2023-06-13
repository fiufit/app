import { DARK_BLUE, WHITE } from "../../../utils/colors";
import { DEFAULT_PROFILE_PICTURE, auth, uploadImage } from "../../../firebase";
import { Image, Pressable, Text, TouchableHighlight, View } from "react-native";

import Back from "../../Shared/Back/back";
import Button from "../../Shared/Button/button";
import DateTimePicker from "@react-native-community/datetimepicker";
import EditIcon from "../../../assets/images/general/editIcon.svg";
import EditModal from "../../Shared/Modals/EditModal/editModal";
import ErrorModal from "../../Shared/Modals/ErrorModal/ErrorModal";
import ImageModal from "../../Shared/Modals/ImageModal/imageModal";
import Input from "../../Shared/Input/input";
import InterestsModal from "../../InterestsModal/InterestsModal";
import LoadingModal from "../../Shared/Modals/LoadingModal/loadingModal";
import ProfileController from "../../../utils/controllers/ProfileController";
import SuccessModal from "../../Shared/Modals/SuccessModal/SuccessModal";
import { TextInput } from "react-native-paper";
import { styles } from "./styles.editProfile";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { userDataState } from "../../../atoms";
import LogOutButton from "../../Shared/LogOutButton/logOutButton";
import LocationModal from "../../Shared/Modals/LocationModal/locationModal";

const EditProfile = ({ navigation }) => {
  const [userData, setUserData] = useRecoilState(userDataState);
  const [user] = useAuthState(auth);
  const [editOptions, setEditOptions] = useState({});
  const [isMale, setIsMale] = useState(userData.IsMale);
  const [height, setHeight] = useState(String(userData.Height));
  const [dateOfBirth, setDateOfBirth] = useState(new Date(userData.BornAt));
  const [showPicker, setShowPicker] = useState(false);
  const [weight, setWeight] = useState(String(userData.Weight));
  const [displayName, setDisplayName] = useState(userData.DisplayName);
  const [nickName, setNickName] = useState(userData.Nickname);
  const [mainLocation, setMainLocation] = useState(
    userData.MainLocation.split(" ")[0]
  );
  const [interests, setInterests] = useState(
    userData.Interests.map(
      (i) => i.Name.charAt(0).toUpperCase() + i.Name.slice(1)
    )
  );
  const [loading, setLoading] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [errorModalIsVisible, setErrorModalIsVisible] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [successModalIsVisible, setSuccessModalIsVisible] = useState(false);
  const [successDescription, setSuccessDescription] = useState("");
  const [showInterestsModal, setShowInterestsModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const nameOptions = {
    displayName: {
      title: "Edit your display name",
      value: displayName,
      icon: <TextInput.Icon icon="account" />,
      placeholder: "Display name",
      setEditValue: setDisplayName,
    },
    nickName: {
      title: "Edit your nickname",
      value: nickName,
      icon: <TextInput.Icon icon="account" />,
      placeholder: "Nickname",
      setEditValue: setNickName,
    },
  };

  const inputs = [
    {
      editOptions: {
        title: "Edit your height",
        value: height,
        icon: <TextInput.Icon icon="human-male-height" />,
        placeholder: "Height (cm)",
        setEditValue: setHeight,
        inputMode: "numeric",
      },
      displayValue: `${height} cm`,
      icon: <TextInput.Icon icon="human-male-height" />,
    },
    {
      editOptions: {
        title: "Edit your weight",
        value: weight,
        icon: <TextInput.Icon icon="weight" />,
        placeholder: "Weight (kg)",
        setEditValue: setWeight,
        inputMode: "numeric",
      },
      displayValue: `${weight} kg`,
      icon: <TextInput.Icon icon="weight" />,
    },
    {
      displayValue: mainLocation,
      icon: <TextInput.Icon icon="map-marker" />,
      onPress: () => {
        setShowLocationModal(true);
      },
    },
    {
      displayValue: `${isMale ? "Male" : "Female"}`,
      icon: <TextInput.Icon icon="account-multiple" />,
      rightIcon: (
        <TextInput.Icon
          icon={isMale ? "toggle-switch-off-outline" : "toggle-switch-outline"}
          onPress={() => setIsMale(!isMale)}
        />
      ),
      onPress: () => {},
    },
    {
      displayValue: `${dateOfBirth.toDateString()}`,
      icon: <TextInput.Icon icon="calendar" />,
      onPress: () => setShowPicker(true),
    },
    {
      displayValue: `${
        interests.length > 0 ? interests.join(", ") : "Add your interests"
      }`,
      icon: <TextInput.Icon icon="shape" />,
      multiline: true,
      onPress: () => {
        setShowInterestsModal(true);
      },
    },
  ];

  const onDateChange = ({ type }, selectedDate) => {
    setShowPicker(false);
    if (type === "set") {
      setDateOfBirth(selectedDate);
    }
  };

  const handleUpdate = async () => {
    const numericWeight = Number(weight);
    const numericHeight = Number(height);
    if (Number.isInteger(numericHeight) && Number.isInteger(numericWeight)) {
      setLoading(true);

      const controller = new ProfileController(user);
      const { data, error } = await controller.updateProfile({
        nickname: nickName,
        display_name: displayName,
        is_male: isMale,
        birth_date: dateOfBirth,
        height,
        weight,
        interests: interests.map((interest) => interest.toLowerCase()),
      });

      if (error) {
        //TODO: Show different messagges according to the error.
        setErrorModalIsVisible(true);
        setErrorDescription(
          "There has been an error while updating your profile. Please try again later!"
        );
      } else {
        setUserData({
          ...data,
          followers: userData.followers,
          following: userData.following,
        });
        setSuccessModalIsVisible(true);
        setSuccessDescription("Your profile has been updated successfully!");
      }
      setLoading(false);
    } else {
      setErrorModalIsVisible(true);
      setErrorDescription("Width and height must be integers.");
    }
  };

  const handleImageUpdate = async (image) => {
    setShowImageModal(false);
    setLoading(true);
    try {
      const imageUrl = await uploadImage(
        image,
        `profile_pictures/${userData.ID}/profile.png`
      );
      setUserData({ ...userData, PictureUrl: imageUrl });
    } catch (error) {
      setErrorModalIsVisible(true);
      setErrorDescription(
        "There has been an error while updating your image. Please try again later!"
      );
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <LogOutButton />
      <Back
        onPress={() => navigation.navigate({ name: "Profile", merge: true })}
      />
      <Text style={styles.title}>Profile Settings</Text>
      <View style={styles.profilePictureContainer}>
        <Image
          style={styles.profilePicture}
          source={{
            uri: userData.PictureUrl ?? DEFAULT_PROFILE_PICTURE,
          }}
        />
        <EditIcon
          style={styles.editIcon}
          height={25}
          width={25}
          onPress={() => setShowImageModal(true)}
        />
      </View>
      <Text
        style={styles.name}
        onPress={() => setEditOptions(nameOptions.displayName)}
      >
        {displayName}
      </Text>
      <Text
        style={styles.nickName}
        onPress={() => setEditOptions(nameOptions.nickName)}
      >
        @{nickName}
      </Text>
      <View style={styles.data}>
        {inputs.map((input, index) => (
          <TouchableHighlight
            key={index}
            onPress={
              input.onPress
                ? input.onPress
                : () => setEditOptions(input.editOptions)
            }
            underlayColor={"transparent"}
          >
            <Input
              editable={false}
              height={"30%"}
              value={input.displayValue}
              color={"black"}
              left={input.icon}
              right={input.rightIcon}
            />
          </TouchableHighlight>
        ))}
        <Pressable onPress={() => setInterestsModalIsVisible(true)}>
          <Input
            placeholder={
              selectedInterests.length !== 0
                ? selectedInterests.join(", ")
                : "Example interests"
            }
            height={55}
            fontSize={12}
            left={<TextInput.Icon icon="shape" />}
            editable={false}
            multiline={true}
            borderRadius={18}
          />
        </Pressable>
      </View>
      <Button
        buttonColor={DARK_BLUE}
        style={styles.button}
        textColor={WHITE}
        onPress={handleUpdate}
      >
        Update
      </Button>
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={dateOfBirth}
          onChange={onDateChange}
        />
      )}
      {editOptions.title && (
        <EditModal
          title={editOptions.title}
          editIcon={editOptions.icon}
          inputMode={editOptions?.inputMode}
          editValue={editOptions.value}
          buttonText={"Confirm"}
          setEditValue={editOptions.setEditValue}
          editPlaceHolder={editOptions.placeholder}
          onButtonPress={() => setEditOptions({})}
          setErrorModalIsVisible={setErrorModalIsVisible}
          setErrorDescription={setErrorDescription}
        />
      )}
      {showImageModal && (
        <ImageModal
          onClose={() => setShowImageModal(false)}
          onUpload={(image) => handleImageUpdate(image)}
        />
      )}
      {loading && <LoadingModal text={"Updating your profile"} />}
      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onError={() => {
            setErrorModalIsVisible(true);
            setErrorDescription(
              "There has been an error while updating your location. Please try again later!"
            );
            setShowLocationModal(false);
          }}
          onFinish={(data) => {
            setUserData({
              ...data,
              followers: userData.followers,
              following: userData.following,
            });
            setMainLocation(data.MainLocation.split(" ")[0]);
            setSuccessModalIsVisible(true);
            setShowLocationModal(false);
            setSuccessDescription(
              "Your location has been updated successfully!"
            );
          }}
        />
      )}
      <InterestsModal
        modalIsVisible={showInterestsModal}
        setModalIsVisible={setShowInterestsModal}
        selectedInterests={interests}
        setSelectedInterests={setInterests}
      />
      <ErrorModal
        modalIsVisible={errorModalIsVisible}
        setModalIsVisible={setErrorModalIsVisible}
        errorTitle="Oooops!"
        errorDescription={errorDescription}
      />
      <SuccessModal
        modalIsVisible={successModalIsVisible}
        setModalIsVisible={setSuccessModalIsVisible}
        modalTitle="Success!"
        modalDescription={successDescription}
      />
    </View>
  );
};

export default EditProfile;
