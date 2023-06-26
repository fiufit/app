import {View, TouchableOpacity, LayoutAnimation, Keyboard} from "react-native";
import { styles } from "./styles.tabbar";
import NotificationsIcon from "../../assets/images/tabBar/notificationsIcon.svg";
import MessageIcon from "../../assets/images/tabBar/messagesIcon.svg";
import TrainingsIcon from "../../assets/images/tabBar/trainingsIcon.svg";
import UserIcon from "../../assets/images/tabBar/userIcon.svg"
import {GREEN} from "../../utils/colors";
import {useEffect, useState} from "react";

const icons = {
    "Trainings": style => <TrainingsIcon style={style} />,
    "Notifications": style => <NotificationsIcon style={style} />,
    "Messages": style => <MessageIcon style={style} />,
    "Profile": style => <UserIcon style={style} />,
};

const barPosition = {
    "Trainings": "9.5%",
    "Notifications": "31.5%",
    "Messages": "53.5%",
    "Profile": "75.5%",
};

function TabBar({ state, descriptors, navigation }) {
    const [keyboardActive, setKeyboardActive] = useState(false)
    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            //Whenever keyboard did show make it don't visible
            setKeyboardActive(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardActive(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    const showTabBar = (routeName) => {
        return Object.keys(icons).includes(routeName) && !keyboardActive
    }

    return (
          showTabBar(state.routeNames[state.index]) && <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });


                    if (!isFocused && !event.defaultPrevented) {
                        LayoutAnimation.configureNext({
                            duration: 400,
                            update: { type: "spring", springDamping: 2 },
                        })

                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };


                return (
                    showTabBar(route.name) && <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.iconContainer}
                        key={route.key}
                    >
                        {icons[route.name]({
                            color: isFocused ? GREEN : "white",
                        })}
                    </TouchableOpacity>
                );
            })}
            <View style={{
                width: "15%",
                height: 4,
                position: "absolute",
                backgroundColor: GREEN,
                bottom: 0,
                left: barPosition[state.routeNames[state.index]],
            }}>
            </View>
        </View>
    );
}

export default TabBar;
