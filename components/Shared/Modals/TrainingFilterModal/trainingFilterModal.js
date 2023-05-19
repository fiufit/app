import { styles } from "./styles.training-filter-modal";
import { Text, View } from "react-native";
import CloseIcon from "../../../../assets/images/general/closeIcon.svg";
import Button from "../../Button/button";
import { WHITE } from "../../../../utils/colors";
import { difficulties } from "../../../../utils/trainings";
import {useState} from "react";

const TrainingFilterModal = ({ onClose, trainingDifficulty, setDifficulty }) => {

  const [newDifficulty, setNewDifficulty] = useState(trainingDifficulty.toLowerCase());

  const handleClose = () =>{
      setDifficulty(newDifficulty.toLowerCase());
      onClose()
  }

  const handleButtonPress = (difficulty) => {
      if(difficulty === newDifficulty){
          setNewDifficulty('all')
      } else {
          setNewDifficulty(difficulty)
      }
  }

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
          onPress={handleClose}
        />
        <Text style={styles.title}>Select a difficulty</Text>
        <View style={styles.buttonsContainer}>
          {difficulties.map((difficulty) => {
            return (
              <Button key={difficulty} style={{...styles.button, opacity: newDifficulty.toLowerCase() === difficulty.toLowerCase() ? 1 : 0.5}} textColor={WHITE} onPress={() => handleButtonPress(difficulty.toLowerCase())}>
                {difficulty}
              </Button>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default TrainingFilterModal;
