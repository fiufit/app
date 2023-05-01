import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.view-profile";
import DataSection from "../Profile/DataSection";
import Back from "../Shared/Back/back";
import TrainingCard from "../Shared/TrainingCard/trainingCard";
import trainingImage from "../../assets/images/examples/training.png";


const ViewProfile = ({navigation, route}) => {
    const handleBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Back onPress={handleBack}/>
            <DataSection onEditProfilePress={() => navigation.navigate({name: "Edit Profile", merge: true})} otherUserData={route.params.userData} other/>
            <View style={{height: "78%", width: "100%", display: "flex", alignItems: "center"}}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{`Created`} trainings</Text>
                </View>
                <ScrollView contentContainerStyle={{alignItems: "center", flexGrow: 1, gap: 10}} style={styles.scrollView}>
                    <TrainingCard title={'Hand Training'} duration={40} imageSource={trainingImage}/>
                    <TrainingCard title={'Hand Training'} duration={40} imageSource={trainingImage}/>
                    <TrainingCard title={'Hand Training'} duration={40} imageSource={trainingImage}/>
                    <TrainingCard title={'Hand Training'} duration={40} imageSource={trainingImage}/>
                </ScrollView>
            </View>
        </View>
    )
}

export default ViewProfile;
