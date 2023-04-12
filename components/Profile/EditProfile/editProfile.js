import {Image, Text, TouchableHighlight, View} from "react-native";
import Back from "../../Shared/Back/back";
import {styles} from "./styles.editProfile";
import EditIcon from '../../../assets/images/general/editIcon.svg'
import {useRecoilState, useRecoilValue} from "recoil";
import {userDataState} from "../../../atoms";
import Input from "../../Shared/Input/input";
import Button from "../../Shared/Button/button";
import {DARK_BLUE, WHITE} from "../../../utils/colors";
import {TextInput} from "react-native-paper";
import {React, useState} from "react";
import EditModal from "../../Shared/Modals/EditModal/editModal";
import DateTimePicker from "@react-native-community/datetimepicker";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase";
import LoadingModal from "../../Shared/Modals/LoadingModal/loadingModal";

const EditProfile = ({navigation}) => {
    const [userData, setUserData] = useRecoilState(userDataState);
    const [user] = useAuthState(auth);
    const [editOptions, setEditOptions] = useState({});
    const [isMale, setIsMale] = useState(userData.IsMale);
    const [height, setHeight] = useState(String(userData.Height));
    const [dateOfBirth, setDateOfBirth] = useState(new Date(userData.BornAt));
    const [showPicker, setShowPicker] = useState(false);
    const [weight, setWeight] = useState(String(userData.Weight));
    const [displayName, setDisplayName] = useState(userData.DisplayName);
    const [nickName, setNickName] = useState(userData.Nickname);
    const [mainLocation, setMainLocation] = useState(userData.MainLocation);
    const [interests, setInterests] = useState(userData.Interests);
    const [loading, setLoading] = useState(false);


    const nameOptions = {
        displayName: {
            title: "Edit your display name",
            value: displayName,
            icon: <TextInput.Icon icon="account"/>,
            placeholder: "Display name",
            setEditValue: setDisplayName
        },
        nickName: {
            title: "Edit your nickname",
            value: nickName,
            icon: <TextInput.Icon icon="account"/>,
            placeholder: "Nickname",
            setEditValue: setNickName
        }
    }


    const inputs = [
        {
            editOptions: {
                title: "Edit your height",
                value: height,
                icon: <TextInput.Icon icon="human-male-height"/>,
                placeholder: "Height (cm)",
                setEditValue: setHeight
            },
            displayValue: `${height} cm`,
            icon: <TextInput.Icon icon="human-male-height"/>,
        },
        {
            editOptions: {
                title: "Edit your weight",
                value: weight,
                icon: <TextInput.Icon icon="weight"/>,
                placeholder: "Weight (kg)",
                setEditValue: setWeight
            },
            displayValue: `${weight} kg`,
            icon: <TextInput.Icon icon="weight"/>,
        },
        {
            editOptions: {
                title: "Edit your main location",
                value: mainLocation,
                icon: <TextInput.Icon icon="map-marker"/>,
                placeholder: "Main Location",
                setEditValue: setMainLocation
            },
            displayValue: mainLocation,
            icon: <TextInput.Icon icon="map-marker"/>,
        },
        {
            displayValue: `${isMale ? "Male" : "Female"}`,
            icon: <TextInput.Icon icon="account-multiple"/>,
            rightIcon: <TextInput.Icon icon={isMale ? "toggle-switch-off-outline" : "toggle-switch-outline"}
                                       onPress={() => setIsMale(!isMale)}/>,
            onPress: () => {
            }
        },
        {
            displayValue: `${dateOfBirth.toDateString()}`,
            icon: <TextInput.Icon icon="calendar"/>,
            onPress: () => setShowPicker(true)
        },
        {
            displayValue: `${interests ?? "Example interests"}`,
            icon: <TextInput.Icon icon="shape"/>,
            onPress: () => {
            }
        }
    ];

    const onDateChange = ({type}, selectedDate) => {
        setShowPicker(false);
        if (type === "set") {
            setDateOfBirth(selectedDate);
        }
    };

    const handleUpdate = async () => {
        const {stsTokenManager} = user;
        setLoading(true);
        const patchResponse = await fetch(`https://fiufit-gateway.fly.dev/v1/users`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${stsTokenManager.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nickname: nickName,
                display_name: displayName,
                is_male: isMale,
                birth_date: dateOfBirth,
                height,
                weight,
                main_location: mainLocation
            })
        });

        const {data, error} = await patchResponse.json();


        if (error) {
            alert(error.description)
        } else {
            setUserData(data);
            alert("Your profile has been updated successfully!")
        }
        setLoading(false);
    }


    return (
        <View style={styles.container}>
            <Back onPress={() => navigation.navigate({name: "Profile", merge: true})}/>
            <Text style={styles.title}>Edit Profile</Text>
            <View style={styles.profilePictureContainer}>
                <Image style={styles.profilePicture}
                       source={{uri: "https://firebasestorage.googleapis.com/v0/b/fiufit.appspot.com/o/profile_pictures%2Fdefault.png?alt=media&token=8242ac98-c07e-4217-8f07-3fddc5a727bc"}}/>
                <EditIcon style={styles.editIcon} height={25} width={25}/>
            </View>
            <Text style={styles.name} onPress={() => setEditOptions(nameOptions.displayName)}>{displayName}</Text>
            <Text style={styles.nickName} onPress={() => setEditOptions(nameOptions.nickName)}>@{nickName}</Text>
            <View style={styles.data}>
                {inputs.map((input, index) =>
                    <TouchableHighlight key={index}
                                        onPress={input.onPress ? input.onPress : () => setEditOptions(input.editOptions)}
                                        underlayColor={"transparent"}>
                        <Input editable={false} height={"30%"} value={input.displayValue} color={"black"}
                               left={input.icon} right={input.rightIcon}/>
                    </TouchableHighlight>
                )}
            </View>
            <Button buttonColor={DARK_BLUE} style={styles.button} textColor={WHITE} onPress={handleUpdate}>
                Update
            </Button>
            {showPicker && <DateTimePicker
                mode="date"
                display="spinner"
                value={dateOfBirth}
                onChange={onDateChange}
            />}
            {editOptions.title &&
                <EditModal title={editOptions.title} editIcon={editOptions.icon}
                           editValue={editOptions.value} buttonText={"Confirm"} setEditValue={editOptions.setEditValue}
                           editPlaceHolder={editOptions.placeholder}
                           onButtonPress={() => setEditOptions({})}/>}
            {loading && <LoadingModal text={"Updating your profile"}/>}
        </View>
    )
}

export default EditProfile;
