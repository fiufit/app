import {Text, TouchableOpacity} from "react-native";
import {styles} from "./styles.back";
import BackIcon from '../../../assets/images/general/backIcon.svg'
const Back = ({onPress}) => {
    return(
        <TouchableOpacity style={styles.back} onPress={onPress}>
            <BackIcon/>
            <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
    )
}

export default Back;
