import {styles} from "./styles.new-training";
import {TextInput} from "react-native-paper";
import {Image, Pressable, ScrollView, Text, View} from "react-native";
import Back from "../../Shared/Back/back";
import AddImageIcon from "../../../assets/images/general/galleryadd.svg";
import {WHITE} from "../../../utils/colors";
import Exercise from "../SingleTraining/Exercise/exercise";
import Button from "../../Shared/Button/button";
import ImageModal from "../../Shared/Modals/ImageModal/imageModal";
import EditModal from "../../Shared/Modals/EditModal/editModal";
import {useState} from "react";

const NewTraining = ({navigation}) => {
    const [exercisesToUpload, setExercisesToUpload] = useState([])
    const [showImageModal, setShowImageModal] = useState(false)
    const [image, setImage] = useState(null);
    const [editOptions, setEditOptions] = useState({});
    const [titleToUpload, setTitleToUpload] = useState('');
    const [durationToUpload, setDurationToUpload] = useState('');
    const [difficultyToUploadIndex, setDifficultyToUploadIndex] = useState(0);

    const handleAddExercise = () => {
        setExercisesToUpload([...exercisesToUpload, {title: 'Exercise Title', description: 'Exercise instruction'}])
    }

    const handleAddImage = () => {
        setShowImageModal(true)
    }

    const handleTitlePress = () => {
        setEditOptions(options.title)
    }

    const handleDurationPress = () => {
        setEditOptions(options.duration)
    }

    const handleDifficultyPress = () => {
        setDifficultyToUploadIndex(difficultyToUploadIndex + 1 === difficulties.length ? 0 : difficultyToUploadIndex + 1)
    }

    const handleExerciseDelete = (index) => {
        const updatedExercises = exercisesToUpload.filter((_, i) => i !== index);
        setExercisesToUpload(updatedExercises)
    }

    const options =  {
        title: {
            title: "Edit the title",
            value: titleToUpload,
            icon: <TextInput.Icon icon="note-text-outline"/>,
            placeholder: "Title",
            setEditValue: setTitleToUpload,
        },
        duration: {
            title: "Edit the estimated duration",
            value: durationToUpload,
            icon: <TextInput.Icon icon="clock-outline"/>,
            placeholder: "Duration (min)",
            setEditValue: setDurationToUpload,
            inputMode: 'numeric'
        }
    }

    const difficulties = [
        'Beginner',
        'Intermediate',
        'Expert'
    ]


    return(
        <>
            <View style={styles.container}>
                <Back onPress={() => navigation.goBack()}/>
                <View style={styles.imageContainer}>
                    <Pressable style={styles.addImageContainer} onPress={handleAddImage}>
                        {!image ?
                            <>
                                <AddImageIcon/>
                                <Text style={styles.addImageText}>Upload Image</Text>
                            </>
                            :
                            <Image source={{uri: image}} style={styles.image}/>}
                    </Pressable>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.titleAndIconContainer}>
                        <Text onPress={handleTitlePress} style={styles.title}>{titleToUpload ? titleToUpload : 'Title'}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text onPress={handleDifficultyPress} style={styles.detail}>{difficulties[difficultyToUploadIndex]}</Text>
                        <Text onPress={handleDurationPress} style={styles.detail}>{durationToUpload ? `${durationToUpload} min` : 'Estimated Duration'}</Text>
                    </View>
                    <Text style={styles.start}>{"Exercises"}</Text>
                    <View style={{height: "35%", width: '100%'}}>
                        <ScrollView style={styles.exercisesContainer} contentContainerStyle={{gap: 20}} showsVerticalScrollIndicator={false} >
                            {exercisesToUpload.map((exercise, index) => {
                                return <Exercise exerciseData={exercise} number={index + 1} key={index} add
                                                 exercises={exercisesToUpload}
                                                 setExercises={setExercisesToUpload}
                                                 onDelete={(index) => handleExerciseDelete(index)}
                                                 setEditOptions={setEditOptions}/>
                            })}
                            <Exercise exerciseData={{title: 'Add one exercise...'}} number={"+"} last add onPress={handleAddExercise}/>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button style={styles.createButton} fontSize={16} textColor={WHITE}>Create</Button>
                </View>
            </View>
            {showImageModal && <ImageModal imageAspect={[4, 3]} onClose={() => setShowImageModal(false)} onUpload={(image) => {
                setImage(image);
                setShowImageModal(false)
            }}/>}
            {editOptions.title &&
                <EditModal title={editOptions.title}
                           editIcon={editOptions.icon}
                           inputMode={editOptions?.inputMode}
                           editValue={editOptions.value}
                           buttonText={"Confirm"}
                           setEditValue={editOptions.setEditValue}
                           editPlaceHolder={editOptions.placeholder}
                           onButtonPress={() => setEditOptions({})}/>}
        </>

    )
}

export default NewTraining;
