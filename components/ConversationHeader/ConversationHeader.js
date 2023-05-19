import { Image, Text, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles.ConversationHeader.js";

const ConversationHeader = ({ navigation, name, profileImage }) => {
  return (
    <View style={styles.conversationHeaderContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image style={styles.profileImage} source={{ uri: profileImage }} />
      <Text style={styles.nameText}>{name}</Text>
    </View>
  );
};

export default ConversationHeader;
