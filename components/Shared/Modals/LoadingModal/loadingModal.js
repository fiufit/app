import {Image, Text, View} from "react-native";
import {styles} from "./styles.loadingModal";
import nameLogo from '../../../../assets/images/general/nameLogo.png'
const LoadingModal = ({text}) => {
    return(
        <View style={styles.modalContainer}>
            <View style={styles.modal}>
                <Image source={nameLogo}/>
                {text && <Text style={styles.title}>
                    {text}
                </Text>}

            </View>
        </View>
    )



}

export default LoadingModal;
