import { Text, View } from "react-native";
import { styles } from "./styles.no-trainigs-message";
import Button from "../../Shared/Button/button";
import { WHITE } from "../../../utils/colors";

const NoTrainingsMessage = ({ title, onPress, callToActionText }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Button textColor={WHITE} style={styles.callToAction} onPress={onPress}>
        {callToActionText}
      </Button>
    </View>
  );
};

export default NoTrainingsMessage;
