import {
  Pressable,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { styles } from "./styles.upload-goal";
import Back from "../../Shared/Back/back";
import Input from "../../Shared/Input/input";
import Button from "../../Shared/Button/button";
import {
  BLACK,
  DARK_BLUE,
  GREY,
  LIGHT_GREY,
  WHITE,
} from "../../../utils/colors";
import { React, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-paper";
import {categoriesType, difficulties, interests, typesCategory} from "../../../utils/trainings";
import SubCategorySelector from "./SubCategorySelector/subCategorySelector";
import TrainingController from "../../../utils/controllers/TrainingController";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import EditModal from "../../Shared/Modals/EditModal/editModal";
import ErrorModal from "../../Shared/Modals/ErrorModal/ErrorModal";
import {useRecoilState} from "recoil";
import {goalsState} from "../../../atoms";

const UploadGoal = ({ navigation, route }) => {
  const {edit, goalIndex} = route.params;
  const [user] = useAuthState(auth);
  const [goals, setGoals] = useRecoilState(goalsState);
  const goalCategories = ["Trainings", "Steps", "Minutes"];
  const [selectedCategory, setSelectedCategory] = useState(edit ? typesCategory[goals[goalIndex].type] : "Trainings");
  const [selectedSubcategory, setSelectedSubcategory] = useState(edit ? (goals[goalIndex].subtype.charAt(0).toUpperCase() + goals[goalIndex].subtype.slice(1)) : "Beginner");
  const [dateInputTouched, setDateInputTouched] = useState(edit);
  const [showPicker, setShowPicker] = useState(false);
  const [deadline, setDeadline] = useState(edit ? new Date(goals[goalIndex].deadline) : new Date());
  const [goalValue, setGoalValue] = useState(edit ? String(goals[goalIndex].value) : null);
  const [title, setTitle] = useState(edit ? goals[goalIndex].title : "");
  const [titleError, setTitleError] = useState("");
  const [goalValueError, setGoalValueError] = useState("");
  const [dateError, setDateError] = useState("");
  const [editOptions, setEditOptions] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);



  const options = {
    title: {
      title: "Set a title",
      value: title,
      icon: <TextInput.Icon icon="note-text-outline" />,
      placeholder: "Title",
      setEditValue: setTitle,
    },
    goalValue: {
      title: "Set a goal value",
      value: goalValue,
      icon: <TextInput.Icon icon="flag-checkered" />,
      placeholder: "Goal value",
      setEditValue: setGoalValue,
      inputMode: "numeric",
    },
  };

  const onDateChange = ({ type }, selectedDate) => {
    setShowPicker(false);
    if (type === "set") {
      if (selectedDate < new Date()) {
        setDateError("Select a future date!");
        setDateInputTouched(false);
        setDeadline(new Date());
        return;
      }
      setDeadline(selectedDate);
      setDateError("");
      setDateInputTouched(true);
    }
  };

  const refreshStates = () => {
    setTitle("");
    setGoalValue(null);
    setDateInputTouched(false);
    setShowPicker(false);
    setDeadline(new Date());
    setTitleError("");
    setGoalValueError("");
    setDateError("");
  };

  const createGoal = async () => {
    setLoading(true)
    const controller = new TrainingController(user);
    const { data, error } = await controller.createGoal({
      title,
      type: categoriesType[selectedCategory],
      subtype:
          selectedCategory === "Trainings"
              ? selectedSubcategory.toLowerCase()
              : null,
      value: goalValue,
      deadline,
    });

    if (error) {
      console.log(error);
      setShowErrorModal(true);
    } else {
      setGoals([...goals, data]);
      refreshStates();
      navigation.navigate("Profile");
    }
    setLoading(false)
  }

  const updateGoal = async () => {
    setLoading(true)
    const controller = new TrainingController(user);
    const { data, error } = await controller.updateGoal(goals[goalIndex].ID, {
        title,
        value: goalValue,
        deadline,
    });

    if (error) {
        console.log(error);
        setShowErrorModal(true);
    } else {
        let newGoals = [...goals];
        newGoals[goalIndex] = data;
        setGoals(newGoals);
        refreshStates();
        navigation.navigate("Profile");
    }
    setLoading(false)
  }

  const handleGoalUpload = async () => {
    if (!title) {
      setTitleError("Title is required!");
    }
    if (!goalValue) {
      setGoalValueError("Goal value is required!");
    }
    if (!dateInputTouched) {
      setDateError("Deadline is required!");
    }
    if (Number.isInteger(goalValue)) {
      setGoalValueError("Goal value must be an integer!");
    }

    if (
      !title ||
      !goalValue ||
      !dateInputTouched ||
      Number.isInteger(goalValue)
    ) {
      return;
    } else {
      if(edit){
        await updateGoal();
      } else{
        await createGoal();
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Back onPress={() => navigation.goBack()} />
        <View style={{ height: "75%", width: "100%", marginTop: "25%" }}>
          <ScrollView
            contentContainerStyle={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text style={styles.title}>
              {edit ? "Update your goal" : "Create a goal"}
            </Text>
            <Text style={{ ...styles.subTitle, opacity: !edit ? 1 : 0.25 }}>
              Select your goal category:
            </Text>
            <View
              style={{ ...styles.buttonsContainer, opacity: !edit ? 1 : 0.35 }}
            >
              {goalCategories.map((category, index) => (
                <Button
                  onPress={() => {
                    if(!edit) {
                      setSelectedCategory(category);
                    }
                  }}
                  key={index}
                  style={styles.categoryButton}
                  buttonColor={
                    selectedCategory === category ? DARK_BLUE : WHITE
                  }
                  textColor={selectedCategory === category ? WHITE : BLACK}
                >
                  {category}
                </Button>
              ))}
            </View>

            <SubCategorySelector
              selectedSubcategory={selectedSubcategory}
              setSelectedSubcategory={setSelectedSubcategory}
              canSelect={selectedCategory === "Trainings" && !edit}
            />

            <View style={{ ...styles.inputContainer, marginTop: 10 }}>
              <Text style={styles.subTitle}>Set your deadline:</Text>
              <TouchableHighlight
                onPress={() => setShowPicker(true)}
                underlayColor={"transparent"}
              >
                <Input
                  placeholder={dateError ? dateError : "Select a date"}
                  value={dateInputTouched ? deadline.toDateString() : ""}
                  marginTop={0}
                  editable={false}
                  height={40}
                  width={"100%"}
                  color={BLACK}
                  left={<TextInput.Icon icon="calendar" />}
                  placeholderTextColor={dateError ? "red" : null}
                />
              </TouchableHighlight>
            </View>

            <Pressable
              style={styles.inputContainer}
              onPress={() => setEditOptions(options.goalValue)}
            >
              <Text style={styles.subTitle}>Set your goal value:</Text>
              <Input
                placeholder={goalValueError ? goalValueError : "Enter a value"}
                value={goalValue}
                editable={false}
                marginTop={0}
                inputMode={"numeric"}
                height={40}
                width={"100%"}
                color={BLACK}
                left={<TextInput.Icon icon="flag-checkered" />}
                placeholderTextColor={goalValueError ? "red" : null}
              />
            </Pressable>
            <Pressable
              style={styles.inputContainer}
              onPress={() => setEditOptions(options.title)}
            >
              <Text style={styles.subTitle}>Set a title:</Text>
              <Input
                placeholder={titleError ? titleError : "Enter a title"}
                value={title}
                editable={false}
                marginTop={0}
                height={40}
                width={"100%"}
                color={BLACK}
                left={<TextInput.Icon icon="note-text-outline" />}
                placeholderTextColor={titleError ? "red" : null}
              />
            </Pressable>
          </ScrollView>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.createButton}
          fontSize={16}
          textColor={WHITE}
          onPress={handleGoalUpload}
        >
          {edit ? loading ? "Updating..." : "Update" : loading ? "Creating..." : "Create"}
        </Button>
      </View>
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={new Date(deadline)}
          onChange={onDateChange}
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
      <ErrorModal
        setModalIsVisible={setShowErrorModal}
        modalIsVisible={showErrorModal}
        errorTitle={"Oooops!"}
        errorDescription={
          "There was an error while uploading your goal, try again later!"
        }
      />
    </>
  );
};

export default UploadGoal;
