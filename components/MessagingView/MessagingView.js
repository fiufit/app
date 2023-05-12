import { ScrollView, View } from "react-native";

import MessagingTopBar from "../MessagingTopBar/MessagingTopBar";
import { styles } from "./styles.MessagingView";

const MessagingView = ({ navigation }) => {
  const handleEditPress = () => {
    // handle edit button press
  };

  return (
    <ScrollView
      style={{ width: "100%" }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={styles.messagingTopBarContainer}>
        <MessagingTopBar onEditPress={handleEditPress} />
      </View>
    </ScrollView>
  );
};

export default MessagingView;
