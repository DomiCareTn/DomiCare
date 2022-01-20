import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { TextArea, Center, NativeBaseProvider } from "native-base";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./Authentification/CredentialsContext.js";
import { localhost } from "@env";

const AddBlog = (props) => {
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;
    const [post, setpost] = useState({});

  const SavePost = (post) => {
    axios
      .post(`http://192.168.11.61:3000/savepost/savepost`, { post })
      .then((err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
          navigation.navigate("Forum");
        }
      });
  };
  return (
    <View>
      <TextArea
        h={500}
        placeholder="Text Area Placeholder"
        w={400}
        onChange={(e) => setpost({ owner: userData, content: e.target.value , type:'post'})}
      />
      <Button title="Post" onPress={() => SavePost(post)} />
    </View>
  );
};
export default () => {
    return (
        <NativeBaseProvider>
            <Center flex={3} px="3">
                <AddBlog />
            </Center>
        </NativeBaseProvider>
    );
};
