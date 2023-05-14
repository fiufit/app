import SearchIcon from "../../../assets/images/general/searchIcon.svg";
import FilterIcon from "../../../assets/images/general/filterIcon.svg";
import Input from "../Input/input";
import {Pressable, View} from "react-native";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase";


const SearchBar = ({
                       placeholder,
                       height,
                       width,
                       marginTop,
                       backgroundColor,
                       fontFamily,
                       fontSize,
                       filter,
                       navigation,
                       redirect,
                       searchForUsers,
                       searchForTrainings,
                       autoFocus,
                       onSearch,
                       value,
                       onFilterPress
                   }) => {


    const handleInputChange = async (value) => {
        onSearch(value)
    }

    const handlePress = () => {
        if(redirect){
            navigation.navigate({name: 'Search View', merge: true, params: {
                filter,
                searchForUsers,
                searchForTrainings
            }})
        }
    }

    return <Pressable style={{position: 'relative', width, height}} onPress={handlePress}>
        <Input placeholder={placeholder}
               height={"100%"}
               width={"100%"}
               marginTop={marginTop}
               backgroundColor={backgroundColor}
               left={<SearchIcon/>}
               right={filter && <FilterIcon onPress={onFilterPress}/>}
               fontFamily={fontFamily}
               fontSize={fontSize}
               editable={!redirect}
               onChangeText={handleInputChange}
               autoFocus={autoFocus}
               value={value}
        />
    </Pressable>

}

export default SearchBar;
