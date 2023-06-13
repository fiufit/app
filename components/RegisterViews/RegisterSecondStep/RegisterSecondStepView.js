import { List, TextInput, TouchableRipple } from "react-native-paper";
import { Pressable, ScrollView, Text } from "react-native";

import AppLogoIcon from "../../../assets/appLogo.svg";
import AuthenticationController from "../../../utils/controllers/AuthenticationController";
import Background from "../../Background/background";
import Button from "../../Shared/Button/button";
import DateTimePicker from "@react-native-community/datetimepicker";
import ErrorModal from "../../Shared/Modals/ErrorModal/ErrorModal";
import Input from "../../Shared/Input/input";
import InterestsModal from "../../InterestsModal/InterestsModal";
import LoadingModal from "../../Shared/Modals/LoadingModal/loadingModal";
import LogoutIcon from "../../../assets/images/general/logoutIcon.svg";
import { WHITE } from "../../../utils/colors";
import {signOutFromApp} from "../../../firebase";
import { styles } from "./styles.RegisterSecondStepView";
import {useRecoilState, useRecoilValue} from "recoil";
import { useState } from "react";
import {locationState, userDataState} from "../../../atoms";

const RegisterSecondStepView = ({ user }) => {
  const [expandedList, setExpandedList] = useState(false);
  const [genderSelected, setGenderSelected] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateOfBirthInserted, setDateOfBirthInserted] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [weight, setWeight] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [nickName, setNickName] = useState("");
  const [height, setHeight] = useState("");
  const [userData, setUserData] = useRecoilState(userDataState);
  const [loading, setLoading] = useState(false);
  const [errorModalIsVisible, setErrorModalIsVisible] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");
  const [interestsModalIsVisible, setInterestsModalIsVisible] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const location = useRecoilValue(locationState);

  const onChange = ({ type }, selectedDate) => {
    setShowPicker(false);
    if (type === "set") {
      const currentDate = selectedDate;
      setDateOfBirth(currentDate);
      setDateOfBirthInserted(true);
    }
  };

  const canSubmit = () => {
    return (
      nickName &&
      displayName &&
      genderSelected &&
      dateOfBirth &&
      height &&
      weight &&
      selectedInterests.length
    );
  };

  async function handleNext() {
    if (canSubmit()) {
      const numericWeight = Number(weight);
      const numericHeight = Number(height);
      if (Number.isInteger(numericHeight) && Number.isInteger(numericWeight)) {
        try {
          setLoading(true);
          await user.reload();
          await user.getIdToken(true);
          const controller = new AuthenticationController(user);
          const { data } = await controller.finishRegister({
            nickname: nickName,
            display_name: displayName,
            is_male: genderSelected === "Male",
            birth_date: dateOfBirth,
            height: numericHeight,
            weight: numericWeight,
            latitude: location.latitude,
            longitude: location.longitude,
            interests: selectedInterests.map((interest) => interest.toLowerCase()),
            method: user.providerData[0].providerId === 'password' ? 'mail' : 'federated_entity'
          });
          console.log(data);
          setUserData({...data.user, followers: [], following: []});
          setLoading(false);
        } catch (e) {
          setErrorModalIsVisible(true);
          setErrorDescription(
            "An unexpected error has occured while registering. Please try again later!"
          );
          setLoading(false);
        }
      } else {
        setErrorModalIsVisible(true);
        setErrorDescription("Width and height must be integers.");
      }
    } else {
      setErrorModalIsVisible(true);
      setErrorDescription("You need to complete all fields!");
    }
  }

  return (
    <Background
      fromColor={"rgb(185, 213, 123)"}
      toColor={"rgb(254,254,253)"}
      styles={{ flex: 1, alignItems: "center" }}
    >
      <ScrollView
        style={{ width: "100%", position: "relative" }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <LogoutIcon
          position={"absolute"}
          right={20}
          top={50}
          opacity={1}
          width={30}
          height={25}
          onPress={() => signOutFromApp(() => setUserData({}))}
        />
        <AppLogoIcon style={styles.logoImage} />
        <Text style={styles.completeProfileText}>
          Let's complete your profile
        </Text>
        <Text style={styles.helpUsText}>
          It will help us to know more about you!
        </Text>
        <Input
          value={displayName}
          placeholder="Display name"
          onChangeText={(displayName) => setDisplayName(displayName)}
          width={"80%"}
          height={55}
          fontSize={12}
          left={<TextInput.Icon icon="account" />}
          backgroundColor={WHITE}
        />
        <Input
          value={nickName}
          placeholder="Nickname"
          onChangeText={(nickName) => setNickName(nickName)}
          width={"80%"}
          height={55}
          fontSize={12}
          left={<TextInput.Icon icon="account" />}
          backgroundColor={WHITE}
        />
        <TouchableRipple borderless style={styles.listAccordion}>
          <List.Accordion
            title={genderSelected ? genderSelected : "Choose Gender"}
            left={(props) => <List.Icon {...props} icon="account-multiple" />}
            expanded={expandedList}
            onPress={() => setExpandedList(!expandedList)}
            theme={{ colors: { primary: "black" } }}
            style={styles.listAccordionTitle}
          >
            <List.Item
              onPress={() => {
                setGenderSelected("Male");
                setExpandedList(!expandedList);
              }}
              title="Male"
              style={styles.listAccordionItem}
            />
            <List.Item
              onPress={() => {
                setGenderSelected("Female");
                setExpandedList(!expandedList);
              }}
              title="Female"
              style={styles.listAccordionItem}
            />
          </List.Accordion>
        </TouchableRipple>
        <Pressable
          onPress={() => {
            setShowPicker(true);
          }}
        >
          <Input
            value={
              dateOfBirthInserted ? dateOfBirth.toDateString() : "Date of Birth"
            }
            placeholder="Date of Birth"
            onChangeText={(date) => setDateOfBirth(date)}
            width={"77%"}
            height={55}
            fontSize={12}
            left={<TextInput.Icon icon="calendar" />}
            backgroundColor={WHITE}
            editable={false}
          />
        </Pressable>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={dateOfBirth}
            onChange={onChange}
          />
        )}
        <Input
          value={weight}
          placeholder="Weight (kg)"
          onChangeText={(weight) => setWeight(weight)}
          width={"80%"}
          height={55}
          fontSize={12}
          left={<TextInput.Icon icon="weight" />}
          backgroundColor={WHITE}
          inputMode={"numeric"}
        />
        <Input
          value={height}
          placeholder="Height (cm)"
          onChangeText={(height) => setHeight(height)}
          width={"80%"}
          height={55}
          fontSize={12}
          left={<TextInput.Icon icon="human-male-height" />}
          backgroundColor={WHITE}
          inputMode={"numeric"}
        />
        <Pressable onPress={() => setInterestsModalIsVisible(true)}>
          <Input
            placeholder={
              selectedInterests.length !== 0
                ? selectedInterests.join(", ")
                : "Interests"
            }
            width={"77%"}
            height={55}
            fontSize={12}
            left={<TextInput.Icon icon="shape" />}
            backgroundColor={WHITE}
            editable={false}
            multiline={true}
          />
        </Pressable>
        <InterestsModal
          modalIsVisible={interestsModalIsVisible}
          setModalIsVisible={setInterestsModalIsVisible}
          selectedInterests={selectedInterests}
          setSelectedInterests={setSelectedInterests}
        ></InterestsModal>
        <Button
          textColor={WHITE}
          fontSize={16}
          style={styles.nextButton}
          onPress={() => handleNext()}
        >
          Next ＞
        </Button>
        <ErrorModal
          modalIsVisible={errorModalIsVisible}
          setModalIsVisible={setErrorModalIsVisible}
          errorTitle="Oooops!"
          errorDescription={errorDescription}
        ></ErrorModal>
      </ScrollView>
      {loading && <LoadingModal text={"Setting up your profile"} />}
    </Background>
  );
};

export default RegisterSecondStepView;
