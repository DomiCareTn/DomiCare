import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    Text,
    TextInput,
    StyleSheet,
    View,
    ScrollView,
    Pressable,
    ActivityIndicator,
Image
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../.firebase_config.js";
import { LogBox } from "react-native";
import { Picker } from "@react-native-picker/picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {  useNavigation } from "@react-navigation/native";

import { CredentialsContext } from "./Authentification/CredentialsContext.js";
import axios from "axios";

const EditEquipement = (props) => {
    LogBox.ignoreLogs(["timer"]);
    LogBox.ignoreLogs(["Unhandled"]);
    const [file, setFile] = useState("");
    const [selectedtype, setSelectedtype] = useState("");
    const navigation = useNavigation();

    const [selectedValue, setSelectedValue] = useState("");
    const [uploading, setUploading] = React.useState(false);

    const [formData, setData] = React.useState({});
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const equipement = props.route.params
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
        });

        const picked = "file:///" + result.uri.split("file:/").join("");

        if (!result.cancelled) {
            setFile(picked)
         
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

    useEffect(() => {
        setData({ ...formData, picture: equipement.picture })    
    }, []);


    const submit = () => {
        axios
            .put(
                `http://192.168.1.5:3000/Equipements/update/${equipement._id}`,
                {
                    formData,
                }
            )
            .then(() => alert("Equipement updated successfully!"))
            .then(() => navigation.navigate('My Equipements'))
          
            .catch((error) => console.log(error));
    };
 
  
    return (
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
                 Equipement Update
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
                    placeholder={equipement.name}
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
                    placeholder={`${equipement.price}`}
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
                    placeholder={`${equipement.quantity}`}
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
                    placeholder={equipement.description}
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
                    placeholder={equipement.reference}
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
                    onPress={() => {navigation.navigate("My Equipements")}}
                >
                    <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.button,
                        styles.buttonClose,
                        styles.confirmButton,
                    ]}
                    onPress={submit}
                >
                    <Text style={styles.textStyle}>Confirm</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    </ScrollView>
    );
};
const styles = StyleSheet.create({
    action: {
        flexDirection: "row",
        marginTop: 10,
        marginRight: 20,
        marginBottom: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: "#696969",
        paddingBottom: 5,
    },
    SubmitButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
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
export default EditEquipement;
