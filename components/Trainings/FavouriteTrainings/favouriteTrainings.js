import {View, Text, TouchableOpacity, ScrollView, Image, Pressable} from "react-native";
import {styles} from "./style.favourite-trainings";
import trainingImage from "../../../assets/images/examples/woman.png";
import {useEffect, useState} from "react";


const FavouriteTrainings = ({favourite, recommended, onTrainingPress}) => {
    const [trainingsToShow, setTrainingsToShow] = useState([]);

    useEffect(() => {
        //TODO fetch trainings from db and if there are not favourites show recommended
        if(favourite.length){
            setTrainingsToShow(favourite)
        } else{
            setTrainingsToShow(recommended)
        }
    }, [favourite, recommended])


    const transformTrainings = (trainings) => {
        const transformedTrainings = [];
        if (trainings.length <= 2) {
            return trainings.map(training => [training])
        }
        for (let i = 0; i < trainings.length; i += 2) {
            if (i + 1 < trainings.length) {
                transformedTrainings.push([trainings[i], trainings[i + 1]]);
            } else {
                transformedTrainings.push([trainings[i]]);
            }
        }
        return transformedTrainings;
    }


    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    {favourite.length ? 'Favourite Trainings' : 'Add these to favourites'}
                </Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>{favourite.length ? 'See all' : ''}</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal style={styles.trainingsContainer} showsHorizontalScrollIndicator={false}>
                {transformTrainings(trainingsToShow).map((trainingColumn, idx) =>
                    <View style={styles.cardColumn} key={idx}>
                        {trainingColumn.map(training =>
                            <TouchableOpacity style={styles.trainingCard} key={training.id} onPress={() => onTrainingPress(training)}>
                                <Image source={trainingImage} style={styles.trainingImage}/>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.trainingTitle} numberOfLines={1}>{training.title}</Text>
                                    <View style={styles.detailsContainer}>
                                        <Text style={styles.trainingDetail}>{training.duration}</Text>
                                        <Text style={styles.trainingDetail}>{training.difficulty}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

export default FavouriteTrainings;
