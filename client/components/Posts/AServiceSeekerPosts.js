import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { Card } from "react-native-shadow-cards";
import { Avatar, NativeBaseProvider } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../Authentification/CredentialsContext.js";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import moment from "moment";


const AServiceSeekerPosts = () => {
  const [feed, setFeed] = useState([]);
  const { storedCredentials, setStoredCredentials } =
    React.useContext(CredentialsContext);
  const userData = storedCredentials.userData;
  const navigation = useNavigation();

  useEffect(async () => {
    console.log("feed", feed);
    const _id=userData._id
    try {
      const posts = await axios.get(
        `http://192.168.11.61:3000/Posts/AServiceSeekerPosts/${_id}`
      );
      setFeed(posts.data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const Delete = async (e) => {
    const _id = e._id;
    const offer = await axios.delete(
      `http://192.168.11.61:3000/Transactions/deleteapost/${_id}`,
      { type, postid, providerId, seekerId }
    );
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Button
          onPress={() => navigation.navigate("ServiceSeekerAddPost")}
          title="post an offer request"
          color="teal"
          accessibilityLabel="Learn more about this purple button"
        />

        {feed.map((e, key) => {
          console.log('e',e)
          return (
            <View style={styles.container} key={key}>
              <Card style={{ padding: 10, margin: 10 }} >
                <Text >createdAt:{e.createdAT}</Text>
                <Text>city:{e.city}</Text>
                <Text>city:{e.adress}</Text>
                <Text>Date:{e.startDate}-{e.endDate}</Text>
                <Text>Details:{e.content}</Text>
                <Button
                  onPress={() => {
                    Delete(e);
                  }}
                  title="Delete"
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
export default AServiceSeekerPosts;
