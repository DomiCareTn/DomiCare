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
import SeekerRequest from "../components/SeekerRequest.js";
import ForumPost from "../components/ForumPost.js";
import serviceProvidersList from "../components/serviceProvidersList.js";
import shareservice from "../components/shareService.js";
import AddBlog from "../components/AddBlog.js";
import Forum2 from "../components/forum2.js";
import Equipmentsfetch from "../components/Equipementsfetch.js";

import { CredentialsContext } from "../components/Authentification/CredentialsContext.js";
import { Avatar } from "react-native-paper";
import { View } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
    return (
        <Tab.Navigator tabBarOptions={{
          style: {
            backgroundColor: "#14b8a6"
          }
        }}>
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: "HomeScreen",
                    tabBarColor: "#14b8a6",
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationStackScreen}
                options={{
                    tabBarLabel: "Notifications",
                    tabBarColor: "#14b8a6",
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="ios-notifications"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: "Profile",
                    tabBarColor: "#14b8a6",
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-person" color={color} size={26} />
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
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#14b8a6",
                    shadowColor: "#14b8a6", // iOS
                    elevation: 0, // Android
                },
                headerTintColor: "white",
                headerTitleStyle: {
                    fontWeight: "bold",
                },
            }}
        >
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
                                backgroundColor="#14b8a6"
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
                                backgroundColor="#14b8a6"
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
                                        uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
                                    }}
                                    size={30}
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
                name="serviceProvidersList"
                component={serviceProvidersList}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: "#fff",
                })}
            />
            <HomeStack.Screen
                name="shareservice"
                component={shareservice}
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerTitle: false,
                    headerTransparent: true,
                    headerTintColor: "#fff",
                })}
            />
            <HomeStack.Screen
                name="SeekerRequest"
                component={SeekerRequest}
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
        </HomeStack.Navigator>
    );
};

const NotificationStackScreen = ({ navigation }) => (
    <NotificationStack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: "#14b8a6",
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
                        backgroundColor="#14b8a6"
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
                    backgroundColor: "#14b8a6",
                    shadowColor: "#14b8a6", // iOS
                    elevation: 0, // Android
                },
                headerTintColor: "#14b8a6",
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
                                    backgroundColor="#14b8a6"
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
                                    backgroundColor="#14b8a6"
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
                                    backgroundColor="#14b8a6"
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
                                    backgroundColor="#14b8a6"
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
                                    backgroundColor="#14b8a6"
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
                                    backgroundColor="#14b8a6"
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
                    }}
                    component={EditProfileSS}
                />
            ) : userType === "serviceProvider" ? (
                <ProfileStack.Screen
                    name="EditProfile"
                    options={{
                        title: "Edit Profile",
                    }}
                    component={EditProfileSP}
                />
            ) : (
                <ProfileStack.Screen
                    name="EditProfile"
                    options={{
                        title: "Edit Profile",
                    }}
                    component={EditProfileEP}
                />
            )}
        </ProfileStack.Navigator>
    );
};
