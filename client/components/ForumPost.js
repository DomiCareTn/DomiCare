import React, { useState, useEffect, useRef } from "react";
import { PrivateValueStore, useNavigation } from "@react-navigation/native";
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    SafeAreaView,
    ScrollView,
    TextInput,
    Touchable,
    TouchableOpacity,
    Alert,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
} from "react-native";
import {
    IconButton,
    // Icon,
    Input,
    Box,
    Heading,
    AspectRatio,
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
const windowHeight = Dimensions.get("window").height;

const ForumPost = (props) => {
    const [value, setValue] = React.useState("");
    const [shouldShow, setShouldShow] = useState(false);
    const [shouldshow, setshouldshow] = useState(false);

    const handleChange = (text) => {
        console.log(text);
        setValue(text);
    };
    const navigation = useNavigation();
    const [singlepost, setpost] = useState([]);
    const [singlepostOwner, setpostOwner] = useState([]);
    const [participants, setparticipants] = useState([]);
    const [comments, setcomments] = useState([]);
    const [subcomment, setsubcomment] = useState({});
    const [focus, setfocus] = useState(false);
    const [like, setLike] = useState(false);
    const [text, setText] = useState("");

    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;

    useEffect(async () => {
        try {
            const _id = props.route.params._id;
            const post = await axios.get(
                `http://192.168.119.162:3000/post/findpost/${_id}`
            );
            const com = await axios.get(
                `http://192.168.119.162:3000/post/findcomments/${_id}`
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
                `http://192.168.119.162:3000/post/createComment/${postOwner}`,
                { obj }
            );
            setValue("");
            const recom = await axios.get(
                `http://192.168.119.162:3000/post/findcomments/${_id}`
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
                `http://192.168.119.162:3000/post/reply`,
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
                `http://192.168.119.162:3000/post/findcomments/${_id}`
            );
            setcomments(recomm.data);
        } catch (err) {
            console.log(err);
        }
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
                `http://192.168.119.162:3000/post/savepost`,
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
        onPress,
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
                        .delete(`http://192.168.119.162:3000/post/Delete/${id}`)
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
                            `http://192.168.119.162:3000/post/deleteComment/${id}/${postID}`
                        )
                        .then((res) => setcomments(res.data))
                        .catch((err) => console.log(err));
                },
            },
        ]);

    return (
        //         <NativeBaseProvider>
        //             <Image
        //                 source={{
        //                     uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
        //                 }}
        //                 alt="image"
        //             />

        //             <Text> {singlepost.title}</Text>
        //             <Text> By:{singlepostOwner.userName}</Text>
        //             <Text>Posted At : {singlepost.createdAt}</Text>
        //             <Text> {singlepost.content}</Text>
        //             <Text> {participants.length}Likes</Text>
        //             <Divider/>
        //             <View style ={{flexDirection: "row" ,marginLeft: 20, justifyContent: 'space-evenly' }}>
        //             <Button title="Like" style={{width : 50}} st onPress={() => Like()} />
        // <Button
        //     title="comment"

        //     onPress={() => setShouldShow(!shouldShow)}
        // />
        //             </View>
        //             <Divider/>

        //             {shouldShow ? (
        //                 <Input
        //                     value={value}
        //                     variant="rounded"
        //                     placeholder="Round"
        //                     onChangeText={(text) => handleChange(text)}
        //                     w={{
        //                         md: "25%",
        //                     }}
        //                     InputRightElement={
        //                         <Button
        //                             size="xs"
        //                             rounded="none"
        //                             w="1/6"
        //                             h="full"
        //                             title="Submit"
        //                             onPress={() => Comment()}
        //                         ></Button>
        //                     }
        //                 />
        //             ) : null}
        //             <View>
        //                 <View style={{ height: 600, width: 500 }}>
        //                     <SafeAreaView>
        //                         <ScrollView>
        //                             <View>
        //                                 {comments.map((comment, key) => {
        //                                     return (
        //                                         <View key={key}>
        //                                             <Text> {comment.name} </Text>
        //                                             <Text> {comment.content} </Text>
        //                                             <Text> {comment.createdAt} </Text>
        //                                             <Text> {comment.likesCount} </Text>

        //                                             <Button
        //                                                 title="Reply"
        //                                                 onPress={() => {
        //                                                     setshouldshow(!shouldshow);
        //                                                     setsubcomment(comment._id);
        //                                                 }}
        //                                             />
        //                                             {comment.comments.map(
        //                                                 (reply, key) => {
        //                                                     return (
        //                                                         <View key={key}>
        //                                                             <Text>
        //                                                                 {
        //                                                                     reply.owner
        //                                                                         .name
        //                                                                 }
        //                                                             </Text>
        //                                                             <Text>
        //                                                                 {reply.content}
        //                                                             </Text>
        //                                                         </View>
        //                                                     );
        //                                                 }
        //                                             )}
        //                                             {shouldshow ? (
        //                                                 <Input
        //                                                     value={value}
        //                                                     variant="rounded"
        //                                                     placeholder="..."
        //                                                     onChange={(text) =>
        //                                                         handleChange(text)
        //                                                     }
        //                                                     w={{
        //                                                         md: "25%",
        //                                                     }}
        //                                                     InputRightElement={
        //                                                         <Button
        //                                                             size="xs"
        //                                                             rounded="none"
        //                                                             w="1/6"
        //                                                             h="full"
        //                                                             title="Submit"
        //                                                             onPress={() =>
        //                                                                 replyto()
        //                                                             }
        //                                                         ></Button>
        //                                                     }
        //                                                 />
        //                                             ) : null}
        //                                         </View>
        //                                     );
        //                                 })}
        //                             </View>
        //                         </ScrollView>
        //                     </SafeAreaView>
        //                 </View>
        //             </View>

        //         </NativeBaseProvider>

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
