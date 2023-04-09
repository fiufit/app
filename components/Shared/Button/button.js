import {Text, TouchableOpacity} from "react-native";
import {styles} from "./styles.button";

const Button = ({children, fontFamily, fontSize, textColor, icon, onPress, style, buttonColor}) => {

    return <TouchableOpacity onPress={onPress} style={{...styles.buttonContainer, ...style, backgroundColor: buttonColor ?? "#202020"}}>
        {icon}
        <Text style={{...styles.textContainer, color: textColor, fontFamily: fontFamily ?? "Poppins_500Medium", paddingTop: fontFamily ? 0 : 3, fontSize}}>{children}</Text>
    </TouchableOpacity>
}

export default Button;
