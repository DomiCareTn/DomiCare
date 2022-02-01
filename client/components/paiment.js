import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { WebView } from "react-native-webview";
import React from "react";
import {  useNavigation } from "@react-navigation/native";

export const Paiment=(props)=>{
    const navigation = useNavigation();
    const [link, setLink] = React.useState("");
    
    React.useEffect(()=>{
        const unsubscribe = navigation.addListener("focus", () => {
            const params=props.route.params.item.paiementLinks;
            const rentDays= props.route.params.rentDays
            if (props.route.params.item.transactionType === 'For Rent'){
                setLink(params[rentDays]) 
           }
           else 
           setLink(params[1]) 
        })

        return unsubscribe;
    },[navigation])
  
    return (
        <ScrollView>
               <SafeAreaView >
          <View
          style={{width: 410, height: 1300 }}
          >
            <WebView  source={{ uri: link }}
            />
          </View>
        </SafeAreaView>
        </ScrollView>
     
    )
}