import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Button , TextInput} from "react-native";
import { TextArea, Center, NativeBaseProvider } from "native-base";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./Authentification/CredentialsContext.js";


const AddBlog = (props) => {
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;
    // const [post, setpost] = useState({});
    const [formData, setData] = React.useState({});


    const SavePost = (post) => {
        const obj = {
            owner : userData,
            title : formData.title,
            content : formData.content,
            type : 'Quest'
        }
        axios
            .post(`http://192.168.11.137:3000/savepost/savepost`, { obj })
            .then((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res.data);
                    navigation.navigate("Forum");
                }
            });
    };
    return (
        <View>
                 <TextInput
              style={{
                height: 40,
                backgroundColor: "rgb(248,248,248)",
                // borderRadius: 15,
                width: 300,
                marginLeft: 45,
                justifyContent: "center",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                margin: 6,
                padding: 5,
              }}
              onChangeText={(value) => setData( { ...formData, title: value })}
              placeholder="Title"
            />
            <TextArea
                h={300}
                placeholder="Text Area Placeholder"
                w={300}
                onChangeText={(value) =>
                    
                    setData({ ...formData, content: value })
                    // setpost(
                        
                    //     {  owner: userData ,content: value ,type: "post", }
                    //   )
                }
            />
            <Button title="Post" onPress={() => SavePost()} />
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
