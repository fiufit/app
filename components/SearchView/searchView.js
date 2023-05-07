import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import { styles } from "./styles.search-view";
import SearchBar from "../Shared/SearchBar/searchBar";
import {
  DARK_BLUE,
  GREY,
  MEDIUM_GREY,
  SECONDARY_GREY,
  TRANSPARENT_GREY,
  WHITE,
} from "../../utils/colors";
import BackIcon from "../../assets/images/general/backIcon.svg";
import VerifiedIcon from "../../assets/images/profile/verifiedIcon.svg";
import { useEffect, useState } from "react";
import { auth, DEFAULT_PROFILE_PICTURE, getImageUrl } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "../Shared/Button/button";

const LOADING_MAX = 4;
const SearchView = ({ navigation, route }) => {
  //TODO support trainings fetching when endpoint is available
  const [user] = useAuthState(auth);
  const { filter, searchForUsers, searchForTrainings } = route.params;
  const [userSearchData, setUserSearchData] = useState({});
  const [trainingSearchData, setTrainingsSearchData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [userSearchSelected, setUserSearchSelected] = useState(true);
  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const { stsTokenManager } = user;
      if (searchForUsers && !userSearchData[searchValue]) {
        const userResponse = await fetch(
          `https://fiufit-gateway.fly.dev/v1/users?name=${searchValue}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${stsTokenManager.accessToken}`,
            },
          }
        );

        const { data } = await userResponse.json();
        return {
          [searchValue]: data.users.filter(
            (userData) => userData.ID !== user.uid
          ),
        };
      }
    };

    const fetchTrainings = async () => {
      const { stsTokenManager } = user;
      if (searchForTrainings && !trainingSearchData[searchValue]) {
        const trainingsResponse = await fetch(
          `https://fiufit-gateway.fly.dev/v1/trainings?name=${searchValue}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${stsTokenManager.accessToken}`,
            },
          }
        );

        const { data } = await trainingsResponse.json();

        let trainings = [];
        for (const training of data.trainings) {
          //TODO receive PictureUrl in response
          const PictureUrl = await getImageUrl(
            `training_pictures/${training.TrainerID}/${training.ID}/training.png`
          );
          trainings.push({ ...training, PictureUrl });
        }
        return {
          [searchValue]: trainings.filter(
            (trainingData) => trainingData.TrainerID !== user.uid
          ),
        };
      }
    };

    if (searchValue) {
      const delayDebounceFunction = setTimeout(() => {
        if (userSearchSelected) {
          fetchUsers()
            .then((searchResult) => {
              setUserSearchData({ ...userSearchData, ...searchResult });
              setLoading(false);
            })
            .catch((e) => {
              console.log(e);
              setLoading(false);
            });
        } else {
          fetchTrainings()
            .then((searchResult) => {
              setTrainingsSearchData({
                ...trainingSearchData,
                ...searchResult,
              });
              setLoading(false);
            })
            .catch((e) => {
              console.log(e);
              setLoading(false);
            });
        }
      }, 250);

      return () => clearTimeout(delayDebounceFunction);
    } else {
      setLoading(false);
    }
  }, [searchValue]);

  const onSearchChange = async (value) => {
    setLoading(true);
    setSearchValue(value);
  };

  const handleUserCardPress = (userData) => {
    navigation.navigate({
      name: "View Profile",
      merge: true,
      params: { userData },
    });
  };

  const handleTrainingCardPress = (training) => {
    navigation.navigate({
      name: "Single Training",
      merge: true,
      params: { training, start: true },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchAndBackContainer}>
        <TouchableOpacity onPress={handleBack}>
          <BackIcon color={"#000000"} height={20} width={20} />
        </TouchableOpacity>
        <SearchBar
          filter={filter}
          searchForUsers={searchForUsers}
          searchForTrainings={searchForTrainings}
          width={"75%"}
          backgroundColor={WHITE}
          height={48}
          fontFamily={"Lato_400Regular"}
          fontSize={14}
          placeholder={"Search"}
          marginTop={0}
          onSearch={onSearchChange}
          autoFocus
          value={searchValue}
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
        <View style={styles.searchSelector}>
          <Button
            buttonColor={userSearchSelected ? TRANSPARENT_GREY : GREY}
            textColor={MEDIUM_GREY}
            style={styles.selectButton}
            onPress={() => {
              setUserSearchSelected(true);
              setSearchValue("");
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
              setSearchValue("");
            }}
          >
            Trainings
          </Button>
        </View>
        <View style={styles.divider} />
      </View>
      <ScrollView
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
        contentContainerStyle={{ alignItems: "center" }}
        keyboardShouldPersistTaps={"handled"}
      >
        {userSearchSelected && userSearchData[searchValue] ? (
          userSearchData[searchValue].map((item) => {
            return (
              <TouchableOpacity
                style={styles.userCard}
                key={item.ID}
                onPress={() => handleUserCardPress(item)}
              >
                <Image
                  source={{ uri: DEFAULT_PROFILE_PICTURE }}
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
                      <VerifiedIcon color={DARK_BLUE} height={12} width={12} />
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
                  <View style={styles.userCard} key={index}>
                    <View style={styles.loadingPicture} />
                    <View>
                      <View style={styles.loadingNickname} />
                      <View style={styles.loadingName} />
                    </View>
                  </View>
                );
              })}
          </>
        )}

        {!userSearchSelected && trainingSearchData[searchValue] ? (
          trainingSearchData[searchValue].map((item) => {
            return (
              <TouchableOpacity
                style={styles.userCard}
                key={item.ID}
                onPress={() => handleTrainingCardPress(item)}
              >
                <Image
                  source={{ uri: item?.PictureUrl ?? null }}
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
                    <Text style={styles.nickname}>{item.Name}</Text>
                  </View>
                  <Text style={styles.name}>
                    {item.Difficulty} | {item.Duration} min
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <>
            {loading &&
              !trainingSearchData[searchValue] &&
              [...Array(LOADING_MAX)].map((_, index) => {
                return (
                  <View style={styles.userCard} key={index}>
                    <View style={styles.loadingPicture} />
                    <View>
                      <View style={styles.loadingNickname} />
                      <View style={styles.loadingName} />
                    </View>
                  </View>
                );
              })}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchView;
