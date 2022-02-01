import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { CredentialsContext } from "./Authentification/CredentialsContext.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../.firebase_config.js";
import { LogBox } from "react-native";

import {  Button} from "react-native-elements";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    SafeAreaView,
    ScrollView,
    Pressable,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
} from "react-native";

const myEquipements = ({ navigation }) => {
    LogBox.ignoreLogs(["timer"]);
    LogBox.ignoreLogs(["Unhandled"]);
    const [file, setFile] = useState("");

    const [selectedtype, setSelectedtype] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [clicked, setClicked] = useState(false);
    const [formData, setData] = React.useState({});
    const [myData, setmyData] = React.useState([]);
    const [uploading, setUploading] = React.useState(false);

    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials;

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setData({ ...formData, ownerId: userData.userData._id });
            axios
                .get(
                    `http://192.168.1.5:3000/Equipements/myEquipements/${userData.userData._id}`
                )
                .then((res) => {
                    setmyData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
        return unsubscribe;
    }, [navigation]);

    const FetchData = () => {
        axios
            .get(
                `http://192.168.11.98:3000/Equipements/${userData.userData._id}`
            )
            .then((res) => {
                setmyData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };



    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
        });

        const picked = "file:///" + result.uri.split("file:/").join("");

        if (!result.cancelled) {
            setFile(picked);
            uploadFile();
        }
    };

    const uploadFile = async () => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", file, true);
            xhr.send(null);
        });
        const ref = storage.ref().child(new Date().toISOString());
        const snapshot = ref.put(blob);
        snapshot.on(
            storage.TaskEvent,
            () => {
                setUploading(true);
            },
            (error) => {
                setUploading(false);
                throw error;
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    setUploading(false);
                    setData({ ...formData, picture: url });
                });
            }
        );
    };

    const saveEquipement = () => {
        setData({ ...formData, ownerId: userData.userData._id });

        axios
            .post(`http://192.168.11.98:3000/Equipements/saveEquip`, {
                formData,
            })
            .then(() => alert("Equipement added successfully!"))
            .then(() => {
                setData({});
                setData({ ...formData, ownerId: userData.userData._id });
                FetchData();
                setClicked(false);
            })
            .catch((error) => console.log(error));
    };
    const myDelete = (id) => {
        axios
            .delete(`http://192.168.1.5:3000/Equipements/delete/${id}`)
            .then(()=> FetchData() )
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteItem = (id) => {
        myDelete(id);
        alert("Item Deleted Successfully!");
    };

    var EditEquip = () => {
        navigation.navigate("Edit Equipement");
    };

    return (
        <View>
            {clicked === false ? (
                <ScrollView>
                    <Button
                     
                        buttonStyle={{
                            backgroundColor: "#008080",
                            borderRadius: 30,
                            marginLeft: 80,
                            marginRight: 0,
                            marginTop: 70,
                            width: 250,
                            height: 50,
                            justifyContent: "center",
                            bottom: 20,
                        }}
                        title="Add Equipement"
                        onPress={() => setClicked(true)}
                    />
                    <FlatList
                        style={styles.list}
                        contentContainerStyle={styles.listContainer}
                        data={myData}
                        horizontal={false}
                        numColumns={2}
                        keyExtractor={(item) => {
                            return item._id;
                        }}
                        ItemSeparatorComponent={() => {
                            return <View style={styles.separator} />;
                        }}
                        renderItem={(post) => {
                            const item = post.item;
                            return (
                                <View style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        <View>
                                      
                                                <Text style={styles.title}>
                                                    {item.name}
                                                </Text>
                                                <Text style={styles.price}>
                                                    {item.price + " TD"}
                                                </Text>
                                           
                                            <Text style={styles.info}>
                                                    {item.reference}
                                                </Text>
                                            <Text style={styles.info}>
                                                {item.transactionType +
                                                    " - " +
                                                    item.city}
                                            </Text>
                                          
                                        </View>
                                    </View>

                                    <Image
                                        style={styles.cardImage}
                                        source={{ uri: item.picture }}
                                    />

                                    <View style={styles.cardFooter}>
                                        <View style={styles.socialBarContainer}>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent:
                                                        "space-evenly",
                                                    marginTop: 20,
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',

                                                }}
                                            >
                                                <TouchableOpacity
                                                    style={
                                                        styles.socialBarButton
                                                    }
                                                    onPress={() =>
                                                        deleteItem(item._id)
                                                    }
                                                >
                                                    <Text
                                                        style={[
                                                            styles.socialBarLabel,
                                                            styles.buyNow,
                                                        ]}
                                                    >
                                                        delete
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{ marginLeft: 20 }}
                                                    onPress={() =>
                                                        navigation.navigate(
                                                            "Edit Equipement",
                                                            item
                                                        )
                                                    }
                                                >
                                                    <Text
                                                        style={[
                                                            styles.socialBarLabel,
                                                            styles.buyNow,
                                                        ]}
                                                    >
                                                        update
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                          
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </ScrollView>
            ) : (
               
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{
                        px: "20px",
                        mb: "4",
                        minW: "80",
                    }}
                >
                    <SafeAreaView
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                marginBottom: 15,
                                marginTop: 80,
                                marginBottom: 30,
                                fontSize: 30,
                                fontWeight: "bold",
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        >
                            Add an Equipement
                        </Text>

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "nowrap",
                                marginLeft: 40,
                            }}
                        >
                            <Picker
                                selectedtype={selectedtype}
                                style={{
                                    height: 30,
                                    borderRadius: 15,
                                    width: 170,
                                }}
                                onValueChange={(TypeValue, TypeIndex) => {
                                    setData({
                                        ...formData,
                                        transactionType: TypeValue,
                                    });
                                }}
                            >
                                <Picker.Item label="Transaction" value="" />
                                <Picker.Item
                                    label="For Rent"
                                    value="For Rent"
                                />
                                <Picker.Item
                                    label="For Sale"
                                    value="For Sale"
                                />
                            </Picker>
                            <Picker
                                selectedValue={selectedValue}
                                style={{
                                    height: 30,
                                    borderRadius: 15,
                                    width: 150,
                                    marginLeft: 20,
                                }}
                                onValueChange={(cityValue, cityIndex) => {
                                    setData({ ...formData, city: cityValue });
                                }}
                            >
                                <Picker.Item label="City" value="" />
                                <Picker.Item label="Ariana" value="Ariana" />
                                <Picker.Item
                                    label="Ben Arous"
                                    value="Ben Arous"
                                />
                                <Picker.Item label="Tunis" value="Tunis" />
                                <Picker.Item label="Sousse" value="Sousse" />
                                <Picker.Item
                                    label="Monastir"
                                    value="Monastir"
                                />
                                <Picker.Item label="Sfax" value="Sfax" />
                                <Picker.Item label="Beja" value="Beja" />
                                <Picker.Item label="Benzart" value="Benzart" />
                                <Picker.Item label="Mahdia" value="Mahdia" />
                                <Picker.Item
                                    label="kairouan"
                                    value="kairouan"
                                />
                                <Picker.Item
                                    label="Sidi Bouzid"
                                    value="Sidi Bouzid"
                                />
                                <Picker.Item
                                    label="Zaghouane"
                                    value="Zaghouane"
                                />
                                <Picker.Item label="Mednine" value="Mednine" />
                                <Picker.Item label="Gabes" value="Gabes" />
                                <Picker.Item label="Kebili" value="Kebili" />
                                <Picker.Item
                                    label="Gasserine"
                                    value="Gasserine"
                                />
                                <Picker.Item
                                    label="Jendouba"
                                    value="Jendouba"
                                />
                                <Picker.Item label="Kef" value="Kef" />
                                <Picker.Item label="Siliana" value="Siliana" />
                                <Picker.Item label="Tozeur" value="Tozeur" />
                                <Picker.Item
                                    label="Tataouine"
                                    value="Tataouine"
                                />
                                <Picker.Item label="Manouba" value="Manouba" />
                                <Picker.Item label="Gafsa" value="Gafsa" />
                                <Picker.Item label="Nabeul" value="Nabeul" />
                            </Picker>
                        </View>

                        <View style={styles.action}>
                            <FontAwesome
                                name="medkit"
                                color="#0aada8"
                                size={20}
                                style={{ marginTop: 10, marginLeft: 35 }}
                            />
                            <TextInput
                                style={{
                                    height: 29,
                                    backgroundColor: "rgb(248,248,248)",
                                    width: 280,
                                    marginLeft: 15,
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    display: "flex",
                                    alignItems: "center",
                                    margin: 6,
                                    padding: 5,
                                }}
                                onChangeText={(value) =>
                                    setData({ ...formData, name: value })
                                }
                                placeholder="name"
                            />
                        </View>
                        <View style={styles.action}>
                            <FontAwesome
                                name="money"
                                color="#0aada8"
                                size={20}
                                style={{ marginTop: 10, marginLeft: 35 }}
                            />
                            <TextInput
                                keyboardType="numeric"
                                style={{
                                    height: 29,
                                    backgroundColor: "rgb(248,248,248)",
                                    width: 280,
                                    marginLeft: 15,
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    display: "flex",
                                    alignItems: "center",
                                    margin: 6,
                                    padding: 5,
                                }}
                                onChangeText={(value) =>
                                    setData({ ...formData, price: value })
                                }
                                placeholder="price"
                            />
                        </View>
                        <View style={styles.action}>
                            <FontAwesome
                                name="hashtag"
                                color="#0aada8"
                                size={20}
                                style={{ marginTop: 10, marginLeft: 35 }}
                            />
                            <TextInput
                                keyboardType="numeric"
                                style={{
                                    height: 29,
                                    backgroundColor: "rgb(248,248,248)",
                                    width: 280,
                                    marginLeft: 15,
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    display: "flex",
                                    alignItems: "center",
                                    margin: 6,
                                    padding: 5,
                                }}
                                onChangeText={(value) =>
                                    setData({ ...formData, quantity: value })
                                }
                                placeholder="Quantity"
                            />
                        </View>
                        <View style={styles.action}>
                            <FontAwesome
                                name="book"
                                color="#0aada8"
                                size={20}
                                style={{ marginTop: 10, marginLeft: 35 }}
                            />

                            <TextInput
                                style={{
                                    height: 29,
                                    backgroundColor: "rgb(248,248,248)",
                                    width: 280,
                                    marginLeft: 15,
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    display: "flex",
                                    alignItems: "center",
                                    margin: 6,
                                    padding: 5,
                                }}
                                onChangeText={(value) =>
                                    setData({ ...formData, description: value })
                                }
                                placeholder="description"
                            />
                        </View>
                        <View style={styles.action}>
                            <FontAwesome
                                name="folder-open"
                                color="#0aada8"
                                size={20}
                                style={{ marginTop: 10, marginLeft: 35 }}
                            />
                            <TextInput
                                style={{
                                    height: 29,
                                    backgroundColor: "rgb(248,248,248)",
                                    width: 280,
                                    marginLeft: 15,
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    display: "flex",
                                    alignItems: "center",
                                    margin: 6,
                                    padding: 5,
                                }}
                                onChangeText={(value) =>
                                    setData({ ...formData, reference: value })
                                }
                                placeholder="reference"
                            />
                        </View>
                
                        <Pressable
                            style={{
                                width: 150,
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginBottom: 20,
                            }}
                            onPress={pickImage}
                        >
                            <Text
                                style={{
                                    color: "#696969",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginTop: 20,
                                    fontSize: 20,
                                }}
                            >
                                Upload picture
                            </Text>
                        </Pressable>
                        {uploading ? (
                            <ActivityIndicator size="large" color="#008080" />
                        ) : null}

                        {formData.picture ? (
                            <Image
                                source={{ uri: formData.picture }}
                                style={{
                                    width: 200,
                                    height: 200,
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                            />
                        ) : null}

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                marginTop: 50,
                                marginBottom: 50,

                                marginLeft: 0,
                            }}
                        >
                            <Pressable
                                style={[
                                    styles.button,
                                    styles.buttonClose,
                                    styles.cancelButton,
                                ]}
                                onPress={() => setClicked(false)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.button,
                                    styles.buttonClose,
                                    styles.confirmButton,
                                ]}
                                onPress={saveEquipement}
                            >
                                <Text style={styles.textStyle}>Confirm</Text>
                            </Pressable>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    list: {
        marginTop: 30,
        paddingHorizontal: 5,
    },
    listContainer: {
        alignItems: "center",
    },
    separator: {
        marginTop: 10,
    },
    shareButton: {
        height: 30,
        width: 80,
        marginTop: 10,
        marginLeft: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#f39a6e",
    },
    /******** card **************/
    card: {
        shadowColor: "#00000021",
        shadowOffset: {
            width: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor: "white",
        flexBasis: "47%",
        marginHorizontal: 5,
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage: {
        flex: 1,
        height: 150,
        width: null,
    },
    /******** card components **************/
    title: {
        fontSize: 16,
        flex: 1,
    },
    info: {
        fontSize: 12,
        color: "#008080",
        marginTop: 5,
    },
    price: {
        fontSize: 14,
        color: "#f39a6e",
    },
    buyNow: {
        color: "#008080",
        marginTop: 5,
    },
    icon: {
        width: 25,
        height: 25,
    },
    /******** social bar ******************/
    socialBarContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
    },
    socialBarSection: {
        justifyContent: "center",
        flexDirection: "row",
        flex: 1,
    },
    socialBarlabel: {
        marginLeft: 8,
        alignSelf: "flex-end",
        justifyContent: "center",
    },
    socialBarButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },


    ButtonStyle: {
        paddingBottom: 30,

        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,

        height: 35,
        justifyContent: "space-between",
    },
  
    SubmitButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    action: {
        flexDirection: "row",
        marginTop: 6,
        marginRight: 20,
        marginBottom: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: "#696969",
        paddingBottom: 5,
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
});

export default myEquipements;
