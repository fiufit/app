import { DARK_BLUE, WHITE } from "../../../utils/colors";
import { DEFAULT_PROFILE_PICTURE, auth, uploadMedia } from "../../../firebase";
import { Image, Pressable, Text, TouchableHighlight, View } from "react-native";

import Back from "../../Shared/Back/back";
import Button from "../../Shared/Button/button";
import DateTimePicker from "@react-native-community/datetimepicker";
import EditIcon from "../../../assets/images/general/editIcon.svg";
import VerifiedIcon from "../../../assets/images/profile/verifiedIcon.svg";
import EditModal from "../../Shared/Modals/EditModal/editModal";
import ErrorModal from "../../Shared/Modals/ErrorModal/ErrorModal";
import MediaModal from "../../Shared/Modals/MediaModal/mediaModal";
import Input from "../../Shared/Input/input";
import InterestsModal from "../../InterestsModal/InterestsModal";
import LoadingModal from "../../Shared/Modals/LoadingModal/loadingModal";
import LocationModal from "../../Shared/Modals/LocationModal/locationModal";
import LogOutButton from "../../Shared/LogOutButton/logOutButton";
import ProfileController from "../../../utils/controllers/ProfileController";
import SuccessModal from "../../Shared/Modals/SuccessModal/SuccessModal";
import { TextInput } from "react-native-paper";
import { styles } from "./styles.editProfile";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { userDataState } from "../../../atoms";

const EditProfile = ({ navigation, route }) => {
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
  const [mediaSelected, setMediaSelected] = useState("");
  const [isVerificationPending, setIsVerificationPending] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(true);

  useEffect(() => {
    const controller = new ProfileController(user);
    controller.getPendingCertifications().then(({ data }) => {
      setIsVerificationPending(data?.certifications?.length > 0);
      setVerificationLoading(false);
    });
    controller.getProfileData().then(({ data }) => {
      setUserData({
        ...userData,
        IsVerifiedTrainer: data.IsVerifiedTrainer,
      });
    });
  }, []);

  useEffect(() => {
    if (route?.params?.forceRefresh) {
      const controller = new ProfileController(user);
      controller.getProfileData().then(({ data }) => {
        setUserData({
          ...userData,
          IsVerifiedTrainer: data.IsVerifiedTrainer,
        });
      });
      controller.getPendingCertifications().then(({ data }) => {
        setIsVerificationPending(data?.certifications?.length > 0);
      });
    }
  }, [route.params]);

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
      setErrorDescription("Weight and height must be integers.");
    }
  };

  const handleMediaUpdate = async (media) => {
    setShowImageModal(false);
    setLoading(true);
    if (mediaSelected === "image") {
      try {
        const imageUrl = await uploadMedia(
          media,
          `profile_pictures/${userData.ID}/profile.png`
        );
        setUserData({ ...userData, PictureUrl: imageUrl });
      } catch (error) {
        setErrorModalIsVisible(true);
        setErrorDescription(
          "There has been an error while updating your image. Please try again later!"
        );
      }
    } else {
      try {
        await uploadMedia(
          media,
          `verification_videos/${userData.ID}/video.mp4`
        );
        const controller = new ProfileController(user);
        const { data } = await controller.sendVerificationAttempt();
        setIsVerificationPending(data?.Status === "pending");
      } catch (error) {
        console.log(error);
        setErrorModalIsVisible(true);
        setErrorDescription(
          "There has been an error while updating your video. Please try again later!"
        );
      }
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <LogOutButton />
      <Back
        onPress={() => navigation.goBack()}
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
          onPress={() => {
            setMediaSelected("image");
            setShowImageModal(true);
          }}
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
      <Text
        style={styles.nickName}
        onPress={() => {
          if (
            !userData.IsVerifiedTrainer &&
            !isVerificationPending &&
            !verificationLoading
          ) {
            setMediaSelected("video");
            setShowImageModal(true);
          }
        }}
      >
        {isVerificationPending
          ? "Pending verification"
          : userData.IsVerifiedTrainer
          ? "Verified"
          : "Verify your identity"}{" "}
        {userData.IsVerifiedTrainer && (
          <VerifiedIcon height={10} width={10} color={DARK_BLUE} />
        )}
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
        <MediaModal
          onClose={() => setShowImageModal(false)}
          onUpload={(image) => handleMediaUpdate(image)}
          type={mediaSelected}
          title={
            mediaSelected === "video"
              ? "Upload a video of you to verify your account"
              : null
          }
          imageAspect={mediaSelected === "video" ? [3, 4] : [1, 1]}
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
