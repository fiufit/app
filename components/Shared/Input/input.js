import { TextInput, View } from "react-native";

import { DARK_GREY } from "../../../utils/colors";
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
  inputMode,
  marginTop,
  multiline,
  autoFocus,
  borderRadius,
}) => {
  return (
    <View
      style={{
        ...styles.inputContainer,
        backgroundColor: backgroundColor ?? "#F7F8F8",
        borderRadius: borderRadius ?? 14,
        height,
        width,
        marginTop: marginTop === undefined ? 20 : marginTop,
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
          height: multiline ? height : undefined,
        }}
        cursorColor={cursorColor ?? DARK_GREY}
        editable={editable ?? true}
        inputMode={inputMode ?? "text"}
        multiline={multiline ?? false}
        autoFocus={autoFocus}
      ></TextInput>
      <View style={styles.sideContainer}>{right}</View>
    </View>
  );
};

export default Input;
