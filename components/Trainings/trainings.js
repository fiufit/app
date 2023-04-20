import {ScrollView, View, Text} from "react-native";
import Input from "../Shared/Input/input";
import {styles} from "./style.trainings";
import Button from "../Shared/Button/button";
import {GREEN, WHITE} from "../../utils/colors";
import SearchIcon from '../../assets/images/general/searchIcon.svg'
import FilterIcon from '../../assets/images/general/filterIcon.svg'
import RecommendedTraining from "./RecommendedTraining/recommendedTraining";
import FavouriteTrainings from "./FavouriteTrainings/favouriteTrainings";
const Trainings = () => {

    return (
        <View style={styles.container}>
            <View style={styles.inputAndButtonContainer}>
                <Input placeholder={"Search"} height={48} width={"82%"} marginTop={0} backgroundColor={WHITE}
                       left={<SearchIcon/>}
                       right={<FilterIcon/>}
                        fontFamily={"Lato_400Regular"} fontSize={14}
                />
                <Button style={styles.addButton} buttonColor={GREEN} fontSize={25}
                        fontFamily={"Lato_400Regular"}>+</Button>
            </View>
            <ScrollView style={{width: "100%", display: "flex", flexDirection: "column"}} contentContainerStyle={{justifyContent: "center", alignItems: "center"}}>
                <RecommendedTraining/>
                <FavouriteTrainings/>
            </ScrollView>

        </View>
    )
}

export default Trainings;
