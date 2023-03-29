import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles.goals-section";
import GoalCard from "../GoalCard";

const GoalsSection = () =>  {
    return <View style={styles.goalsSection}>
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
    </View>;
}

export default GoalsSection;
