import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "../components/Home.js";
import NotificationsScreen from "../components/Notifications.js";
import {
    ProfileServiceSeeker,
    ProfileServiceProvider,
    ProfileEquipementsProvider,
} from "../components/Profile";
import {
    EditProfileSS,
    EditProfileSP,
    EditProfileEP,
} from "../components/EditProfiles";

import Report from "../components/report.js";
import ForumPost from "../components/ForumPost.js";
import AddBlog from "../components/AddBlog.js";
import Forum2 from "../components/forum2.js";
import Equipmentsfetch from "../components/Equipementsfetch.js";
// import MyEquipements from "../components/MyEquipements.js"
import { CredentialsContext } from "../components/Authentification/CredentialsContext.js";
import { Avatar } from "react-native-paper";
import { View } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

import ServiceProvidersProfiles from "../components/Posts/ServiceProvidersProfiles.js";
import ServiceSeekerAddPost from "../components/Posts/ServiceSeekerAddPost.js";
import ServiceSeekersPosts from "../components/Posts/ServiceSeekersPosts.js";
import ReceivedRequests from "../components/Transactions/ServiceProvidersReceivedRequests.js";
import ServiceProvidersSendedOffers from "../components/Transactions/ServiceProvidersSendedOffers.js";
import ServiceSeekerReceivedOffers from "../components/Transactions/ServiceSeekerReceivedOffers.js";
import ServiceSeekerSendARequest from "../components/Transactions/ServiceSeekerSendARequest.js";
import ServiceSeekerSendedRequests from "../components/Transactions/ServiceSeekerSendedRequests.js";

const MainTabScreen = () => {
    return (
        <Tab.Navigator barStyle={{ backgroundColor: "#008080" }}>
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-home" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-person" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationStackScreen}
                options={{
                    tabBarLabel: "Notifications",
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="ios-notifications"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            {/* <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Explore',
        tabBarColor: '#d02860',
        tabBarIcon: ({color}) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    /> */}
        </Tab.Navigator>
    );
};

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => {
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#008080",
                    shadowColor: "#008080",
                    elevation: 0,
                },
                headerTintColor: "white",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
            {/* <HomeStack.Screen
                name="MyEquipements"
                component={MyEquipements}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: "#fff",
                })}
            /> */}
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "Home",
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            <Icon.Button
                                name="ios-menu"
                                size={25}
                                color="white"
                                backgroundColor="#008080"
                                onPress={() => navigation.openDrawer()}
                            />
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: "row", marginRight: 10 }}>
                            <Icon.Button
                                name="ios-search"
                                size={25}
                                color="white"
                                backgroundColor="#008080"
                                onPress={() => {}}
                            />
                            <TouchableOpacity
                                style={{ paddingHorizontal: 10, marginTop: 5 }}
                                onPress={() => {
                                    navigation.navigate("Profile");
                                }}
                            >
                                <Avatar.Image
                                    source={{
                                        uri: userData.picture,
                                    }}
                                    size={35}
                                />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
            <HomeStack.Screen
                name="Equipementsfetch"
                component={Equipmentsfetch}
                options={({ route }) => ({
                    title: route.params.title,
                    headerBackTitleVisible: false,
                })}
            />

            <HomeStack.Screen
                name="Forum2"
                component={Forum2}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: "#fff",
                })}
            />
            <HomeStack.Screen
                name="ForumPost"
                component={ForumPost}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: "#fff",
                })}
            />
            <HomeStack.Screen
                name="AddBlog"
                component={AddBlog}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: "#fff",
                })}
            />

            <HomeStack.Screen
                name="Report"
                component={Report}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: "#fff",
                })}
            />

            <HomeStack.Screen
                name="ServiceProvidersProfiles"
                component={ServiceProvidersProfiles}
            />
            <HomeStack.Screen
                name="ServiceSeekerAddPost"
                component={ServiceSeekerAddPost}
            />

            <HomeStack.Screen
                name="ServiceSeekersPosts"
                component={ServiceSeekersPosts}
            />
            <HomeStack.Screen
                name="ServiceProvidersReceivedRequests"
                component={ReceivedRequests}
            />
            <HomeStack.Screen
                name="ServiceProvidersSendedOffers"
                component={ServiceProvidersSendedOffers}
            />
            <HomeStack.Screen
                name="ServiceSeekerReceivedOffers"
                component={ServiceSeekerReceivedOffers}
            />
            <HomeStack.Screen
                name="ServiceSeekerSendARequest"
                component={ServiceSeekerSendARequest}
            />
            <HomeStack.Screen
                name="ServiceSeekerSendedRequests"
                component={ServiceSeekerSendedRequests}
            />
        </HomeStack.Navigator>
    );
};

const NotificationStackScreen = ({ navigation }) => (
    <NotificationStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#008080",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
            },
        }}
    >
        <NotificationStack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
                headerLeft: () => (
                    <Icon.Button
                        name="ios-menu"
                        size={25}
                        backgroundColor="#008080"
                        onPress={() => navigation.openDrawer()}
                    />
                ),
            }}
        />
    </NotificationStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => {
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userType = storedCredentials.userData.type;
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#008080",
                    shadowColor: "#008080", // iOS
                    elevation: 0, // Android
                },
                headerTintColor: "#008080",
            }}
        >
            {userType === "serviceSeeker" ? (
                <ProfileStack.Screen
                    name="Profile"
                    component={ProfileServiceSeeker}
                    options={{
                        title: "Profile",
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Icon.Button
                                    name="ios-menu"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() => navigation.openDrawer()}
                                />
                            </View>
                        ),
                        headerRight: () => (
                            <View style={{ marginRight: 10 }}>
                                <MaterialCommunityIcons.Button
                                    name="account-edit"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() =>
                                        navigation.navigate("EditProfile")
                                    }
                                />
                            </View>
                        ),
                    }}
                />
            ) : userType === "serviceProvider" ? (
                <ProfileStack.Screen
                    name="Profile"
                    component={ProfileServiceProvider}
                    options={{
                        title: "Profile",
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Icon.Button
                                    name="ios-menu"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() => navigation.openDrawer()}
                                />
                            </View>
                        ),
                        headerRight: () => (
                            <View style={{ marginRight: 10 }}>
                                <MaterialCommunityIcons.Button
                                    name="account-edit"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() =>
                                        navigation.navigate("EditProfile")
                                    }
                                />
                            </View>
                        ),
                    }}
                />
            ) : (
                <ProfileStack.Screen
                    name="Profile"
                    component={ProfileEquipementsProvider}
                    options={{
                        title: "",
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Icon.Button
                                    name="ios-menu"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() => navigation.openDrawer()}
                                />
                            </View>
                        ),
                        headerRight: () => (
                            <View style={{ marginRight: 10 }}>
                                <MaterialCommunityIcons.Button
                                    name="account-edit"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() =>
                                        navigation.navigate("EditProfile")
                                    }
                                />
                            </View>
                        ),
                    }}
                />
            )}

            {userType === "serviceSeeker" ? (
                <ProfileStack.Screen
                    name="EditProfile"
                    options={{
                        title: "Edit Profile",
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Icon.Button
                                    name="ios-menu"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() => navigation.openDrawer()}
                                />
                            </View>
                        ),
                    }}
                    component={EditProfileSS}
                />
            ) : userType === "serviceProvider" ? (
                <ProfileStack.Screen
                    name="EditProfile"
                    options={{
                        title: "Edit Profile",
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Icon.Button
                                    name="ios-menu"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() => navigation.openDrawer()}
                                />
                            </View>
                        ),
                    }}
                    component={EditProfileSP}
                />
            ) : (
                <ProfileStack.Screen
                    name="EditProfile"
                    options={{
                        title: "Edit Profile",
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <Icon.Button
                                    name="ios-menu"
                                    size={30}
                                    backgroundColor="#008080"
                                    color="white"
                                    onPress={() => navigation.openDrawer()}
                                />
                            </View>
                        ),
                    }}
                    component={EditProfileEP}
                />
            )}
        </ProfileStack.Navigator>
    );
};
