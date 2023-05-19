import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style.ratings";
import Back from "../Shared/Back/back";
import StarIcon from "../../assets/images/general/star.svg";
import { DARK_BLUE, WHITE } from "../../utils/colors";
import Button from "../Shared/Button/button";
import { DEFAULT_PROFILE_PICTURE } from "../../firebase";
import RatingModal from "../Shared/Modals/RatingModal/ratingModal";
import { useState } from "react";

const MAX_RATING = 5;

const Ratings = ({ navigation, route }) => {
  // const {training} = route.params;

  const [showRatingModal, setShowRatingModal] = useState(false);

  const handleSubmit = (rating, comment) => {
    //TODO
  };

  return (
    <>
      <View style={styles.container}>
        <Back onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Belly fat burner</Text>
        {/*<Text style={styles.subtitle}>Be the first to rate this training!</Text>*/}
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>4.5</Text>
          <StarIcon color={DARK_BLUE} height={50} width={50} />
        </View>
        <View style={{ height: "50%", width: "100%" }}>
          <ScrollView
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            style={styles.ratingsContainer}
            contentContainerStyle={{ alignItems: "center", gap: 20 }}
          >
            <View style={styles.starsAndTextContainer}>
              <TouchableOpacity style={styles.ratingCard}>
                <Image
                  source={{ uri: DEFAULT_PROFILE_PICTURE }}
                  style={styles.profilePicture}
                />
                <View>
                  <Text style={styles.name}>Juan carlos</Text>
                  <View style={styles.starsContainer}>
                    {Array(MAX_RATING)
                      .fill()
                      .map((_, index) => {
                        return (
                          <StarIcon
                            key={index}
                            width={15}
                            height={15}
                            color={DARK_BLUE}
                          />
                        );
                      })}
                  </View>
                </View>
              </TouchableOpacity>
              <Text style={styles.ratingText}>
                Excelent training! I really enjoyed it and I can see the results
                already!
              </Text>
            </View>
            <View style={styles.starsAndTextContainer}>
              <TouchableOpacity style={styles.ratingCard}>
                <Image
                  source={{ uri: DEFAULT_PROFILE_PICTURE }}
                  style={styles.profilePicture}
                />
                <View>
                  <Text style={styles.name}>Juan carlos</Text>
                  <View style={styles.starsContainer}>
                    {Array(MAX_RATING)
                      .fill()
                      .map((_, index) => {
                        return (
                          <StarIcon
                            key={index}
                            width={15}
                            height={15}
                            color={DARK_BLUE}
                          />
                        );
                      })}
                  </View>
                </View>
              </TouchableOpacity>
              <Text style={styles.ratingText}>
                Excelent training! I really enjoyed it and I can see the results
                already!
              </Text>
            </View>
            <View style={styles.starsAndTextContainer}>
              <TouchableOpacity style={styles.ratingCard}>
                <Image
                  source={{ uri: DEFAULT_PROFILE_PICTURE }}
                  style={styles.profilePicture}
                />
                <View>
                  <Text style={styles.name}>Juan carlos</Text>
                  <View style={styles.starsContainer}>
                    {Array(MAX_RATING)
                      .fill()
                      .map((_, index) => {
                        return (
                          <StarIcon
                            key={index}
                            width={15}
                            height={15}
                            color={DARK_BLUE}
                          />
                        );
                      })}
                  </View>
                </View>
              </TouchableOpacity>
              <Text style={styles.ratingText}>
                Excelent training! I really enjoyed it and I can see the results
                already!
              </Text>
            </View>
            <View style={styles.starsAndTextContainer}>
              <TouchableOpacity style={styles.ratingCard}>
                <Image
                  source={{ uri: DEFAULT_PROFILE_PICTURE }}
                  style={styles.profilePicture}
                />
                <View>
                  <Text style={styles.name}>Juan carlos</Text>
                  <View style={styles.starsContainer}>
                    {Array(MAX_RATING)
                      .fill()
                      .map((_, index) => {
                        return (
                          <StarIcon
                            key={index}
                            width={15}
                            height={15}
                            color={DARK_BLUE}
                          />
                        );
                      })}
                  </View>
                </View>
              </TouchableOpacity>
              <Text style={styles.ratingText}>
                Excelent training! I really enjoyed it and I can see the results
                already!
              </Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.rateButton}
            fontSize={16}
            textColor={WHITE}
            onPress={() => setShowRatingModal(true)}
          >
            Rate
          </Button>
        </View>
      </View>
      {showRatingModal && (
        <RatingModal
          initialRating={0}
          initialComment={""}
          onClose={() => setShowRatingModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Ratings;
