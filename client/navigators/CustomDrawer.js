import React from "react";
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";

import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../components/Authentification/CredentialsContext";
import { useNavigation } from "@react-navigation/native";
const CustomDrawer = (props) => {
    const { storedCredentials, setStoredCredentials } =
    React.useContext(CredentialsContext);
    const userData = storedCredentials;
    const picture = userData.userData.picture;
    const userName = userData.userData.userName;
    const navigation = useNavigation()
    const clearLogin = () => {
        AsyncStorage.removeItem("domicareCredentials")
            .then(() => {
                setStoredCredentials(null);
            })
            .catch((error) => console.log(error));
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: "#fff" }}
            >
                <ImageBackground
                    source={require("../assets/tealGradiant.jpg")}
                    style={{ padding: 20, marginTop: 0, justifyContent: 'center', alignItems: 'center' }}
                >
                    <View  style={{  justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={{
                            
                            uri :userData.userData.picture
                        }}
                        style={{
                            height: 80,
                            width: 80,
                            borderRadius: 40,
                            marginBottom: 10,
                        }}
                    />
                    <Text
                        style={{
                            color: "#696969",
                            fontSize: 18,
                            marginBottom: 5,
                        }}
                    >
                        {userData.userData.lastName + ' ' + userData.userData.firstName}
                    </Text>
                    </View>
                    
                </ImageBackground>
                <View
                    style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}
                >
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View
                style={{
                    padding: 20,
                    borderTopWidth: 1,
                    borderTopColor: "#ccc",
                }}
            >
                <TouchableOpacity
                    onPress={clearLogin}
                    style={{ paddingVertical: 15 }}
                >
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Ionicons name="exit-outline" size={22}  />
                        <Text
                            style={{
                                fontSize: 15,
                                marginLeft:5,
                            }}
                        >
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;
