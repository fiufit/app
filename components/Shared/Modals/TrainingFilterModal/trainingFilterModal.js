import { styles } from "./styles.training-filter-modal";
import { Text, View } from "react-native";
import CloseIcon from "../../../../assets/images/general/closeIcon.svg";
import Button from "../../Button/button";
import { WHITE } from "../../../../utils/colors";
import { difficulties, interests } from "../../../../utils/trainings";
import { useState } from "react";

const TrainingFilterModal = ({
  onClose,
  trainingDifficulty,
  setDifficulty,
  tags,
  setTags,
}) => {
  const [newDifficulty, setNewDifficulty] = useState(
    trainingDifficulty.toLowerCase()
  );
  const [newTags, setNewTags] = useState(tags);

  const handleClose = () => {
    setDifficulty(newDifficulty.toLowerCase());
    setTags(newTags);
    onClose();
  };

  const handleDifficultyPress = (difficulty) => {
    if (difficulty === newDifficulty) {
      setNewDifficulty("all");
    } else {
      setNewDifficulty(difficulty);
    }
  };

  const handleTagPress = (tag) => {
    if (newTags.includes(tag.toLowerCase())) {
      setNewTags(newTags.filter((t) => t !== tag.toLowerCase()));
    } else {
      setNewTags([...newTags, tag.toLowerCase()]);
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
        <Text style={styles.title}>Select tags</Text>
        <View style={styles.buttonsContainer}>
          {interests.map((interest, index) => {
            return (
              <Button
                key={index}
                style={{
                  ...styles.button,
                  opacity:
                    newTags.includes(interest.toLowerCase())
                      ? 1
                      : 0.5,
                }}
                textColor={WHITE}
                onPress={() => {handleTagPress(interest.toLowerCase())}}
              >
                {interest}
              </Button>
            );
          })}
        </View>
        <Text style={styles.title}>Select a difficulty</Text>
        <View style={styles.buttonsContainer}>
          {difficulties.map((difficulty) => {
            return (
              <Button
                key={difficulty}
                style={{
                  ...styles.button,
                  opacity:
                    newDifficulty.toLowerCase() === difficulty.toLowerCase()
                      ? 1
                      : 0.5,
                }}
                textColor={WHITE}
                onPress={() => handleDifficultyPress(difficulty.toLowerCase())}
              >
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
