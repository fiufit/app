import { styles } from "./styles.rating-modal";
import { Text, View } from "react-native";
import StarIcon from "../../../../assets/images/general/star.svg";
import { DARK_BLUE, WHITE } from "../../../../utils/colors";
import { useState } from "react";
import Input from "../../Input/input";
import Button from "../../Button/button";
import CloseIcon from "../../../../assets/images/general/closeIcon.svg";
const MAX_RATING = 5;

const RatingModal = ({ onClose, initialRating, initialComment, onSubmit }) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);

  const handleCommentChange = (text) => {
    setComment(text);
  };

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
        <Text style={styles.title}>Rate this training</Text>
        <View style={styles.starsContainer}>
          {Array(MAX_RATING)
            .fill()
            .map((_, index) => {
              return (
                <StarIcon
                  key={index}
                  width={40}
                  height={40}
                  color={DARK_BLUE}
                  opacity={rating - 1 >= index ? 1 : 0.2}
                  onPress={() => setRating(index + 1)}
                />
              );
            })}
        </View>
        <Input
          placeholder={"Add an optional comment"}
          height={100}
          multiline
          value={comment}
          onChangeText={handleCommentChange}
        />
        <Button textColor={WHITE} style={styles.button} onPress={() => onSubmit(rating, comment)}>
          Rate!
        </Button>
      </View>
    </View>
  );
};

export default RatingModal;
