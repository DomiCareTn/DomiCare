import 'react-native-gesture-handler';
import React, {useState} from 'react';
import DrawerNav from "./navigators/DrawerNavigator";
import Stack from "./navigators/StackNavigator";
import MainScreen from './navigators/MainScreen';
import {StyleSheet}from 'react-native';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './components/Authentification/CredentialsContext.js';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./components/Authentification/Login.js";
import SignUpServiceSeeker from "./components/Authentification/SignUpServiceSeeker.js";
import SignUpServiceProvider from "./components/Authentification/SignUpServiceProvider.js";
import SignUpEquipementsProvider from "./components/Authentification/SignUpEquipementsProvider.js";
import SignUpType from "./components/Authentification/SignUpType.js";
import VerificationCode from "./components/Authentification/VerificationCode.js";
import ForgetPassword from "./components/Authentification/ForgetPassword.js";
import SSSignUpGoogle from "./components/Authentification/SSSignUpGoogle.js";
import SPSignUpGoogle from "./components/Authentification/SPSignUpGoogle.js";
import EPSignUpGoogle from "./components/Authentification/EPSignUpGoogle.js";
import ResetPassword from "./components/Authentification/ResetPassword.js";
const Auth = createNativeStackNavigator();



export default function App() {
  const [appReady, setAppReady]= useState(false);
  const [storedCredentials, setStoredCredentials]= useState("")
  const checkLoginCredentials = ()=>{
    AsyncStorage
     .getItem('domicareCredentials')
     .then((result)=>{
       if(result !== null){
         setStoredCredentials(JSON.parse(result));
       } else {
         setStoredCredentials(null);
       }
     })
     .catch(err => console.log(err));
  }
  if(!appReady){
    return (
      <AppLoading
      startAsync={checkLoginCredentials}
      onFinish={()=> setAppReady(true)}
      onError={console.warn}
      />
  
    )
  }
  

  return (

    <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
          <NavigationContainer >
{ (storedCredentials)?(
        <DrawerNav  />

):(
  <Auth.Navigator 
 >
             <Auth.Screen name="Login" component={Login} />
                <Auth.Screen
                    name="ForgetPassword"
                    component={ForgetPassword}
                />
                <Auth.Screen name="ResetPassword" component={ResetPassword} />
                <Auth.Screen
                    name="VerificationCode"
                    component={VerificationCode}
                />
                <Auth.Screen
                    name="SSSignUpGoogle"
                    component={SSSignUpGoogle}
                />
                <Auth.Screen
                    name="SPSignUpGoogle"
                    component={SPSignUpGoogle}
                />
                <Auth.Screen
                    name="EPSignUpGoogle"
                    component={EPSignUpGoogle}
                />

                <Auth.Screen name="SignUpAs" component={SignUpType} />
                <Auth.Screen
                    name="SignUpServiceSeeker"
                    component={SignUpServiceSeeker}
                />
                <Auth.Screen
                    name="SignUpServiceProvider"
                    component={SignUpServiceProvider}
                />
                <Auth.Screen
                    name="SignUpEquipementsProvider"
                    component={SignUpEquipementsProvider}
                />
   </Auth.Navigator>
)}

      </NavigationContainer>
    </CredentialsContext.Provider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});