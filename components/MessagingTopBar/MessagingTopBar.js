import { Text, TouchableOpacity, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles.MessagingTopBar";

const MessagingTopBar = ({ onEditPress }) => {
  return (
    <View style={styles.messagingTopBarContainer}>
      <View>
        <Text style={styles.messagesText}>Messages</Text>
      </View>
      <TouchableOpacity onPress={onEditPress}>
        <MaterialIcons name="edit" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default MessagingTopBar;
