import SearchIcon from "../../../assets/images/general/searchIcon.svg";
import FilterIcon from "../../../assets/images/general/filterIcon.svg";
import Input from "../Input/input";
import {Pressable, View} from "react-native";


const SearchBar = ({placeholder, height, width, marginTop, backgroundColor, fontFamily, fontSize, filter, onSearch, onFilterPress}) => {
    const handleInputChange = (value) => {
        onSearch(value);
    }

    return <Pressable style={{position: 'relative', width, height}}>
            <Input placeholder={placeholder}
                  height={"100%"}
                  width={"100%"}
                  marginTop={marginTop}
                  backgroundColor={backgroundColor}
                  left={<SearchIcon/>}
                  right={filter && <FilterIcon onPress={onFilterPress}/>}
                  fontFamily={fontFamily}
                  fontSize={fontSize}
                  onChangeText={handleInputChange}
            />
    </Pressable>

}

export default SearchBar;
