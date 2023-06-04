import { styles } from "./style.training-complete-modal";
import { Text, View } from "react-native";
import { WHITE } from "../../../../utils/colors";
import Button from "../../Button/button";
import CloseIcon from "../../../../assets/images/general/closeIcon.svg";

const TrainingCompleteModal = ({onClose, onSubmit, submitting}) => {


    return (
        <View style={styles.modalContainer}>
            <View style={styles.modal}>
                <CloseIcon
                    color={"black"}
                    height={30}
                    width={30}
                    position={"absolute"}
                    top={10}
                    right={10}
                    onPress={onClose}
                />
                <Text style={styles.title}>Congratulations!</Text>
                <Text style={styles.subtitle}>You have completed the training!</Text>
                <Button
                    textColor={WHITE}
                    style={styles.button}
                    onPress={onSubmit}
                >
                    {submitting ? "Marking as done..." : "Mark as done!"}
                </Button>
            </View>
        </View>
    );


}

export default TrainingCompleteModal;
