import { Text, View } from "react-native";
import { styles } from "./styles.create-training-card";
import Button from "../../Shared/Button/button";
import { WHITE } from "../../../utils/colors";

const CreateTrainingCard = ({ title, onPress, callToActionText }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Button textColor={WHITE} style={styles.createButton} onPress={onPress}>
        {callToActionText}
      </Button>
    </View>
  );
};

export default CreateTrainingCard;
