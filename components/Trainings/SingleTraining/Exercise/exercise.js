import {Pressable, Text, View} from "react-native";
import {styles} from "./styles.exercise";
import DoneIcon from "../../../../assets/images/general/doneIcon.svg"
import DeleteIcon from "../../../../assets/images/general/closeIcon.svg"
import {useState} from "react";
import {TextInput} from "react-native-paper";
const Exercise = ({last, exerciseData, number, add, onPress, onDelete, setEditOptions, setExercises, exercises}) => {
    const [done, setDone] = useState(exerciseData.done);
    const handleDone = () => {
        setDone(!done)
        //TODO post setting exercise done in db
    }

    const options =  {
        title: {
            title: "Edit the exercise title",
            value: exerciseData.title,
            icon: <TextInput.Icon icon="note-text-outline"/>,
            placeholder: "Title",
            setEditValue: (value) => {
                const updatedExercises = exercises.map((exercise, i) => {
                    if(i === (number - 1)){
                        return {...exercise, title: value}
                    } else {
                        return exercise
                    }
                });
                setExercises(updatedExercises)
            },
        },
        description: {
            title: "Edit the exercise description",
            value: exerciseData.description,
            icon: <TextInput.Icon icon="note-text-outline"/>,
            placeholder: "Description",
            setEditValue: (value) => {
                const updatedExercises = exercises.map((exercise, i) => {
                    if(i === (number - 1)){
                        return {...exercise, description: value}
                    } else {
                        return exercise
                    }
                });
                setExercises(updatedExercises)
            },
        }
    }

    const handleTitlePress = () => {
        if(add && !last){
            setEditOptions(options.title)
        }
    }

    const handleDescriptionPress = () => {
        if(add && !last){
            setEditOptions(options.description)
        }
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
                <Text onPress={handleTitlePress} style={styles.title}>{exerciseData.title}</Text>
                <Text onPress={handleDescriptionPress} style={styles.description} numberOfLines={1}>{exerciseData.description}</Text>
            </View>
            {!add && <DoneIcon style={styles.done} opacity={done ? 1 : 0.1} onPress={handleDone}/>}
            {(add && !last) && <DeleteIcon style={styles.delete} onPress={() => onDelete(number - 1)}/>}
        </Pressable>
    )
}

export default Exercise;
