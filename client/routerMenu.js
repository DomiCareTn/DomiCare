import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./components/Authentification/CredentialsContext.js";
import Home from "./components/Home.js";
import Login from "./components/Authentification/Login.js";
import SignUpServiceSeeker from "./components/Authentification/SignUpServiceSeeker.js";
import SignUpServiceProvider from "./components/Authentification/SignUpServiceProvider.js";
import SignUpEquipementsProvider from "./components/Authentification/SignUpEquipementsProvider.js";
import SignUpType from "./components/Authentification/SignUpType.js";
import ForumPost from "./components/ForumPost.js";
import serviceProvidersList from "./components/serviceProvidersList.js";
import shareservice from "./components/shareService.js";
import AddBlog from "./components/AddBlog.js";
import Forum2 from "./components/forum2.js";
import Equipmentsfetch from "./components/Equipementsfetch.js";
import EquipementsProviderProfile from "./components/EquipementsProviderProfile.js";
import EditProfile from "./components/EditProfile.js";
import EditEquipement from "./components/EditEquipement.js"
import VerificationCode from "./components/Authentification/VerificationCode.js";
import ForgetPassword from "./components/Authentification/ForgetPassword.js";
import ResetPassword from "./components/Authentification/ResetPassword.js";
import { NavigationContainer } from "@react-navigation/native";
import SeekerRequest from "./components/SeekerRequest.js";
import userEquipements from "./components/userEquipements";
import Report from "./components/report.js";
// import EquipementsFetch2 from "./components/EquipementsFetch2.js";
import { IPAdress } from "@env";
const Drawer = createDrawerNavigator();
const Router = () => {
  const { storedCredentials, setStoredCredentials } =
    React.useContext(CredentialsContext);
  const userData = storedCredentials;

  const clearLogin = () => {
    AsyncStorage.removeItem("domicareCredentials")
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

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
    <NavigationContainer linking={linking}>
      <Drawer.Navigator
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Logout" onPress={clearLogin} />
            </DrawerContentScrollView>
          );
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        {/* <Drawer.Screen name="EquipementsFetch2" component={EquipementsFetch2} /> */}

        <Drawer.Screen name="Equipements Feed" component={Equipmentsfetch} />
        <Drawer.Screen
          name="EquipementsProviderProfile"
          component={EquipementsProviderProfile}
        />
        <Drawer.Screen
          options={{
            drawerLabel: () => null,
            title: null,
            drawerItemStyle: { height: 0 },
            drawerIcon: () => null,
          }}
          name="EditProfile"
          component={EditProfile}
        />
        <Drawer.Screen
          options={{
            drawerLabel: () => null,
            title: null,
            drawerItemStyle: { height: 0 },
            drawerIcon: () => null,
          }}
          name="Edit Equipement"
          component={EditEquipement}
        />
        <Drawer.Screen name="Forum2" component={Forum2} />
        <Drawer.Screen name="ForumPost" component={ForumPost} />
        <Drawer.Screen name="AddBlog" component={AddBlog} />
        <Drawer.Screen
          name="serviceProvidersList"
          component={serviceProvidersList}
        />

        <Drawer.Screen name="shareservice" component={shareservice} />

        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen options={{
            drawerLabel: () => null,
            title: null,
            drawerItemStyle: { height: 0 },
            drawerIcon: () => null,
          }}
        name="ForgetPassword" component={ForgetPassword} />
        <Drawer.Screen
          options={{
            drawerLabel: () => null,
            title: null,
            drawerItemStyle: { height: 0 },
            drawerIcon: () => null,
          }}
          name="ResetPassword"
          component={ResetPassword}
        />
        <Drawer.Screen
          options={{
            drawerLabel: () => null,
            title: null,
            drawerItemStyle: { height: 0 },
            drawerIcon: () => null,
          }}
          name="VerificationCode"
          component={VerificationCode}
        />
        <Drawer.Screen name="SignUpAs" component={SignUpType} />
        <Drawer.Screen
          options={{
            drawerLabel: () => null,
            title: null,
            drawerItemStyle: { height: 0 },
            drawerIcon: () => null,
          }}
          name="SignUpServiceSeeker"
          component={SignUpServiceSeeker}
        />
        <Drawer.Screen
          options={{
            drawerLabel: () => null,
            title: null,
            drawerItemStyle: { height: 0 },
            drawerIcon: () => null,
          }}
          name="SignUpServiceProvider"
          component={SignUpServiceProvider}
        />
        <Drawer.Screen
          options={{
            drawerLabel: () => null,
            title: null,
            drawerItemStyle: { height: 0 },
            drawerIcon: () => null,
          }}
          name="SignUpEquipementsProvider"
          component={SignUpEquipementsProvider}
        />
                <Drawer.Screen name="userEquipements" component={userEquipements} 
                    options={{
                      drawerLabel: () => null,
                      title: null,
                      drawerItemStyle: { height: 0 },
                      drawerIcon: () => null,
                    }}
                />

        <Drawer.Screen options={{
            drawerLabel: () => null,
            title: null,
            drawerItemStyle: { height: 0 },
            drawerIcon: () => null,
          }}name="SeekerRequest" component={SeekerRequest} />
        <Drawer.Screen name="Report" component={Report} />
        {/* <Drawer.Screen
                    name="SeekerRequest"
                    component={null}
                    onPress={clearLogin}
                /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default Router;
