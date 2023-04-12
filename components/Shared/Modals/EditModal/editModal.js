import {Image, Text, View} from "react-native";
import {styles} from "./styles.editModal";
import nameLogo from "../../../../assets/images/general/nameLogo.png";
import Input from "../../Input/input";
import Button from "../../Button/button";
import {WHITE} from "../../../../utils/colors";
import {useState} from "react";

const EditModal = ({title, editValue, editPlaceHolder, editIcon, buttonText, onButtonPress, setEditValue, inputMode}) => {
    const [text, setText] = useState(editValue)
    return(
        <View style={styles.modalContainer}>
            <View style={styles.modal}>
                <Text style={styles.title}>{title}</Text>
                <Input placeholder={editPlaceHolder} value={text} left={editIcon} width={"100%"} height={40} marginTop={0} onChangeText={(text) => setText(text)} inputMode={inputMode}/>
                <Button textColor={WHITE} style={styles.button} onPress={() => {
                    if(text.length) {
                        setEditValue(text);
                        onButtonPress();
                    } else {
                        alert("Value can not be empty!")
                    }
                }}>
                    {buttonText}
                </Button>
            </View>
        </View>
    )
}

export default EditModal;
