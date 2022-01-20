import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import React from "react";
import { CredentialsContext } from "../components/Authentification/CredentialsContext.js";
import MainTabScreen from "./MainScreen.js";
import ForumPost from "../components/ForumPost.js";
import AddBlog from "../components/AddBlog.js";
import Equipmentsfetch from "../components/Equipementsfetch.js";
import Report from "../components/report.js";

import CustomDrawer from "../navigators/CustomDrawer";
import ServiceProvidersProfiles from "../components/Posts/ServiceProvidersProfiles.js"
import ServiceSeekerAddPosts from "../components/Posts/ServiceSeekerAddPost.js"
import ServiceSeekersPosts from "../components/Posts/ServiceSeekersPosts.js"
import ServiceProvidersReceivedRequests from "../components/Transactions/ServiceProvidersReceivedRequests.js"
import ServiceProvidersSendedOffers from "../components/Transactions/ServiceProvidersSendedOffers.js"
import ServiceSeekerReceivedOffers from "../components/Transactions/ServiceSeekerReceivedOffers.js"
import ServiceSeekerSendARequests from "../components/Transactions/ServiceSeekerSendARequest.js"
import ServiceSeekerSendedRequests from "../components/Transactions/ServiceSeekerSendedRequests.js"
import Forum2 from "../components/forum2.js";

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userType = storedCredentials.userData.type;

    const linking = {
        screens: {
            ResetPassword: {
                path: "ResetPassword/:code/:email",
                parse: {
                    code: (code) => code.replace(/^@/, ""),
                    email: (email) => email.replace(/^@/, ""),
                },
                stringify: {
                    code: (code) => `@{code}`,
                    email: (email) => `@{email}`,
                },
            },
            VerificationCode: {
                path: "VerificationCode/:code/:email",
                parse: {
                    email: (email) => "",
                    code: (code) => "",
                },
                stringify: {
                    code: (code) => "",
                    email: (email) => "",
                },
            },
        },
    };

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: "#008080",
                drawerActiveTintColor: "#fff",
                drawerInactiveTintColor: "#333",

                drawerLabelStyle: {
                    marginLeft: 0,
                    fontSize: 15,
                },
            }}
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name="Main" component={MainTabScreen} />

            <Drawer.Screen
                name="Equipementsfetch"
                component={Equipmentsfetch}
            />

            <Drawer.Screen
                name="Home Care Agents"
                component={ServiceProvidersProfiles}
            />

<Drawer.Screen
                name="Posts Feed"
                component={ServiceSeekersPosts}
            />


       

            <Drawer.Screen
                name="Report"
                component={Report}
                options={{
                    drawerLabel: () => null,
                    title: null,
                    drawerItemStyle: { height: 0 },
                    drawerIcon: () => null,
                }}
            />
            <Drawer.Screen
                name="Forum"
                component={Forum2}
                // options={{
                //     drawerLabel: () => null,
                //     title: null,
                //     drawerItemStyle: { height: 0 },
                //     drawerIcon: () => null,
                // }}
            />
        </Drawer.Navigator>
    );
};
export default DrawerNav;

const styles = StyleSheet.create({
    drawerTransparent: {
        flex: 1,
        backgroundColor: "transparent",
    },
    drawer: {
        flex: 1,
        width: 500,
        backgroundColor: "white",
    },

    header: {
        width: "100%",
        height: 200,
        backgroundColor: "#6195ff",
        alignItems: "center",
        justifyContent: "center",
    },

    headerImage: {
        borderRadius: 100,
    },
    row: {
        flexDirection: "row",
        paddingVertical: 15,
        paddingLeft: 10,
    },
    menu: {
        width: 10,
        height: 10,
        backgroundColor: "red",
        borderRadius: 50,
        alignSelf: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 15,
        color: "#111",
    },
    line: {
        width: "90%",
        alignSelf: "center",
        height: 1,
        backgroundColor: "gray",
        margin: 15,
    },
});
