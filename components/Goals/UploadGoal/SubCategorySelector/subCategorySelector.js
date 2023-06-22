import {Text, View} from "react-native";
import {styles} from "../styles.upload-goal";
import {difficulties, interests} from "../../../../utils/trainings";
import Button from "../../../Shared/Button/button";
import {BLACK, DARK_BLUE, LIGHT_GREY, WHITE} from "../../../../utils/colors";

const SubCategorySelector = ({selectedSubcategory, setSelectedSubcategory, canSelect}) => {
    const handleSelect = (subcategory) => {
        if (!canSelect) return;
        setSelectedSubcategory(subcategory);
    }

    return <>
        <Text style={{...styles.subTitle, opacity: canSelect ? 1 : 0.25}}>Select your goal subcategory:</Text>

        <View style={{...styles.buttonsContainer, opacity: canSelect ? 1 : 0.35}}>
            {difficulties.map((difficulty, index) => (
                <Button
                    onPress={() => handleSelect(difficulty)}
                    key={index}
                    style={styles.categoryButton}
                    buttonColor={selectedSubcategory === difficulty ? DARK_BLUE : LIGHT_GREY}
                    textColor={selectedSubcategory === difficulty ? WHITE : BLACK}
                    fontSize={13}
                >
                    {difficulty}
                </Button>
            ))}
        </View>
        <View style={{...styles.buttonsContainer, opacity: canSelect ? 1 : 0.35}}>
            {interests.slice(0, 3).map((interest, index) => (
                <Button
                    onPress={() => handleSelect(interest)}
                    key={index}
                    style={styles.categoryButton}
                    buttonColor={selectedSubcategory === interest ? DARK_BLUE : LIGHT_GREY}
                    textColor={selectedSubcategory === interest ? WHITE : BLACK}
                    fontSize={13}
                >
                    {interest}
                </Button>
            ))}
        </View>
        <View style={{...styles.buttonsContainer, opacity: canSelect ? 1 : 0.35}}>
            {interests.slice(3, 6).map((interest, index) => (
                <Button
                    onPress={() => handleSelect(interest)}
                    key={index}
                    style={styles.categoryButton}
                    buttonColor={selectedSubcategory === interest ? DARK_BLUE : LIGHT_GREY}
                    textColor={selectedSubcategory === interest ? WHITE : BLACK}
                    fontSize={13}
                >
                    {interest}
                </Button>
            ))}
        </View>
    </>
}

export default SubCategorySelector;
