import React, { useState, useEffect, useRef } from "react";
import {  useNavigation } from "@react-navigation/native";
import moment from "moment";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {
    StyleSheet,
    View,
    Text,
 
    SafeAreaView,
    ScrollView,
  
    TouchableOpacity,
    Alert,

} from "react-native";
import {

    Input,
    Box,
    Heading,
    Center,
    HStack,
    Stack,
    NativeBaseProvider,
    Divider,
    Avatar,
} from "native-base";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { CredentialsContext } from "./Authentification/CredentialsContext.js";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

const ForumPost = (props) => {
    const [value, setValue] = React.useState("");
    const [shouldShow, setShouldShow] = useState(false);

  
    const navigation = useNavigation();
    const [singlepost, setpost] = useState([]);
    const [singlepostOwner, setpostOwner] = useState([]);
    const [participants, setparticipants] = useState([]);
    const [comments, setcomments] = useState([]);
   
    const [like, setLike] = useState(false);

    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;

    useEffect(async () => {
        try {
            const _id = props.route.params._id;
            const post = await axios.get(
                `http://192.168.11.98:3000/post/findpost/${_id}`
            );
            const com = await axios.get(
                `http://192.168.11.98:3000/post/findcomments/${_id}`
            );
            setpost(post.data);
            setpostOwner(post.data.owner);
            setparticipants(post.data.participants);
            setcomments(com.data);
            const userid = userData._id;
            if (post.data.participants.indexOf(userid) !== -1) {
                setLike(true);
            }
        } catch (err) {
            console.log(err);
        }
    }, [navigation]);

    const Comment = async () => {
        try {
            const _id = props.route.params._id;
            const postOwner = singlepost.owner._id;
            const obj = {
                owner: {
                    _id: userData._id,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    picture: userData.picture,
                },
                postId: singlepost._id,
                content: value,
                type: "comment",
            };
            const comment = await axios.post(
                `http://192.168.11.98:3000/post/createComment/${postOwner}`,
                { obj }
            );
            setValue("");
            const recom = await axios.get(
                `http://192.168.11.98:3000/post/findcomments/${_id}`
            );
            setcomments(recom.data);
        } catch (err) {
            console.log(err);
        }
    };
    const handleChange = (text) => {
        setValue(text);
    };

    const Like = async () => {
        const userid = userData._id;
        const postid = singlepost._id;
        try {
            let action = "";
            var index = singlepost.participants.indexOf(userid);
            if (index == -1) {
                action = "inc";
                setLike(true);
            } else {
                action = "déc";
                setLike(false);
            }
            const post = await axios.put(
                `http://192.168.1.5:3000/post/savepost`,
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

    const ListItem = ({
        photo,
        content,
        fullName,
        createdAt,
        owner_id,
        postId,
    }) => {
        return (
            <View
                style={{
                    borderRadius: 10,
                    backgroundColor: "#f0f2f5",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    marginTop: 10,
                    marginLeft: 10,
                    marginRight: 10,
                }}
            >
                {userData._id === owner_id ? (
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: 5,
                            top: 5,
                            marginBottom: 10,
                        }}
                        onPress={() => DeleteCommentAlert(postId)}
                    >
                        <FontAwesome name="trash" size={20} color="#696969" />
                    </TouchableOpacity>
                ) : null}
                <View
                    style={{
                        flexDirection: "row",
                        flex: 1,
                        marginTop: 10,
                        marginLeft: 10,
                    }}
                >
                    <Avatar
                        bg="indigo.500"
                        source={{
                            uri: photo,
                        }}
                    ></Avatar>
                    <View style={{ width: windowWidth - 220 }}>
                        <Text
                            style={{
                                color: "#333",
                                fontSize: 15,
                                fontWeight: "bold",
                                marginLeft: 10,
                            }}
                        >
                            {fullName}
                        </Text>
                        <Text
                            numberOfLines={1}
                            style={{
                                color: "#696969",
                                fontSize: 10,
                                marginLeft: 10,
                            }}
                        >
                            {moment(createdAt).fromNow()}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 20,
                        marginBottom: 20,
                        marginLeft: 10,
                        marginRight: 15,
                    }}
                >
                    <Text
                        style={{
                            color: "#333",
                            fontSize: 15,
                            marginLeft: 10,
                        }}
                    >
                        {content}
                    </Text>
                </View>
            </View>
        );
    };

    const DeleteAlert = (id) =>
        Alert.alert("Alert!", "Are you sure you want to delete this post?", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Confirm",
                onPress: () => {
                    axios
                        .delete(`http://192.168.1.5:3000/post/Delete/${id}`)
                        .then(() => navigation.navigate("Forum2"))
                        .catch((err) => console.log(err));
                },
            },
        ]);

    const DeleteCommentAlert = (id) =>
        Alert.alert("Alert!", "Are you sure you want to delete this comment?", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Confirm",
                onPress: () => {
                    const postID = props.route.params._id;

                    axios
                        .delete(
                            `http://192.168.1.5:3000/post/deleteComment/${id}/${postID}`
                        )
                        .then((res) => setcomments(res.data))
                        .catch((err) => console.log(err));
                },
            },
        ]);

    return (
  
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <View>
                    <SafeAreaView style={styles.container}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            _contentContainerStyle={{
                                px: "20px",
                                mb: "4",
                                minW: "80",
                            }}
                        >
                            <Box
                                maxW="2000"
                                width={370}
                                rounded="lg"
                                overflow="hidden"
                                marginTop={30}
                                marginBottom={30}
                                borderColor="coolGray.200"
                                borderWidth="1"
                                _dark={{
                                    borderColor: "coolGray.600",
                                    backgroundColor: "gray.700",
                                }}
                                _web={{
                                    shadow: 2,
                                    borderWidth: 0,
                                }}
                                _light={{
                                    backgroundColor: "gray.50",
                                }}
                            >
                                {userData._id === singlepostOwner._id ? (
                                    <TouchableOpacity
                                        style={{
                                            position: "absolute",
                                            right: 10,
                                            top: 10,
                                            marginBottom: 10,
                                        }}
                                        onPress={() =>
                                            DeleteAlert(singlepost._id)
                                        }
                                    >
                                        <FontAwesome
                                            name="trash"
                                            size={20}
                                            color="#696969"
                                        />
                                    </TouchableOpacity>
                                ) : null}
                                <Stack p="4" space={3}>
                                    <Stack space={2}>
                                        <Heading
                                            size="md"
                                            ml="-1"
                                            style={{ marginTop: 20 }}
                                        >
                                            {singlepost.title}
                                        </Heading>
                                        <Text
                                            fontSize="xs"
                                            style={{ color: "#f39a6e" }}
                                            fontWeight="500"
                                            ml="-0.5"
                                            mt="-1"
                                        >
                                            {singlepostOwner.userName}
                                        </Text>
                                    </Stack>
                                    <Text fontWeight="400">
                                        {singlepost.content}
                                    </Text>
                                    <HStack>
                                        <HStack alignItems="center">
                                            <Text
                                                style={{
                                                    color: "#696969",
                                                    fontSize: 12,
                                                }}
                                            >
                                                {moment(
                                                    singlepost.createdAt
                                                ).fromNow() + "    "}
                                                {comments.length} Comments
                                                {"    " +
                                                    participants.length}{" "}
                                                Likes
                                            </Text>
                                        </HStack>
                                    </HStack>
                                    <Divider />

                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-evenly",
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-evenly",
                                            }}
                                            onPress={() => Like()}
                                        >
                                            {like ? (
                                                <FontAwesome
                                                    name="thumbs-up"
                                                    size={20}
                                                    color="#008080"
                                                />
                                            ) : (
                                                <FontAwesome
                                                    name="thumbs-up"
                                                    size={20}
                                                    color="#696969"
                                                />
                                            )}

                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    color: "#696969",
                                                    marginLeft: 10,
                                                }}
                                            >
                                                Like
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-evenly",
                                            }}
                                            onPress={() =>
                                                setShouldShow(!shouldShow)
                                            }
                                        >
                                            <FontAwesome
                                                name="comment"
                                                size={20}
                                                color="#696969"
                                            />

                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    color: "#696969",
                                                    marginLeft: 10,
                                                }}
                                            >
                                                Comment
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </Stack>
                                <Divider />
                                {shouldShow ? (
                                    <Input
                                        value={value}
                                        // variant="rounded"
                                        style={{ marginTop: 0 }}
                                        placeholder="Put your comment here..."
                                        onChangeText={(text) =>
                                            handleChange(text)
                                        }
                                        w={{
                                            md: "25%",
                                        }}
                                        InputRightElement={
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Comment();
                                                }}
                                            >
                                                <Feather
                                                    name="plus-square"
                                                    size={25}
                                                    color="#008080"
                                                    style={{ marginRight: 10 }}
                                                />
                                            </TouchableOpacity>
                                        }
                                    />
                                ) : null}

                                <ScrollView nestedScrollEnabled={true}>
                                    {comments.map((item) => (
                                        <ListItem
                                            key={item._id}
                                            photo={item.owner.picture}
                                            fullName={
                                                item.owner.lastName +
                                                " " +
                                                item.owner.firstName
                                            }
                                            createdAt={item.createdAt}
                                            content={item.content}
                                            owner_id={item.owner._id}
                                            postId={item._id}
                                        />
                                    ))}
                                </ScrollView>
                            </Box>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </Center>
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
