import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

const MessagingView = ({ navigation }) => {
  return (
    <ScrollView
      style={{ width: "100%" }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Text>Hello from Messaging view.</Text>
    </ScrollView>
  );
};

export default MessagingView;
