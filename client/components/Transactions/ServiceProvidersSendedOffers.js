import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { Card } from "react-native-shadow-cards";
import { Avatar, NativeBaseProvider } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../Authentification/CredentialsContext.js";
import axios from "axios";

const SendedOffers = () => {
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;
    const [feed, setFeed] = useState([]);
    const [offer, setOffer] = useState({});
    useEffect(async () => {
        console.log("sended offers");

        const _id = userData._id;

        const offers = await axios.get(
            `http://192.168.119.162:3000/Transactions/sendedoffers/${_id}`
        );
        setFeed(offers.data);
    }, []);

    const CancelOffer = async (e) => {
        try {
            const offer = await axios.delete(
                `http://192.168.119.162:3000/Transactions/Canceloffers/${e._id}`,
                { e }
            );
            setOffer(offer.data);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <NativeBaseProvider>
            <ScrollView>
                {feed.map((e, key) => {
                    return (
                        <View style={styles.container} key={key}>
                            <Card style={{ padding: 10, margin: 10 }}>
                                <Text style={{ marginLeft: 270 }}>
                                    {" "}
                                    createdAt
                                </Text>
                                <Avatar
                                    bg="green.500"
                                    size="md"
                                    source={{
                                        uri: "https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1606/tuktukdesign160600119/59070200-user-icon-man-profil-homme-d-affaires-avatar-personne-ic%C3%B4ne-illustration-vectorielle.jpg?ver=6",
                                    }}
                                ></Avatar>
                                <Text> firstName</Text>
                                <Text>lastName</Text>
                                <Text>Gender</Text>
                                <Text>Speciality</Text>

                                <Button
                                    onPress={() => {
                                        CancelOffer(e._id);
                                    }}
                                    title="Cancel"
                                    color="teal"
                                    accessibilityLabel="Learn more about this purple button"
                                />
                            </Card>
                        </View>
                    );
                })}
            </ScrollView>
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
export default SendedOffers;
