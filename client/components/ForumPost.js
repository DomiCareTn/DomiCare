import React, { useState, useEffect, useRef } from "react";
import { PrivateValueStore, useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import {
  Input,
  Center,
  NativeBaseProvider,
  IconButton,
  Icon,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./Authentification/CredentialsContext.js";
import { IPAdress } from "@env";
import Collapsible from "react-native-collapsible";

const ForumPost = (props) => {
  const [value, setValue] = React.useState("");
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldshow, setshouldshow] = useState(false);

  const handleChange = (text) => {
    console.log(text);
    setValue(text);
  };
  const navigation = useNavigation();
  const [singlepost, setpost] = useState({});
  const [participants, setparticipants] = useState([]);
  const [comments, setcomments] = useState([]);
  const [subcomment, setsubcomment] = useState({});
  const [focus, setfocus] = useState(false);
  const { storedCredentials, setStoredCredentials } =
    React.useContext(CredentialsContext);
  const userData = storedCredentials;

  useEffect(async () => {
    console.log("useeffect", userData);

    try {
      const _id = props.route.params._id;
      const post = await axios.get(
        `http://192.168.11.203:3000/savepost/findpost/${_id}`
      );
      const com = await axios.get(
        `http://192.168.11.203:3000/savepost/findcomments/${_id}`
      );

      setpost(post.data);
      setparticipants(post.data.participants);
      setcomments(com.data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const Comment = async () => {
    try {
      const _id = props.route.params._id;

      const comment = await axios.post(
        `http://192.168.11.203:3000/savepost/savepost`,
        {
          owner: { _id: userData._id, name: userData.firstName },
          postId: singlepost._id,
          content: value,
          type: "comment",
        }
      );
      const recom = await axios.get(
        `http://192.168.11.203:3000/savepost/findcomments/${_id}`
      );
      setcomments(recom.data);
    } catch (err) {
      console.log(err);
    }
  };
  const replyto = async () => {
    try {
      const id = subcomment;
      const reply = await axios.post(
        `http://192.168.11.203:3000/savepost/reply`,
        {
          rep: {
            owner: { _id: userData._id, name: userData.firstName },
            commentid: id,
            content: value,
          },
        }
      );
      const _id = props.route.params._id;
      const recomm = await axios.get(
        `http://192.168.11.203:3000/savepost/findcomments/${_id}`
      );
      setcomments(recomm.data);
    } catch (err) {
      console.log(err);
    }
  };

  const Like = async () => {
    const userid = userData.userData._id;
    const postid = singlepost._id;
    console.log("first", userid);
    try {
      let action = "";
      var index = singlepost.participants.indexOf(userid);
      if (index == -1) {
        action = "inc";
      } else {
        action = "déc";
      }
      const post = await axios.put(
        `http://192.168.11.203:3000/savepost/savepost`,
        {
          userid,
          postid,
          action,
        }
      );

      setpost(post.data);
      setparticipants(post.data.participants);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NativeBaseProvider>
      <Image
        source={{
          uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
        }}
        alt="image"
      />

      <Text> {singlepost.title}</Text>
      <Text> By:{singlepost.owner}</Text>
      <Text>Posted At : {singlepost.createdAt}</Text>
      <Text> {singlepost.content}</Text>
      <Text> {participants.length}Likes</Text>
      <Button title="Like" onPress={() => Like()} />

      <Button title="comment" onPress={() => setShouldShow(!shouldShow)} />
      {shouldShow ? (
        <Input
          value={value}
          variant="rounded"
          placeholder="Round"
          onChangeText={(text) => handleChange(text)}
          w={{
            md: "25%",
          }}
          InputRightElement={
            <Button
              size="xs"
              rounded="none"
              w="1/6"
              h="full"
              title="Submit"
              onPress={() => Comment()}
            ></Button>
          }
        />
      ) : null}
      <View>
        <View style={{ height: 600, width: 500 }}>
          <SafeAreaView>
            <ScrollView>
              <View>
                {comments.map((comment, key) => {
                  return (
                    <View key={key}>
                      <Text> {comment.name} </Text>
                      <Text> {comment.content} </Text>
                      <Text> {comment.createdAt} </Text>
                      <Text> {comment.likesCount} </Text>

                      <Button
                        title="Reply"
                        onPress={() => {
                          setshouldshow(!shouldshow);
                          setsubcomment(comment._id);
                        }}
                      />
                      {comment.comments.map((reply, key) => {
                        return (
                          <View key={key}>
                            <Text>{reply.owner.name}</Text>
                            <Text>{reply.content}</Text>
                          </View>
                        );
                      })}
                      {shouldshow ? (
                        <Input
                          value={value}
                          variant="rounded"
                          placeholder="..."
                          onChange={() => handleChange(value)}
                          w={{
                            md: "25%",
                          }}
                          InputRightElement={
                            <Button
                              size="xs"
                              rounded="none"
                              w="1/6"
                              h="full"
                              title="Submit"
                              onPress={() => replyto()}
                            ></Button>
                          }
                        />
                      ) : null}
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ForumPost;
