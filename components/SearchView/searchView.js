import {
  DARK_BLUE,
  GREY,
  MEDIUM_GREY,
  TRANSPARENT_GREY,
  WHITE,
} from "../../utils/colors";
import { DEFAULT_PROFILE_PICTURE, auth } from "../../firebase";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

import BackIcon from "../../assets/images/general/backIcon.svg";
import Button from "../Shared/Button/button";
import RequestController from "../../utils/controllers/RequestController";
import SearchBar from "../Shared/SearchBar/searchBar";
import TrainingFilterModal from "../Shared/Modals/TrainingFilterModal/trainingFilterModal";
import VerifiedIcon from "../../assets/images/profile/verifiedIcon.svg";
import { styles } from "./styles.search-view";
import { useAuthState } from "react-firebase-hooks/auth";

const LOADING_MAX = 4;
const SearchView = ({ navigation, route }) => {
  const [user] = useAuthState(auth);
  const { searchForUsers, searchForTrainings, messageUsers } = route.params;
  const [userSearchData, setUserSearchData] = useState({});
  const [trainingSearchData, setTrainingsSearchData] = useState({
    beginner: {},
    intermediate: {},
    expert: {},
    all: {},
  });
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [userSearchSelected, setUserSearchSelected] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [trainingDifficulty, setTrainingDifficulty] = useState("all");

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchForUsers && !userSearchData[searchValue]) {
        const controller = new RequestController(user);
        const { data } = await controller.fetch(
          `users?name=${searchValue}`,
          "GET"
        );
        return {
          [searchValue]: data.users.filter(
            (userData) => userData.ID !== user.uid
          ),
        };
      }
    };

    const fetchTrainings = async () => {
      if (
        searchForTrainings &&
        !trainingSearchData[trainingDifficulty][searchValue]
      ) {
        const controller = new RequestController(user);
        const route =
          trainingDifficulty === "all"
            ? `trainings?name=${searchValue}`
            : `trainings?name=${searchValue}&difficulty=${trainingDifficulty}`;
        const { data } = await controller.fetch(route, "GET");

        return {
          [searchValue]: data.trainings.filter(
            (trainingData) => trainingData.TrainerID !== user.uid
          ),
        };
      }
    };

    if (userSearchSelected) {
      if (searchValue) {
        setLoading(true);
        const delayDebounceFunction = setTimeout(() => {
          fetchUsers()
            .then((searchResult) => {
              setUserSearchData({ ...userSearchData, ...searchResult });
              setLoading(false);
            })
            .catch((e) => {
              console.log(e);
              setLoading(false);
            });
        }, 250);

        return () => clearTimeout(delayDebounceFunction);
      } else {
        setLoading(false);
      }
    } else {
      if (trainingDifficulty === "all") {
        if (searchValue) {
          setLoading(true);
          const delayDebounceFunction = setTimeout(() => {
            fetchTrainings()
              .then((searchResult) => {
                setTrainingsSearchData({
                  ...trainingSearchData,
                  all: { ...trainingSearchData.all, ...searchResult },
                });
                setLoading(false);
              })
              .catch((e) => {
                console.log(e);
                setLoading(false);
              });
          }, 250);
          return () => clearTimeout(delayDebounceFunction);
        } else {
          setLoading(false);
        }
      } else {
        setLoading(true);
        const delayDebounceFunction = setTimeout(() => {
          fetchTrainings()
            .then((searchResult) => {
              setTrainingsSearchData({
                ...trainingSearchData,
                [trainingDifficulty]: {
                  ...trainingSearchData[trainingDifficulty],
                  ...searchResult,
                },
              });
              setLoading(false);
            })
            .catch((e) => {
              console.log(e);
              setLoading(false);
            });
        }, 250);
        return () => clearTimeout(delayDebounceFunction);
      }
    }
  }, [searchValue, userSearchSelected, trainingDifficulty]);

  const onSearchChange = async (value) => {
    setSearchValue(value);
  };

  const handleUserCardPress = (userData) => {
    if (messageUsers) {
      navigation.navigate("Conversation", {
        conversationUserId: "userData.ID",
      });
    } else {
      navigation.navigate({
        name: "View Profile",
        merge: true,
        params: { userData },
      });
    }
  };

  const handleTrainingCardPress = (training) => {
    navigation.navigate({
      name: "Single Training",
      merge: true,
      params: { training, start: true },
    });
  };

  const handleFilterPress = () => {
    setShowFilterModal(true);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchAndBackContainer}>
          <TouchableOpacity onPress={handleBack}>
            <BackIcon color={"#000000"} height={20} width={20} />
          </TouchableOpacity>
          <SearchBar
            filter={!userSearchSelected}
            searchForUsers={searchForUsers}
            searchForTrainings={searchForTrainings}
            width={"75%"}
            backgroundColor={WHITE}
            height={48}
            fontFamily={"Lato_400Regular"}
            fontSize={14}
            placeholder={
              messageUsers ? "Who do you want to talk to?" : "Search"
            }
            marginTop={0}
            onSearch={onSearchChange}
            autoFocus
            value={searchValue}
            onFilterPress={handleFilterPress}
          />
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.divider} />
          {searchForUsers && searchForTrainings && (
            <>
              <View style={styles.searchSelector}>
                <Button
                  buttonColor={userSearchSelected ? TRANSPARENT_GREY : GREY}
                  textColor={MEDIUM_GREY}
                  style={styles.selectButton}
                  onPress={() => {
                    setUserSearchSelected(true);
                  }}
                >
                  Users
                </Button>
                <Button
                  buttonColor={userSearchSelected ? GREY : TRANSPARENT_GREY}
                  textColor={MEDIUM_GREY}
                  style={styles.selectButton}
                  onPress={() => {
                    setUserSearchSelected(false);
                  }}
                >
                  Trainings
                </Button>
              </View>
              <View style={styles.divider} />
            </>
          )}
        </View>
        <ScrollView
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
          contentContainerStyle={{ alignItems: "center" }}
          keyboardShouldPersistTaps={"handled"}
        >
          {userSearchSelected &&
            (userSearchData[searchValue] ? (
              userSearchData[searchValue].map((item) => {
                return (
                  <TouchableOpacity
                    style={styles.searchCard}
                    key={item.ID}
                    onPress={() => handleUserCardPress(item)}
                  >
                    <Image
                      source={{
                        uri: item?.PictureUrl ?? DEFAULT_PROFILE_PICTURE,
                      }}
                      style={styles.profilePicture}
                    />
                    <View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 5,
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.nickname}>{item.Nickname}</Text>
                        {item.IsVerifiedTrainer && (
                          <VerifiedIcon
                            color={DARK_BLUE}
                            height={12}
                            width={12}
                          />
                        )}
                      </View>
                      <Text style={styles.name}>{item.DisplayName}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <>
                {loading &&
                  !userSearchData[searchValue] &&
                  [...Array(LOADING_MAX)].map((_, index) => {
                    return (
                      <View style={styles.searchCard} key={index}>
                        <View style={styles.loadingPicture} />
                        <View>
                          <View style={styles.loadingNickname} />
                          <View style={styles.loadingName} />
                        </View>
                      </View>
                    );
                  })}
              </>
            ))}

          {!userSearchSelected &&
            (trainingSearchData[trainingDifficulty][searchValue] ? (
              trainingSearchData[trainingDifficulty][searchValue].map(
                (item) => {
                  return (
                    <TouchableOpacity
                      style={styles.searchCard}
                      key={item.ID}
                      onPress={() => handleTrainingCardPress(item)}
                    >
                      <Image
                        source={{ uri: item?.PictureUrl ?? null }}
                        style={styles.trainingImage}
                      />
                      <View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 5,
                            alignItems: "center",
                          }}
                        >
                          <Text style={styles.nickname}>{item.Name}</Text>
                        </View>
                        <Text style={styles.name}>
                          {item.Difficulty} | {item.Duration} min
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }
              )
            ) : (
              <>
                {loading &&
                  !trainingSearchData[searchValue] &&
                  [...Array(LOADING_MAX)].map((_, index) => {
                    return (
                      <View style={styles.searchCard} key={index}>
                        <View style={styles.loadingTrainingPicture} />
                        <View>
                          <View style={styles.loadingNickname} />
                          <View style={styles.loadingName} />
                        </View>
                      </View>
                    );
                  })}
              </>
            ))}
        </ScrollView>
      </View>
      {showFilterModal && (
        <TrainingFilterModal
          onClose={() => setShowFilterModal(false)}
          trainingDifficulty={trainingDifficulty}
          setDifficulty={setTrainingDifficulty}
        />
      )}
    </>
  );
};

export default SearchView;
