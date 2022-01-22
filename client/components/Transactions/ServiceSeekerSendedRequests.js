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
        `http://192.168.11.203:3000/Transactions/sendedrequests/${_id}`
      );
      setFeed(offers.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const CancelRequest = async (_id) => {
    try {
      console.log("cancel", _id);

      await axios.delete(
        `http://192.168.11.203:3000/Transactions/deleterequest/${_id}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <NativeBaseProvider>
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
                  Request sent to: {e.providerId.firstName}{" "}
                  {e.providerId.lastName}
                </Text>
                <Text>Speciality</Text>
                <Text>Sent At:{e.createdAt}</Text>
                <Button
                  onPress={() => {
                    CancelRequest(e._id);
                  }}
                  title="Cancel the request"
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
export default SendedRequests;
