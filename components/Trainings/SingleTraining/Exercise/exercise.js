import {Pressable, Text, View} from "react-native";
import {styles} from "./styles.exercise";
import DoneIcon from "../../../../assets/images/general/doneIcon.svg"
import DeleteIcon from "../../../../assets/images/general/closeIcon.svg"
import {useState} from "react";
const Exercise = ({last, exerciseData, number, add, onPress, onDelete}) => {
    const [done, setDone] = useState(exerciseData.done);
    const handleDone = () => {
        setDone(!done)
        //TODO post setting exercise done in db
    }

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={styles.numberContainer}>
                <Text style={styles.number}>{number}</Text>
                {!last && <View style={styles.barContainer}>
                    <View style={styles.bar}/>
                </View>}
            </View>
            <View>
                <Text style={styles.title}>{exerciseData.title}</Text>
                <Text style={styles.description} numberOfLines={1}>{exerciseData.description}</Text>
            </View>
            {!add && <DoneIcon style={styles.done} opacity={done ? 1 : 0.1} onPress={handleDone}/>}
            {(add && !last) && <DeleteIcon style={styles.delete} onPress={() => onDelete(number - 1)}/>}
        </Pressable>
    )
}

export default Exercise;
