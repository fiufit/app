import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.profile";
import DataSection from "./DataSection";
import MenuIcon from "../../assets/images/general/menuIcon.svg"
import {DARK_BLUE} from "../../utils/colors";
import {useState} from "react";
import ProfileSwitcher from "./ProfileSwitcher";
import trainingImage from "../../assets/images/examples/training.png"
import GoalCard from "./GoalCard";

const Profile = ({navigation}) => {
    const [athleteProfileSelected, setAthleteProfileSelected] = useState(true);
    //TODO: Refactor in more components
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menuButton}>
                <MenuIcon color={DARK_BLUE}/>
            </TouchableOpacity>
            <DataSection/>
            <ProfileSwitcher setAthleteProfileSelected={setAthleteProfileSelected}
                             athleteProfileSelected={athleteProfileSelected}/>
            <View style={{height: "90%", width: "100%"}}>
                <ScrollView contentContainerStyle={{alignItems: "center", flexGrow: 1}} style={styles.scrollView} >
                    <View style={styles.trainingsSection}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Your trainings</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAll}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.trainingCard}>
                            <Image source={trainingImage} style={styles.trainingImage}/>
                        </View>
                    </View>
                    <View style={styles.goalsSection}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Your goals</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAll}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.goalCardsContainer}>
                            <GoalCard title={"The burnout"} description={"Burn 20000 calories"} progress={20}/>
                            <GoalCard title={"Walking Queen"} description={"Walk 200000 steps"} progress={48}/>
                        </View>
                    </View>
                </ScrollView>
            </View>







        </View>
    )
}

export default Profile;
