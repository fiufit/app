import {View, Text, TouchableOpacity, ScrollView, Image} from "react-native";
import {styles} from "./style.favourite-trainings";
import trainingImage from "../../../assets/images/examples/woman.png";
import {useEffect, useState} from "react";


const FavouriteTrainings = () => {
    const [trainingsToShow, setTrainingsToShow] = useState([]);
    const favouriteTrainings = [
        {
            title: 'Belly fat burner',
            duration: '10 min',
            difficulty: 'Begineer',
            id: 1
        },
        {
            title: 'Belly fat burner',
            duration: '10 min',
            difficulty: 'Begineer',
            id: 2
        },
        {
            title: 'Belly fat burner',
            duration: '10 min',
            difficulty: 'Begineer',
            id: 3
        },
        {
            title: 'Belly fat burner',
            duration: '10 min',
            difficulty: 'Begineer',
            id: 4
        },
        {
            title: 'Belly fat burner',
            duration: '10 min',
            difficulty: 'Begineer',
            id: 5
        }
    ];
    useEffect(() => {
        //TODO fetch trainings from db and if there are not favourites show recommended
        setTrainingsToShow(favouriteTrainings)
    }, [])


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
                    {favouriteTrainings.length ? 'Favourite Trainings' : 'Add these to favourites'}
                </Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>{favouriteTrainings.length ? 'See all' : ''}</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal style={styles.trainingsContainer} showsHorizontalScrollIndicator={false}>
                {transformTrainings(trainingsToShow).map((trainingColumn, idx) =>
                    <View style={styles.cardColumn} key={idx}>
                        {trainingColumn.map(training =>
                            <View style={styles.trainingCard} key={training.id}>
                                <Image source={trainingImage} style={styles.trainingImage}/>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.trainingTitle}>{training.title}</Text>
                                    <View style={styles.detailsContainer}>
                                        <Text style={styles.trainingDetail}>{training.duration}</Text>
                                        <Text style={styles.trainingDetail}>{training.difficulty}</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

export default FavouriteTrainings;
