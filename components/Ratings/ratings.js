import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style.ratings";
import Back from "../Shared/Back/back";
import StarIcon from "../../assets/images/general/star.svg";
import { DARK_BLUE, WHITE } from "../../utils/colors";
import Button from "../Shared/Button/button";
import { auth, DEFAULT_PROFILE_PICTURE } from "../../firebase";
import RatingModal from "../Shared/Modals/RatingModal/ratingModal";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ReviewController from "../../utils/controllers/ReviewController";

const MAX_RATING = 5;

const Ratings = ({ navigation, route }) => {
  const [user] = useAuthState(auth);
  const { training } = route.params;
  const { Name: title, MeanScore} = training;
  const [meanScore, setMeanScore] = useState(MeanScore);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const fetchReviews = async () => {
    const controller = new ReviewController(user);
    const { data } = await controller.getReviews(training.ID);
    return data.reviews;
  };

  const handleSubmit = (rating, comment) => {
    //TODO
  };

  const handleBack = () => {
    navigation.goBack();
  }

  useEffect(() => {
    if (meanScore > 0) {
      setLoadingReviews(true);
      fetchReviews()
          .then((reviews) => {
            setReviews(reviews);
            setLoadingReviews(false);
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Back onPress={handleBack} />
        <Text style={styles.title}>{title}</Text>
        { meanScore === 0 ?
          <Text style={styles.subtitle}>
            Be the first to rate this training!
          </Text> : <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{meanScore.toFixed(1)}</Text>
              <StarIcon color={DARK_BLUE} height={50} width={50} />
            </View>
        }
        {meanScore > 0 && <View style={{ height: "50%", width: "100%" }}>
          <ScrollView
              overScrollMode="never"
              showsVerticalScrollIndicator={false}
              style={styles.ratingsContainer}
              contentContainerStyle={{ alignItems: "center", gap: 20 }}
          >
            {loadingReviews &&
                Array(3)
                    .fill()
                    .map((_, index) => {
                      return (
                          <View key={index} style={styles.starsAndTextContainer}>
                            <View style={styles.ratingCard}>
                              <View style={styles.loadingPicture} />
                              <View>
                                <Text style={styles.loadingName}></Text>
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
                                                opacity={0.2}
                                            />
                                        );
                                      })}
                                </View>
                              </View>
                            </View>
                            <Text style={styles.loadingRating}></Text>
                            <Text style={styles.loadingRating}></Text>
                            <Text style={styles.loadingRatingLast}></Text>
                          </View>
                      );
                    })}
            {reviews &&
                reviews?.map((review, index) => {
                  return (
                      <View style={styles.starsAndTextContainer} key={index}>
                        <TouchableOpacity style={styles.ratingCard}>
                          <Image
                              source={{ uri: review.User.PictureUrl }}
                              style={styles.profilePicture}
                          />
                          <View>
                            <Text style={styles.name}>
                              {review.User.DisplayName}
                            </Text>
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
                                            opacity={review.Score - 1 >= index ? 1 : 0.2}
                                        />
                                    );
                                  })}
                            </View>
                          </View>
                        </TouchableOpacity>
                        <Text style={styles.ratingText}>{review.Comment}</Text>
                      </View>
                  );
                })}
          </ScrollView>
        </View>}

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
