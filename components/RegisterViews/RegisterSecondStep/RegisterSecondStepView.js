import { Image, Pressable, ScrollView, Text } from "react-native";
import { List, TextInput, TouchableRipple } from "react-native-paper";
import { React, useState } from "react";

import Background from "../../Background/background";
import Button from "../../Shared/Button/button";
import DateTimePicker from "@react-native-community/datetimepicker";
import Input from "../../Shared/Input/input";
import { WHITE } from "../../../utils/colors";
import { styles } from "./styles.RegisterSecondStepView";

const RegisterSecondStepView = () => {
  const [expandedList, setExpandedList] = useState(false);
  const [genderSelected, setGenderSelected] = useState("");
  const [date, setDate] = useState(new Date());
  const [dateOfBirthInserted, setDateOfBirthInserted] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [weight, setWeight] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [nickName, setNickName] = useState("");
  const [height, setHeight] = useState("");
  const [mainLocation, setMainLocation] = useState("");
  const [interests, setInterests] = useState("");

  const onChange = ({ type }, selectedDate) => {
    setShowPicker(false);
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      setDateOfBirthInserted(true);
    }
  };

  function handleNext() {
    //TO DO
  }

  return (
    <Background
      fromColor={"rgb(185, 213, 123)"}
      toColor={"rgb(254,254,253)"}
      styles={{ flex: 1, alignItems: "center" }}
    >
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Image
          style={styles.logoImage}
          source={require("../../../assets/appLogo.png")}
        />
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
          backgroundColor={"#FFFFFF"}
        />
        <Input
          value={nickName}
          placeholder="Nickname"
          onChangeText={(nickName) => setNickName(nickName)}
          width={"80%"}
          height={55}
          fontSize={12}
          left={<TextInput.Icon icon="account" />}
          backgroundColor={"#FFFFFF"}
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
            value={dateOfBirthInserted ? date.toDateString() : "Date of Birth"}
            placeholder="Date of Birth"
            onChangeText={(date) => setDate(date)}
            width={"77%"}
            height={55}
            fontSize={12}
            left={<TextInput.Icon icon="calendar" />}
            backgroundColor={"#FFFFFF"}
            editable={false}
          />
        </Pressable>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
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
          backgroundColor={"#FFFFFF"}
        />
        <Input
          value={height}
          placeholder="Height (cm)"
          onChangeText={(height) => setHeight(height)}
          width={"80%"}
          height={55}
          fontSize={12}
          left={<TextInput.Icon icon="human-male-height" />}
          backgroundColor={"#FFFFFF"}
        />
        <Input
          value={mainLocation}
          placeholder="Main Location"
          onChangeText={(mainLocation) => setMainLocation(mainLocation)}
          width={"80%"}
          height={55}
          fontSize={12}
          left={<TextInput.Icon icon="map-marker" />}
          backgroundColor={"#FFFFFF"}
        />
        <Input
          value={interests}
          placeholder="Interests"
          onChangeText={(interests) => setInterests(interests)}
          width={"80%"}
          height={55}
          fontSize={12}
          left={<TextInput.Icon icon="shape" />}
          backgroundColor={"#FFFFFF"}
        />
        <Button
          textColor={WHITE}
          fontSize={16}
          style={styles.nextButton}
          onPress={() => handleNext()}
        >
          Next ＞
        </Button>
      </ScrollView>
    </Background>
  );
};

export default RegisterSecondStepView;
