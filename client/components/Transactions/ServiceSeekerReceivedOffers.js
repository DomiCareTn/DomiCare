import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { Card } from "react-native-shadow-cards";
import { Avatar, NativeBaseProvider } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../Authentification/CredentialsContext.js";
import axios from "axios";
import { ListItem } from "react-native-elements";

const ReceivedOffers = () => {
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;
    const [feed, setFeed] = useState([]);
    useEffect(async () => {
        try {
            const _id = userData._id;
            const offers = await axios.get(
                `http://192.168.11.98:3000/Transactions/serviceoffers/:${_id}`
            );
            setFeed(offers.data);
        } catch (error) {
            console.log(error);
        }
    }, []);
    const AcceptOffer = async (e) => {
        try {
            await axios.put(
                `http://192.168.11.98:3000/Transactions/Acceptarequest/${e._id}`,
                { e }
            );
        } catch (err) {
            console.log(err);
        }
    };
    const RejectOffer = async (e) => {
        try {
           
            await axios.put(
                `http://192.168.11.98:3000/Transactions/deleterequest/${e._id}`,
                { e }
            );
        } catch (err) {
            console.log(err);
        }
    };
    return (
        
        <NativeBaseProvider>
            <View>
            <ScrollView>
                {feed.map((e, key) => {
                    console.log('e',e)
                    return (
                        <View style={styles.container} key={key}>

                            <Card style={{ padding: 10, margin: 10 }}>
                                <Text style={{ marginLeft: 270 }}>
                                    {" "}
                                    createdAt{e.createdAt}
                                </Text>
                                <Avatar
                                    // bg="grey"
                                    size="md"
                                    source={{
                                        uri: e.providerId.picture,
                                    }}
                                ></Avatar>
                                <Text> From:{e.providerId.firstName}{" "}{e.providerId.lastName}</Text>
                                <Text>Gender :{" "}{e.providerId.gender}</Text>
                                <Text>Speciality :{" "}{e.providerId.speciality}</Text>
                                <Text></Text>
                                <View style={{ flexDirection: "row" , justifyContent: 'space-evenly' }}>
                                <Button style={{ width:10}}
                                    onPress={() => {
                                        AcceptOffer(e);
                                    }}
                                   
                                    title="     Accept     "
                                    color="teal"
                                    accessibilityLabel="Learn more about this purple button"
                                />
                                <Button style={{ width:50 }} 
                                    onPress={() => {
                                        RejectOffer(e);
                                    }}
                                   
                                    title="     Decline     "
                                    color="#f39a6e"
                                    accessibilityLabel="Learn more about this purple button"
                                />
                                </View>
                            </Card>
                        </View>
                    );
                })}
            </ScrollView>
            </View>
        </NativeBaseProvider>
        
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
export default ReceivedOffers;
