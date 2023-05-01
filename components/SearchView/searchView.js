import {Image, ScrollView, Text, TouchableOpacity, View, Keyboard} from "react-native";
import {styles} from "./styles.search-view";
import SearchBar from "../Shared/SearchBar/searchBar";
import {DARK_BLUE, WHITE} from "../../utils/colors";
import BackIcon from "../../assets/images/general/backIcon.svg"
import VerifiedIcon from "../../assets/images/profile/verifiedIcon.svg"
import {useEffect, useState} from "react";
import {auth, DEFAULT_PROFILE_PICTURE} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
const LOADING_MAX = 4
const SearchView = ({navigation, route}) => {
    //TODO support trainings fetching when endpoint is available
    const [user] = useAuthState(auth);
    const {filter, searchForUsers, searchForTrainings} = route.params;
    const [searchData, setSearchData] = useState({});
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false);
    const handleBack = () => {
        navigation.goBack();
    }

    useEffect(() => {

        const fetchUsers = async () => {
            const {stsTokenManager} = user;
            if(searchForUsers && !searchData[searchValue]){
                const userResponse = await fetch(`https://fiufit-gateway.fly.dev/v1/users?name=${searchValue}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${stsTokenManager.accessToken}`
                    }
                });

                const {data} = await userResponse.json();
                return {[searchValue]: data.users.filter(userData => userData.ID !== user.uid)}
            }
        }

        if(searchValue){
            const delayDebounceFunction = setTimeout(() => {
                fetchUsers()
                    .then((searchResult) => {
                        setSearchData({...searchData, ...searchResult})
                        setLoading(false)
                    })
                    .catch(e => {
                        console.log(e);
                        setLoading(false)
                    })
            }, 250)

            return () => clearTimeout(delayDebounceFunction)
        } else{
            setLoading(false)
        }
    }, [searchValue])


   const onSearchChange = async (value) => {
        setLoading(true)
        setSearchValue(value)
   }

   const handleUserCardPress = (userData) => {
        navigation.navigate({name: 'View Profile', merge: true, params: {userData}})
   }

    return(
        <View style={styles.container}>
            <View style={styles.searchAndBackContainer}>
                <TouchableOpacity onPress={handleBack}>
                    <BackIcon color={"#000000"} height={20} width={20}/>
                </TouchableOpacity>
                <SearchBar filter={filter}
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
                />
            </View>
            <View style={styles.divider}/>
            <ScrollView style={{width: "100%", display: "flex", flexDirection: "column"}} contentContainerStyle={{alignItems: "center"}} keyboardShouldPersistTaps={'handled'}>
                {
                    searchData[searchValue] ? searchData[searchValue].map(item => {
                        return <TouchableOpacity style={styles.userCard} key={item.ID} onPress={() => handleUserCardPress(item)}>
                            <Image source={{uri: DEFAULT_PROFILE_PICTURE}} style={styles.profilePicture}/>
                            <View>
                                <View style={{display: "flex", flexDirection: "row", gap: 5, alignItems: "center"}}>
                                    <Text style={styles.nickname}>{item.Nickname}</Text>
                                    {item.IsVerifiedTrainer && <VerifiedIcon color={DARK_BLUE} height={12} width={12}/>}
                                </View>
                                <Text style={styles.name}>{item.DisplayName}</Text>
                            </View>
                        </TouchableOpacity>
                    }) : <>
                        {loading && [...Array(LOADING_MAX)].map((_, index) => {
                            return <View style={styles.userCard} key={index}>
                                <View style={styles.loadingPicture}/>
                                <View>
                                    <View style={styles.loadingNickname}/>
                                    <View style={styles.loadingName}/>
                                </View>
                            </View>
                        })}
                    </>
                }

            </ScrollView>
        </View>
    )
}

export default SearchView;
