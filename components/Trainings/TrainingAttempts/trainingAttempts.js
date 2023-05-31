import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { styles } from "./style.training-attemtps";
import trainingImage from "../../../assets/images/examples/woman.png";
import { useEffect, useState } from "react";

const TrainingAttempts = ({onAttemptPress, attempts }) => {
  const [trainingsToShow, setTrainingsToShow] = useState([]);


  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {"Continue your work"}
        </Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>{"See all"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.trainingsContainer}
      >
        <TouchableOpacity style={styles.attemptCard}>
          <Text style={styles.difficulty}>Intermediate</Text>
          <Image source={trainingImage} style={styles.trainingImage}/>
          <View style={styles.infoContainer}>
            <Text style={styles.trainingTitle} numberOfLines={1}>{"Push Ups"}</Text>
            <Text style={styles.trainingDetail}>{10} min and 400 steps done</Text>
            <View style={styles.progressBar}>
              <View style={{...styles.progress, width: `${20}%`}}></View>
              <Text style={styles.progressText}>
                {20}%
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.attemptCard}>
          <Text style={styles.difficulty}>Intermediate</Text>
          <Image source={trainingImage} style={styles.trainingImage}/>
          <View style={styles.infoContainer}>
            <Text style={styles.trainingTitle} numberOfLines={1}>{"Push Ups"}</Text>
            <Text style={styles.trainingDetail}>{10} min and 400 steps done</Text>
            <View style={styles.progressBar}>
              <View style={{...styles.progress, width: `${20}%`}}></View>
              <Text style={styles.progressText}>
                {20}%
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.attemptCard, marginBottom: 100}}>
          <Text style={styles.difficulty}>Intermediate</Text>
          <Image source={trainingImage} style={styles.trainingImage}/>
          <View style={styles.infoContainer}>
            <Text style={styles.trainingTitle} numberOfLines={1}>{"Push Ups"}</Text>
            <Text style={styles.trainingDetail}>{10} min and 400 steps done</Text>
            <View style={styles.progressBar}>
              <View style={{...styles.progress, width: `${20}%`}}></View>
              <Text style={styles.progressText}>
                {20}%
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default TrainingAttempts;
