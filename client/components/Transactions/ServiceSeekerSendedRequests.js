
import React ,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button ,ScrollView } from 'react-native';
import {Card} from 'react-native-shadow-cards';
import {Avatar , NativeBaseProvider} from 'native-base';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../Authentification/CredentialsContext.js";
import ServicesRequests from '../Posts/ServiceSeekersPosts.js';
import axios from 'axios'

 const SendedRequests =()=> {
    const { storedCredentials, setStoredCredentials } =
    React.useContext(CredentialsContext);
  const userData = storedCredentials.userData;
     const[feed, setFeed]=useState([])
    useEffect(async() => {
       
         try { console.log("req");
         const _id=userData._id 
          const offers = await axios.get(
            `http://192.168.11.61:3000/Transactions/sendedrequests/${_id}`
          );
          setFeed(offers.data)}
          catch(err){
            console.log(err);
            
          }
       
    },[])

    const CancelRequest= async(_id)=>{
      try{
        console.log("cancel",_id);
        
        await axios.delete(`http://192.168.11.61:3000/Transactions/deleterequest/${_id}`)
      }
      catch(err){
        console.log(err)
      }

    }
    return (
        <NativeBaseProvider>
            <ScrollView>
      {feed.map((e,key)=>{return(
      <View style={styles.container} key={key}>
        <Card style={{padding: 10, margin: 10}}>
        <Text style={{marginLeft: 270}}> createdAt</Text>
        <Avatar
          bg="green.500"
          size="md"
          source={{
            uri: "https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1606/tuktukdesign160600119/59070200-user-icon-man-profil-homme-d-affaires-avatar-personne-ic%C3%B4ne-illustration-vectorielle.jpg?ver=6",
          }}
        >
            </Avatar>
            <Text> firstName</Text>
          <Text>lastName</Text>
          <Text>Gender</Text>
          <Text>Speciality</Text>
          <Button
            onPress={()=>{CancelRequest(e._id)}}
            title="Cancel the request"
            color="teal"
            accessibilityLabel="Learn more about this purple button"
          />

        </Card>
      </View>)})}
      </ScrollView>
      </NativeBaseProvider>
    );
}
const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
export default SendedRequests;