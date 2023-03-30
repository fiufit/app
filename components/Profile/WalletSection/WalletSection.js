import {Text, View} from "react-native";
import {styles} from "./styles.wallet-section";

const WalletSection = () => {
    return <View style={styles.walletSection}>
        <Text style={styles.title}>Your Wallet</Text>
        <View style={styles.walletContainer}>
            <Text style={{fontFamily: "Poppins_500Medium"}}>Coming Soon</Text>
        </View>
    </View>;
}

export default WalletSection;
