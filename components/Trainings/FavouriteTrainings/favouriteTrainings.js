import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import {styles} from "./style.favourite-trainings";


const FavouriteTrainings = () => {


    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Favourite Trainings</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal style={styles.trainingsContainer} showsHorizontalScrollIndicator={false}>
                <View style={styles.cardColumn}>
                    <View style={styles.trainingCard}>
                    </View>
                    <View style={styles.trainingCard}>
                    </View>
                </View>
                <View style={styles.cardColumn}>
                    <View style={styles.trainingCard}>
                    </View>
                    <View style={styles.trainingCard}>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default FavouriteTrainings;
