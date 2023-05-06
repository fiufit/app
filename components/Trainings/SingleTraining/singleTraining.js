import {Image, Pressable, ScrollView, Text, View} from "react-native";
import {styles} from "./style.single-training";
import Back from "../../Shared/Back/back";
import trainingImage from "../../../assets/images/examples/woman.png";
import FavouriteIcon from "../../../assets/images/general/favouriteIcon.svg"
import {React, useState} from "react";
import {WHITE} from "../../../utils/colors";
import Exercise from "./Exercise/exercise";

const SingleTraining = ({navigation, route}) => {
    const {title, duration, difficulty, exercises} = route.params.training;
    const {isFavourite} = route.params;
    const [favourite, setFavourite] = useState(isFavourite)


    return(
        <>
            <View style={styles.container}>
                <Back onPress={() => navigation.goBack()}/>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={trainingImage}/>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.titleAndIconContainer}>
                        <Text  style={styles.title}>{title}</Text>
                        <FavouriteIcon color={favourite ? "#000000" : WHITE} onPress={() => setFavourite(!favourite)}/>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detail}>{difficulty}</Text>
                        <Text style={styles.detail}>{duration}</Text>
                    </View>
                    <Text style={styles.start}>{"Let's Start!"}</Text>
                    <View style={{height: "45%", width: '100%'}}>
                        <ScrollView style={styles.exercisesContainer} contentContainerStyle={{gap: 20}} showsVerticalScrollIndicator={false} >
                            {exercises?.length && exercises.map((exercise, index) => {
                                return <Exercise exerciseData={exercise} number={index + 1} key={index + Math.random()} last={((exercises.length - 1) === index)}/>
                            })}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </>

    )
}

export default SingleTraining;