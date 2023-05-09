import { styles } from "./styles.upload-training";
import { TextInput } from "react-native-paper";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Back from "../../Shared/Back/back";
import AddImageIcon from "../../../assets/images/general/galleryadd.svg";
import { WHITE } from "../../../utils/colors";
import Exercise from "../SingleTraining/Exercise/exercise";
import Button from "../../Shared/Button/button";
import ImageModal from "../../Shared/Modals/ImageModal/imageModal";
import EditModal from "../../Shared/Modals/EditModal/editModal";
import { useState } from "react";
import TrainingController from "../../../utils/controllers/TrainingController";
import { useIdToken } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import LoadingModal from "../../Shared/Modals/LoadingModal/loadingModal";
import { useRecoilState } from "recoil";
import { createdTrainingsState } from "../../../atoms";
import {difficulties, getDifficultyIndex, parseExercises} from "../../../utils/trainings";

const UploadTraining = ({ navigation, route }) => {
  const [createdTrainings, setCreatedTrainings] = useRecoilState(
    createdTrainingsState
  );
  const { edit, trainingData } = route?.params ?? {};
  const [user] = useIdToken(auth);
  const [exercisesToUpload, setExercisesToUpload] = useState(
    trainingData?.Exercises ? parseExercises(trainingData?.Exercises) : []
  );
  const [exercisesToDelete, setExercisesToDelete] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [image, setImage] = useState(trainingData?.PictureUrl ?? null);
  const [editOptions, setEditOptions] = useState({});
  const [titleToUpload, setTitleToUpload] = useState(trainingData?.Name ?? "");
  const [durationToUpload, setDurationToUpload] = useState(
    trainingData?.Duration ?? ""
  );
  const [difficultyToUploadIndex, setDifficultyToUploadIndex] = useState(
    trainingData?.Difficulty ? getDifficultyIndex(trainingData?.Difficulty) : 0
  );
  const [titleError, setTitleError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [exercisesError, setExercisesError] = useState("");
  const [imageError, setImageError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleAddExercise = () => {
    setExercisesError("");
    setExercisesToUpload([
      ...exercisesToUpload,
      { title: "Exercise Title", description: "Exercise instruction" },
    ]);
  };

  const handleAddImage = () => {
    setShowImageModal(true);
  };

  const handleTitlePress = () => {
    setTitleError("");
    setEditOptions(options.title);
  };

  const handleDurationPress = () => {
    setDurationError("");
    setEditOptions(options.duration);
  };

  const handleDifficultyPress = () => {
    setDifficultyToUploadIndex(
      difficultyToUploadIndex + 1 === difficulties.length
        ? 0
        : difficultyToUploadIndex + 1
    );
  };

  const handleExerciseDelete = (index, exercise) => {
    const updatedExercises = exercisesToUpload.filter((_, i) => i !== index);
    setExercisesToUpload(updatedExercises);
    if(edit){
      setExercisesToDelete([...exercisesToDelete, exercise]);
    }
  };

  const handleButtonPress = async () => {
    if (!titleToUpload) {
      setTitleError("Add a title!");
    }

    if (!durationToUpload) {
      setDurationError("Add a duration!");
    }

    if (!exercisesToUpload.length) {
      setExercisesError("Add an exercise!");
    }

    if (!image) {
      setImageError("Upload an image!");
    }

    if (
      titleToUpload &&
      durationToUpload &&
      exercisesToUpload.length &&
      image
    ) {
      setUploading(true);
      const controller = new TrainingController(user);

      if (edit) {
        const updatedTrainingData = {
          name: titleToUpload,
          difficulty: difficulties[difficultyToUploadIndex],
          duration: durationToUpload,
        }
        await controller.editTraining(trainingData, updatedTrainingData,  exercisesToUpload, exercisesToDelete);

        setExercisesToDelete([]);
      } else {

        const [{ data, error }, PictureUrl] = await controller.createTraining(
          {
            name: titleToUpload,
            description: "to do",
            difficulty: difficulties[difficultyToUploadIndex],
            duration: durationToUpload,
            exercises: exercisesToUpload,
          },
          image
        );

        console.log(data);
        console.log("ERROR", error)
        if (error) {
          alert(error.description);
        } else {
          setCreatedTrainings([
            ...createdTrainings,
            { ...data.training_plan, PictureUrl },
          ]);
          setDifficultyToUploadIndex(0);
          setDurationToUpload("");
          setTitleToUpload("");
          setExercisesToUpload([]);
          setImage(null);
          navigation.navigate({
            name: "Training List",
            merge: true,
            params: {
              trainings: createdTrainings,
              title: "Created Trainings",
              created: true,
            },
          });
        }
      }
      setUploading(false);
    }
  };

  const options = {
    title: {
      title: "Edit the title",
      value: titleToUpload,
      icon: <TextInput.Icon icon="note-text-outline" />,
      placeholder: "Title",
      setEditValue: setTitleToUpload,
    },
    duration: {
      title: "Edit the estimated duration",
      value: durationToUpload,
      icon: <TextInput.Icon icon="clock-outline" />,
      placeholder: "Duration (min)",
      setEditValue: setDurationToUpload,
      inputMode: "numeric",
    },
  };

  return (
    <>
      <View style={styles.container}>
        <Back onPress={() => navigation.goBack()} />
        <View style={styles.imageContainer}>
          <Pressable style={styles.addImageContainer} onPress={handleAddImage}>
            {!image ? (
              <>
                <AddImageIcon />
                <Text
                  style={{
                    ...styles.addImageText,
                    color: imageError ? "red" : "#464646",
                  }}
                >
                  {imageError ? imageError : "Upload Image"}
                </Text>
              </>
            ) : (
              <Image source={{ uri: image }} style={styles.image} />
            )}
          </Pressable>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleAndIconContainer}>
            <Text
              onPress={handleTitlePress}
              style={{ ...styles.title, color: titleError ? "red" : "black" }}
            >
              {titleError
                ? titleError
                : titleToUpload
                ? titleToUpload
                : "Title"}
            </Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text onPress={handleDifficultyPress} style={styles.detail}>
              {difficulties[difficultyToUploadIndex]}
            </Text>
            <Text
              onPress={handleDurationPress}
              style={{
                ...styles.detail,
                color: durationError ? "red" : "#192126",
              }}
            >
              {durationError
                ? durationError
                : durationToUpload
                ? `${durationToUpload} min`
                : "Estimated Duration"}
            </Text>
          </View>
          <Text
            style={{
              ...styles.start,
              color: exercisesError ? "red" : "black",
            }}
          >
            {exercisesError ? exercisesError : "Exercises"}
          </Text>
          <View style={{ height: "35%", width: "100%" }}>
            <ScrollView
              style={styles.exercisesContainer}
              contentContainerStyle={{ gap: 20 }}
              showsVerticalScrollIndicator={false}
            >
              {exercisesToUpload.map((exercise, index) => {
                return (
                  <Exercise
                    exerciseData={exercise}
                    number={index + 1}
                    key={index}
                    add
                    exercises={exercisesToUpload}
                    setExercises={setExercisesToUpload}
                    onDelete={(index, exercise) => handleExerciseDelete(index, exercise)}
                    setEditOptions={setEditOptions}
                  />
                );
              })}
              <Exercise
                exerciseData={{ title: "Add one exercise..." }}
                number={"+"}
                last
                add
                onPress={handleAddExercise}
              />
            </ScrollView>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.createButton}
            fontSize={16}
            textColor={WHITE}
            onPress={handleButtonPress}
          >
            {edit ? "Update" : "Create"}
          </Button>
        </View>
      </View>
      {showImageModal && (
        <ImageModal
          imageAspect={[4, 3]}
          onClose={() => setShowImageModal(false)}
          onUpload={(image) => {
            setImageError("");
            setImage(image);
            setShowImageModal(false);
          }}
        />
      )}
      {editOptions.title && (
        <EditModal
          title={editOptions.title}
          editIcon={editOptions.icon}
          inputMode={editOptions?.inputMode}
          editValue={editOptions.value}
          buttonText={"Confirm"}
          setEditValue={editOptions.setEditValue}
          editPlaceHolder={editOptions.placeholder}
          onButtonPress={() => setEditOptions({})}
        />
      )}
      {uploading && (
        <LoadingModal
          text={edit ? "Updating training..." : "Creating training..."}
        />
      )}
    </>
  );
};

export default UploadTraining;
