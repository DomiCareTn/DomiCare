import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import {
    SafeAreaView,
    View,
    StyleSheet,
    ScrollView,
    Button,
    TouchableOpacity,
    Alert,
    Modal,
    Pressable,
    TextInput,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
} from "react-native";
import {
    IconButton,
    Icon,
    Box,
    Heading,
    Text,
    Center,
    HStack,
    FormControl,
    Input,
    Stack,
    NativeBaseProvider,
    TextArea,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { CredentialsContext } from "./Authentification/CredentialsContext.js";

export const Forum2 = (props) => {
    const navigation = useNavigation();
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;
    const [modalVisible, setModalVisible] = useState(false);
    const [subjects, setData] = useState([]);
    const [formData, setformData] = React.useState({});

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            axios
                .get(`http://192.168.119.162:3000/post/savepost`)
                .then((result) => setData(result.data))
                .catch((err) => console.log(err));
        });
        return unsubscribe;
    }, [navigation]);

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
                        .then((result) => setData(result.data))
                        .catch((err) => console.log(err));
                },
            },
        ]);
    const SavePost = () => {
        const obj = {
            owner: userData,
            title: formData.title,
            content: formData.content,
            type: "Quest",
        };
        axios
            .post(`http://192.168.119.162:3000/post/savepost`, { obj })
            .then((res) => {
                setModalVisible(!modalVisible);

                setData(res.data);
            })
            .catch((err) => console.log(err));
    };

    return (
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
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.addPostTittle}>
                                        Create a publication
                                    </Text>
                                    <TextInput
                                        style={{
                                            height: 40,
                                            backgroundColor: "rgb(248,248,248)",
                                            borderRadius: 15,
                                            width: 300,
                                            marginLeft: 0,
                                            justifyContent: "center",
                                            flexDirection: "row",
                                            display: "flex",
                                            alignItems: "center",
                                            margin: 6,
                                            padding: 5,
                                        }}
                                        onChangeText={(value) =>
                                            setformData({
                                                ...formData,
                                                title: value,
                                            })
                                        }
                                        placeholder="Title"
                                    />
                                    <TextArea
                                        h={200}
                                        placeholder="Write Something Here ..."
                                        onChangeText={(value) =>
                                            setformData({
                                                ...formData,
                                                content: value,
                                            })
                                        }
                                        w={300}
                                        style={{
                                            marginLeft: 0,
                                            borderRadius: 15,
                                        }}
                                    />
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-evenly",
                                            marginTop: 20,
                                            marginLeft: 0,
                                        }}
                                    >
                                        <Pressable
                                            style={[
                                                styles.button,
                                                styles.buttonClose,
                                                styles.cancelButton,
                                            ]}
                                            onPress={() =>
                                                setModalVisible(!modalVisible)
                                            }
                                        >
                                            <Text style={styles.textStyle}>
                                                Cancel
                                            </Text>
                                        </Pressable>
                                        <Pressable
                                            style={[
                                                styles.button,
                                                styles.buttonClose,
                                                styles.confirmButton,
                                            ]}
                                            onPress={SavePost}
                                        >
                                            <Text style={styles.textStyle}>
                                                Confirm
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    {subjects.map((item, key) => {
                        return (
                            <Box
                                key={key}
                                maxW="2000"
                                rounded="lg"
                                overflow="hidden"
                                marginBottom={10}
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
                                <Stack p="4" space={3}>
                                    <Stack space={2}>
                                        {userData._id === item.owner._id ? (
                                            <TouchableOpacity
                                                style={{
                                                    position: "absolute",
                                                    right: 0,
                                                    top: 0,
                                                    marginBottom: 10,
                                                }}
                                                onPress={() =>
                                                    DeleteAlert(item._id)
                                                }
                                            >
                                                <FontAwesome
                                                    name="trash"
                                                    size={20}
                                                    color="#696969"
                                                />
                                            </TouchableOpacity>
                                        ) : null}
                                        <Heading
                                            size="md"
                                            ml="-1"
                                            style={{ marginTop: 20 }}
                                        >
                                            {item.title}
                                        </Heading>
                                        <Text
                                            fontSize="xs"
                                            _light={{
                                                color: "#f39a6e",
                                            }}
                                            _dark={{
                                                color: "#f39a6e",
                                            }}
                                            fontWeight="500"
                                            ml="-0.5"
                                            mt="-1"
                                        >
                                            {" "}
                                            {item.owner.type === "serviceSeeker"
                                                ? item.owner.userName
                                                : item.owner.lastName +
                                                  " " +
                                                  item.owner.firstName}
                                        </Text>
                                    </Stack>
                                    <Text fontWeight="400">{item.content}</Text>
                                    <HStack>
                                        <HStack alignItems="center">
                                            <Text
                                                color="coolGray.600"
                                                _dark={{
                                                    color: "warmGray.200",
                                                }}
                                                fontWeight="400"
                                            >
                                                {moment(
                                                    item.createdAt
                                                ).fromNow() + "    "}
                                                {item.commentsCount} Comments
                                                {"    " +
                                                    item.participants
                                                        .length}{" "}
                                                Likes
                                            </Text>
                                        </HStack>
                                    </HStack>
                                    <View
                                        style={[
                                            {
                                                width: "40%",
                                                marginLeft: 100,
                                                marginTop: 10,
                                            },
                                        ]}
                                    >
                                        <Button
                                            color="#008080"
                                            width="100"
                                            title="Answer"
                                            backgroundColor="white"
                                            onPress={() =>
                                                navigation.navigate(
                                                    "ForumPost",
                                                    item
                                                )
                                            }
                                        ></Button>
                                    </View>
                                </Stack>
                            </Box>
                        );
                    })}
                </ScrollView>

                <Pressable
                    onPress={() => setModalVisible(true)}
                    style={{ position: "relative", marginLeft: 150, width: 60 }}
                >
                    <Feather name="plus-circle" color="#f39a6e" size={60} />
                </Pressable>
            </SafeAreaView>
        </View>
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    addPostTittle: {
        fontWeight: "bold",
        marginBottom: 10,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },

    buttonClose: {
        width: 80,
    },
    cancelButton: {
        backgroundColor: "#f39a6e",
    },
    confirmButton: {
        backgroundColor: "#008080",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});

export default () => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Forum2 />
            </Center>
        </NativeBaseProvider>
    );
};
