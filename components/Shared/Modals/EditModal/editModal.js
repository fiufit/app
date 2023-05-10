import { Text, View } from "react-native";

import Button from "../../Button/button";
import Input from "../../Input/input";
import { WHITE } from "../../../../utils/colors";
import { styles } from "./styles.editModal";
import { useState } from "react";

const EditModal = ({
  title,
  editValue,
  editPlaceHolder,
  editIcon,
  buttonText,
  onButtonPress,
  setEditValue,
  inputMode,
  setErrorModalIsVisible,
  setErrorDescription,
}) => {
  const [text, setText] = useState(editValue);
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
        <Text style={styles.title}>{title}</Text>
        <Input
          placeholder={editPlaceHolder}
          value={text}
          left={editIcon}
          width={"100%"}
          height={40}
          marginTop={0}
          onChangeText={(text) => setText(text)}
          inputMode={inputMode}
        />
        <Button
          textColor={WHITE}
          style={styles.button}
          onPress={() => {
            if (text?.length) {
              setEditValue(text);
              onButtonPress();
            } else {
              setErrorModalIsVisible(true);
              setErrorDescription("Value can not be empty.");
            }
          }}
        >
          {buttonText}
        </Button>
      </View>
    </View>
  );
};

export default EditModal;
