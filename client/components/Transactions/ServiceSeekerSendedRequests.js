import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { Card } from "react-native-shadow-cards";
import { Avatar, NativeBaseProvider } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../Authentification/CredentialsContext.js";
import ServicesRequests from "../Posts/ServiceSeekersPosts.js";
import axios from "axios";

const SendedRequests = () => {
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;
    const [feed, setFeed] = useState([]);
    useEffect(async () => {
        try {
            console.log("req");
            const _id = userData._id;
            const offers = await axios.get(
                `http://192.168.11.98:3000/Transactions/sendedrequests/${_id}`
            );
            setFeed(offers.data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const CancelRequest = async (e) => {
        try {
            console.log("cancel", _id);

            await axios.delete(
                `http://192.168.11.98:3000/Transactions/deleterequest/${e._id}`
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
                    console.log("req", e);
                    return (
                        <View style={styles.container} key={key}>
                            <Card style={{ padding: 10, margin: 10 }}>
                                <Avatar
                                    bg="green.500"
                                    size="md"
                                    source={{
                                        uri: e.providerId.picture,
                                    }}
                                ></Avatar>
                                <Text>
                                    {" "}
                                    Request sent to: {
                                        e.providerId.firstName
                                    }{" "}
                                    {e.providerId.lastName}
                                </Text>
                                <Text>Speciality: {" "}
                                    {e.providerId.speciality}</Text>
                                <Text>Sent At:{e.createdAt}</Text>
                                <Button
                                    onPress={() => {
                                        CancelRequest(e);
                                    }}
                                    title="Cancel the request"
                                    color="#f39a6e"
                                    accessibilityLabel="Learn more about this purple button"
                                />
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
export default SendedRequests;
