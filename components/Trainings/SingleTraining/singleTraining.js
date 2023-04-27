import {Image, Pressable, ScrollView, Text, View} from "react-native";
import {styles} from "./style.single-training";
import Back from "../../Shared/Back/back";
import trainingImage from "../../../assets/images/examples/woman.png";
import FavouriteIcon from "../../../assets/images/general/favouriteIcon.svg"
import AddImageIcon from "../../../assets/images/general/galleryadd.svg"
import {React, useState} from "react";
import {WHITE} from "../../../utils/colors";
import Exercise from "./Exercise/exercise";
import Button from "../../Shared/Button/button";
import ImageModal from "../../Shared/Modals/ImageModal/imageModal";
import EditModal from "../../Shared/Modals/EditModal/editModal";
import {TextInput} from "react-native-paper";

const SingleTraining = ({navigation, route}) => {
    //TODO Refactor this into two componets, (one for viewing and one for creating)
    const {title, duration, difficulty, exercises, add} = route.params.training;
    const {isFavourite} = route.params;


    const [favourite, setFavourite] = useState(isFavourite)
    const [exercisesToUpload, setExercisesToUpload] = useState([])
    const [showImageModal, setShowImageModal] = useState(false)
    const [image, setImage] = useState(null);
    const [editOptions, setEditOptions] = useState({});
    const [titleToUpload, setTitleToUpload] = useState('Title');
    const [durationToUpload, setDurationToUpload] = useState('Estimated duration');
    const [difficultyToUploadIndex, setDifficultyToUploadIndex] = useState(0);

    const handleAddExercise = () => {
        setExercisesToUpload([...exercisesToUpload, {title: 'Exercise Title', description: 'Exercise instruction'}])
    }

    const handleAddImage = () => {
        setShowImageModal(true)
    }

    const handleTitlePress = () => {
        if(add){
            setEditOptions(options.title)
        }
    }

    const handleDurationPress = () => {
        if(add){
            setEditOptions(options.duration)
        }
    }

    const handleDifficultyPress = () => {
        if(add){
            setDifficultyToUploadIndex(difficultyToUploadIndex + 1 === difficulties.length ? 0 : difficultyToUploadIndex + 1)
        }
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
            value: '',
            icon: <TextInput.Icon icon="clock-outline"/>,
            placeholder: "Duration (min)",
            setEditValue: (value) => {
                setDurationToUpload(`${value.split(' ')[0]} min`)
            },
            inputMode: 'numeric'
        }
    }

    const difficulties = [
        'Beginner',
        'Intermediate',
        'Expert'
    ]


    console.log(exercisesToUpload)
    return(
        <>
            <View style={styles.container}>
                <Back onPress={() => navigation.goBack()}/>
                <View style={styles.imageContainer}>
                    {!add ?
                        <Image style={styles.image} source={trainingImage}/>
                        :
                        <Pressable style={styles.addImageContainer} onPress={handleAddImage}>

                            {!image ? <>
                                <AddImageIcon/>
                                <Text style={styles.addImageText}>Upload Image</Text>
                            </> : <Image source={{uri: image}} style={styles.image}/>}
                        </Pressable>
                    }
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.titleAndIconContainer}>
                        <Text onPress={handleTitlePress} style={styles.title}>{title ?? titleToUpload}</Text>
                        {!add && <FavouriteIcon color={favourite ? "#000000" : WHITE} onPress={() => setFavourite(!favourite)}/>}
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text onPress={handleDifficultyPress} style={styles.detail}>{difficulty ?? difficulties[difficultyToUploadIndex]}</Text>
                        <Text onPress={handleDurationPress} style={styles.detail}>{duration ?? durationToUpload}</Text>
                    </View>
                    <Text style={styles.start}>{!add ? "Let's Start!" : "Exercises"}</Text>
                    <View style={{height: add ? "35%" : "45%", width: '100%'}}>
                        <ScrollView style={styles.exercisesContainer} contentContainerStyle={{gap: 20}} showsVerticalScrollIndicator={false} >
                            {exercises?.length && exercises.map((exercise, index) => {
                                return <Exercise exerciseData={exercise} number={index + 1} key={index + Math.random()} last={((exercises.length - 1) === index)}/>
                            })}
                            {add && exercisesToUpload.map((exercise, index) => {
                                return <Exercise exerciseData={exercise} number={index + 1} key={index} add
                                                 onDelete={(index) => handleExerciseDelete(index)}/>
                            })}
                            {add &&
                                <Exercise exerciseData={{title: 'Add one exercise...'}} number={"+"} last add onPress={handleAddExercise}/>
                            }
                        </ScrollView>
                    </View>
                </View>
                {add && <View style={styles.buttonContainer}>
                    <Button style={styles.createButton} fontSize={16} textColor={WHITE}>Create</Button>
                </View>}
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

export default SingleTraining;
