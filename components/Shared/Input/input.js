import { TextInput, View } from "react-native";

import { DARK_GREY } from "../../../utils/colors";
import { React } from "react";
import { styles } from "./styles.input";

const Input = ({
  left,
  right,
  color,
  fontSize,
  height,
  width,
  backgroundColor,
  fontFamily,
  cursorColor,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  editable,
}) => {
  return (
    <View
      style={{
        ...styles.inputContainer,
        backgroundColor: backgroundColor ?? "#F7F8F8",
        height,
        width,
      }}
    >
      <View style={styles.sideContainer}>{left}</View>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        style={{
          ...styles.input,
          fontSize,
          color,
          fontFamily: fontFamily ?? "Poppins_400Regular",
          paddingTop: fontFamily ? 0 : 3,
        }}
        cursorColor={cursorColor ?? DARK_GREY}
        editable={editable ?? true}
      ></TextInput>
      <View style={styles.sideContainer}>{right}</View>
    </View>
  );
};

export default Input;
