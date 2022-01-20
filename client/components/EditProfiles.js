import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
    ScrollView,
    Button,
    Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { useTheme, Divider } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CredentialsContext } from "../components/Authentification/CredentialsContext.js";

import BottomSheet from "reanimated-bottom-sheet";

import DateTimePicker from "@react-native-community/datetimepicker";
import { storage } from "../.firebase_config.js";

export const EditProfileEP = () => {
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState(
        "https://api.adorable.io/avatars/80/abott@adorable.png"
    );
    const [updateData, setUpdateData] = React.useState({});
    const [formData, setData] = React.useState({});
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [file, setFile] = useState("");
    const [focus, setFocus] = useState(false);
    const [calender, setCalender] = useState("birthday");
    React.useEffect(() => {
        axios
            .get(
                `http://192.168.11.14:3000/Users/ServiceProvider/Fetch/${userData._id}`
            )
            .then((res) => {
                const data = res.data;
                setData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const validatePassword = () => {
        let validation = true;
        let errors = {};
        let passwordValid =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        const validateOldPassword = () => {
            if (updateData.oldPassword === undefined) {
                errors.oldPassword = "please enter your password";
                validation = false;
            } else if (updateData.oldPassword !== undefined) {
                if (!passwordValid.test(String(updateData.oldPassword))) {
                    errors.oldPassword = "please enter valid password !";
                    validation = false;
                }
            }
        };
        const validateNewPassword = () => {
            if (updateData.password === undefined) {
                errors.password = "New Password is required";
                validation = false;
            } else if (
                updateData.password !== "undefined" &&
                updateData.confirmPassword !== "undefined"
            ) {
                if (!passwordValid.test(String(updateData.password))) {
                    errors.password =
                        "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character";
                    validation = false;
                } else if (
                    passwordValid.test(String(updateData.password)) &&
                    updateData.password != updateData.confirmPassword
                ) {
                    validation = false;
                    errors["password"] = "Passwords don't match.";
                    errors["confirmPassword"] = "Passwords don't match.";
                }
            }
        };
        validateOldPassword();
        validateNewPassword();

        setErrors(errors);
        return validation;
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setUpdateData({ ...updateData, dateOfBirth: currentDate });
        setCalender(moment(currentDate).format("MMM Do YY"));
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode("date");
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
                console.log("loading");
            },
            (error) => {
                console.log(error);
                return;
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    setUpdateData({ ...updateData, picture: url });
                });
            }
        );
    };
    const persistUpdate = (credentials) => {
        AsyncStorage.setItem("domicareCredentials", JSON.stringify(credentials))
            .then(() => {
                setStoredCredentials(credentials);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const update = () => {
        const userID = formData._id;
        axios
            .put(
                `http://192.168.11.14:3000/Users/ServiceProvider/Update/${userID}`,
                updateData
            )
            .then((res) => {
                if (res.data === "Email adress already exists") {
                    setErrors({
                        ...errors,
                        email: "*Email adress already exists!",
                    });
                } else {
                    const data = res.data;
                    persistUpdate({ userData: data });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const updatePassword = () => {
        const userID = formData._id;
        axios
            .put(
                `http://192.168.11.14:3000/Users/ServiceProvider/UpdatePassword/${userID}`,
                updateData
            )
            .then((res) => {
                if (res.data === "Wrong Password !!") {
                    setErrors({
                        ...errors,
                        oldPassword: "Wrong Password !!",
                    });
                } else {
                    AsyncStorage.removeItem("domicareCredentials")
                        .then(() => {
                            setStoredCredentials(null);
                        })
                        .catch((error) => console.log(error));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const onSubmit = () => {
        if (validatePassword()) {
            updatePassword();
        } else console.log("Validation Failed");
    };
    const handleFocus = () => setFocus(true);

    // const renderInner = () => (
    //     <View style={styles.panel}>
    //         <View style={{ alignItems: "center" }}>
    //             <Text style={styles.panelTitle}>Upload Photo</Text>
    //             <Text style={styles.panelSubtitle}>
    //                 Choose Your Profile Picture
    //             </Text>
    //         </View>
    //         <TouchableOpacity
    //             style={styles.panelButton}
    //             //    onPress={takePhotoFromCamera}
    //         >
    //             <Text style={styles.panelButtonTitle}>Take Photo</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //             style={styles.panelButton}
    //             //    onPress={choosePhotoFromLibrary}
    //         >
    //             <Text style={styles.panelButtonTitle}>Choose From Library</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={styles.panelButton} onPress={() => {}}>
    //             <Text style={styles.panelButtonTitle}>Cancel</Text>
    //         </TouchableOpacity>
    //     </View>
    // );

    // const renderHeader = () => (
    //     <View style={styles.header}>
    //         <View style={styles.panelHeader}>
    //             <View style={styles.panelHandle} />
    //         </View>
    //     </View>
    // );
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
                px: "20px",
                mb: "4",
                minW: "80",
            }}
        >
            <View style={styles.container}>
                <BottomSheet
                    snapPoints={[330, 0]}
                    // renderContent={renderInner}
                    // renderHeader={renderHeader}
                    initialSnap={1}
                    enabledGestureInteraction={true}
                />
                <View style={{ margin: 20 }}>
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity>
                            <View
                                style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 15,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <ImageBackground
                                    source={{
                                        uri: userData.picture,
                                    }}
                                    style={{ height: 100, width: 100 }}
                                    imageStyle={{ borderRadius: 15 }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Icon
                                            onPress={pickImage}
                                            name="camera"
                                            size={35}
                                            color="#fff"
                                            style={{
                                                opacity: 0.7,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderWidth: 1,
                                                borderColor: "#fff",
                                                borderRadius: 10,
                                            }}
                                        />
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <Text
                            style={{
                                marginTop: 10,
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            {userData.lastName + " " + userData.firstName}
                        </Text>
                    </View>

                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="black" size={20} />
                        <TextInput
                            onFocus={handleFocus}
                            onChangeText={(value) =>
                                setUpdateData({
                                    ...updateData,
                                    firstName: value,
                                })
                            }
                            placeholder="Firstname"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="black" size={20} />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({
                                    ...updateData,
                                    lastName: value,
                                })
                            }
                            placeholder="Lastname"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>

                    {"userName" in errors ? (
                        <Text style={styles.errors}> {errors.userName} </Text>
                    ) : (
                        <></>
                    )}
                    <View style={styles.action}>
                        <FontAwesome
                            name="transgender"
                            color="black"
                            size={20}
                        />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({ ...updateData, gender: value })
                            }
                            placeholder="Gender"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.action}>
                        <Feather name="phone" color="black" size={20} />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({
                                    ...updateData,
                                    phoneNumber: value,
                                })
                            }
                            placeholder="Phone"
                            placeholderTextColor="#666666"
                            keyboardType="number-pad"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.action}>
                        <FontAwesome
                            name="envelope-o"
                            color="black"
                            size={20}
                        />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({ ...updateData, email: value })
                            }
                            placeholder="Email"
                            placeholderTextColor="#666666"
                            keyboardType="email-address"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    {"email" in errors ? (
                        <Text style={styles.errors}> {errors.email} </Text>
                    ) : (
                        <></>
                    )}
                    <View style={styles.action}>
                        <FontAwesome name="globe" color="black" size={20} />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({ ...updateData, city: value })
                            }
                            placeholder="City"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.action}>
                        <Icon
                            name="map-marker-outline"
                            color="black"
                            size={20}
                        />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({ ...updateData, adress: value })
                            }
                            placeholder="Adresse"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.action}>
                        <Icon name="cake" color="black" size={20} />
                        <Text onPress={showDatepicker} style={styles.birthday}>
                            {" "}
                            {calender}
                        </Text>
                    </View>

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}

                    <TouchableOpacity
                        style={styles.commandButton}
                        onPress={update}
                    >
                        <Text style={styles.panelButtonTitle}>
                            Update Profile
                        </Text>
                    </TouchableOpacity>
                    {userData.password ? (
                        <View>
                            <View style={styles.action}>
                                <Icon name="key" color="black" size={20} />
                                <TextInput
                                    secureTextEntry={true}
                                    onFocus={handleFocus}
                                    onChangeText={(value) =>
                                        setUpdateData({
                                            ...updateData,
                                            oldPassword: value,
                                        })
                                    }
                                    placeholder="Your password"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput,
                                        {
                                            color: "black",
                                        },
                                    ]}
                                />
                            </View>
                            {"oldPassword" in errors ? (
                                <Text style={styles.errors}>
                                    {" "}
                                    {errors.oldPassword}{" "}
                                </Text>
                            ) : (
                                <></>
                            )}
                            <View style={styles.action}>
                                <Icon name="key" color="black" size={20} />
                                <TextInput
                                    secureTextEntry={true}
                                    onFocus={handleFocus}
                                    onChangeText={(value) =>
                                        setUpdateData({
                                            ...updateData,
                                            password: value,
                                        })
                                    }
                                    placeholder="New password"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput,
                                        {
                                            color: "black",
                                        },
                                    ]}
                                />
                            </View>
                            {"password" in errors ? (
                                <Text style={styles.errors}>
                                    {" "}
                                    {errors.password}{" "}
                                </Text>
                            ) : (
                                <></>
                            )}
                            <View style={styles.action}>
                                <Icon name="key" color="black" size={20} />

                                <TextInput
                                    secureTextEntry={true}
                                    onFocus={handleFocus}
                                    onChangeText={(value) =>
                                        setUpdateData({
                                            ...updateData,
                                            confirmPassword: value,
                                        })
                                    }
                                    placeholder="Confirm password"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput,
                                        {
                                            color: "black",
                                        },
                                    ]}
                                />
                                {"confirmPassword" in errors ? (
                                    <Text style={styles.errors}>
                                        {" "}
                                        {errors.confirmPassword}{" "}
                                    </Text>
                                ) : (
                                    <></>
                                )}
                            </View>
                            <TouchableOpacity
                                style={styles.commandButton}
                                onPress={onSubmit}
                            >
                                <Text style={styles.panelButtonTitle}>
                                    Update Password
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <></>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export const EditProfileSP = () => {
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState(
        "https://api.adorable.io/avatars/80/abott@adorable.png"
    );
    const [updateData, setUpdateData] = React.useState({});
    const [formData, setData] = React.useState({});
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [file, setFile] = useState("");
    const [focus, setFocus] = useState(false);
    const [calender, setCalender] = useState("birthday");
    React.useEffect(() => {
        axios
            .get(
                `http://192.168.11.14:3000/Users/ServiceProvider/Fetch/${userData._id}`
            )
            .then((res) => {
                const data = res.data;
                setData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const validatePassword = () => {
        let validation = true;
        let errors = {};
        let passwordValid =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        const validateOldPassword = () => {
            if (updateData.oldPassword === undefined) {
                errors.oldPassword = "please enter your password";
                validation = false;
            } else if (updateData.oldPassword !== undefined) {
                if (!passwordValid.test(String(updateData.oldPassword))) {
                    errors.oldPassword = "please enter valid password !";
                    validation = false;
                }
            }
        };
        const validateNewPassword = () => {
            if (updateData.password === undefined) {
                errors.password = "New Password is required";
                validation = false;
            } else if (
                updateData.password !== "undefined" &&
                updateData.confirmPassword !== "undefined"
            ) {
                if (!passwordValid.test(String(updateData.password))) {
                    errors.password =
                        "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character";
                    validation = false;
                } else if (
                    passwordValid.test(String(updateData.password)) &&
                    updateData.password != updateData.confirmPassword
                ) {
                    validation = false;
                    errors["password"] = "Passwords don't match.";
                    errors["confirmPassword"] = "Passwords don't match.";
                }
            }
        };
        validateOldPassword();
        validateNewPassword();

        setErrors(errors);
        return validation;
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setUpdateData({ ...updateData, dateOfBirth: currentDate });
        setCalender(moment(currentDate).format("MMM Do YY"));
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode("date");
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
                console.log("loading");
            },
            (error) => {
                console.log(error);
                return;
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    setUpdateData({ ...updateData, picture: url });
                });
            }
        );
    };
    const persistUpdate = (credentials) => {
        AsyncStorage.setItem("domicareCredentials", JSON.stringify(credentials))
            .then(() => {
                setStoredCredentials(credentials);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const update = () => {
        const userID = formData._id;
        axios
            .put(
                `http://192.168.11.14:3000/Users/ServiceProvider/Update/${userID}`,
                updateData
            )
            .then((res) => {
                if (res.data === "Email adress already exists") {
                    setErrors({
                        ...errors,
                        email: "*Email adress already exists!",
                    });
                } else {
                    const data = res.data;
                    persistUpdate({ userData: data });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const updatePassword = () => {
        const userID = formData._id;
        axios
            .put(
                `http://192.168.11.14:3000/Users/ServiceProvider/UpdatePassword/${userID}`,
                updateData
            )
            .then((res) => {
                if (res.data === "Wrong Password !!") {
                    setErrors({
                        ...errors,
                        oldPassword: "Wrong Password !!",
                    });
                } else {
                    AsyncStorage.removeItem("domicareCredentials")
                        .then(() => {
                            setStoredCredentials(null);
                        })
                        .catch((error) => console.log(error));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const onSubmit = () => {
        if (validatePassword()) {
            updatePassword();
        } else console.log("Validation Failed");
    };
    const handleFocus = () => setFocus(true);

    // const renderInner = () => (
    //     <View style={styles.panel}>
    //         <View style={{ alignItems: "center" }}>
    //             <Text style={styles.panelTitle}>Upload Photo</Text>
    //             <Text style={styles.panelSubtitle}>
    //                 Choose Your Profile Picture
    //             </Text>
    //         </View>
    //         <TouchableOpacity
    //             style={styles.panelButton}
    //             //    onPress={takePhotoFromCamera}
    //         >
    //             <Text style={styles.panelButtonTitle}>Take Photo</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //             style={styles.panelButton}
    //             //    onPress={choosePhotoFromLibrary}
    //         >
    //             <Text style={styles.panelButtonTitle}>Choose From Library</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={styles.panelButton} onPress={() => {}}>
    //             <Text style={styles.panelButtonTitle}>Cancel</Text>
    //         </TouchableOpacity>
    //     </View>
    // );

    // const renderHeader = () => (
    //     <View style={styles.header}>
    //         <View style={styles.panelHeader}>
    //             <View style={styles.panelHandle} />
    //         </View>
    //     </View>
    // );
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
                px: "20px",
                mb: "4",
                minW: "80",
            }}
        >
            <View style={styles.container}>
                <BottomSheet
                    snapPoints={[330, 0]}
                    // renderContent={renderInner}
                    // renderHeader={renderHeader}
                    initialSnap={1}
                    enabledGestureInteraction={true}
                />
                <View style={{ margin: 20 }}>
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity>
                            <View
                                style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 15,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <ImageBackground
                                    source={{
                                        uri: userData.picture,
                                    }}
                                    style={{ height: 100, width: 100 }}
                                    imageStyle={{ borderRadius: 15 }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Icon
                                            onPress={pickImage}
                                            name="camera"
                                            size={35}
                                            color="#fff"
                                            style={{
                                                opacity: 0.7,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderWidth: 1,
                                                borderColor: "#fff",
                                                borderRadius: 10,
                                            }}
                                        />
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <Text
                            style={{
                                marginTop: 10,
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            {userData.lastName + " " + userData.firstName}
                        </Text>
                    </View>

                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="black" size={20} />
                        <TextInput
                            onFocus={handleFocus}
                            onChangeText={(value) =>
                                setUpdateData({
                                    ...updateData,
                                    firstName: value,
                                })
                            }
                            placeholder="Firstname"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="black" size={20} />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({
                                    ...updateData,
                                    lastName: value,
                                })
                            }
                            placeholder="Lastname"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>

                    {"userName" in errors ? (
                        <Text style={styles.errors}> {errors.userName} </Text>
                    ) : (
                        <></>
                    )}
                    <View style={styles.action}>
                        <FontAwesome
                            name="transgender"
                            color="black"
                            size={20}
                        />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({ ...updateData, gender: value })
                            }
                            placeholder="Gender"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.action}>
                        <Feather name="phone" color="black" size={20} />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({
                                    ...updateData,
                                    phoneNumber: value,
                                })
                            }
                            placeholder="Phone"
                            placeholderTextColor="#666666"
                            keyboardType="number-pad"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.action}>
                        <FontAwesome
                            name="envelope-o"
                            color="black"
                            size={20}
                        />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({ ...updateData, email: value })
                            }
                            placeholder="Email"
                            placeholderTextColor="#666666"
                            keyboardType="email-address"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    {"email" in errors ? (
                        <Text style={styles.errors}> {errors.email} </Text>
                    ) : (
                        <></>
                    )}
                    <View style={styles.action}>
                        <FontAwesome name="globe" color="black" size={20} />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({ ...updateData, city: value })
                            }
                            placeholder="City"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.action}>
                        <Icon
                            name="map-marker-outline"
                            color="black"
                            size={20}
                        />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({ ...updateData, adress: value })
                            }
                            placeholder="Adresse"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.action}>
                        <Icon name="cake" color="black" size={20} />
                        <Text onPress={showDatepicker} style={styles.birthday}>
                            {" "}
                            {calender}
                        </Text>
                    </View>

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}

                    <TouchableOpacity
                        style={styles.commandButton}
                        onPress={update}
                    >
                        <Text style={styles.panelButtonTitle}>
                            Update Profile
                        </Text>
                    </TouchableOpacity>
                    {userData.password ? (
                        <View>
                            <View style={styles.action}>
                                <Icon name="key" color="black" size={20} />
                                <TextInput
                                    secureTextEntry={true}
                                    onFocus={handleFocus}
                                    onChangeText={(value) =>
                                        setUpdateData({
                                            ...updateData,
                                            oldPassword: value,
                                        })
                                    }
                                    placeholder="Your password"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput,
                                        {
                                            color: "black",
                                        },
                                    ]}
                                />
                            </View>
                            {"oldPassword" in errors ? (
                                <Text style={styles.errors}>
                                    {" "}
                                    {errors.oldPassword}{" "}
                                </Text>
                            ) : (
                                <></>
                            )}
                            <View style={styles.action}>
                                <Icon name="key" color="black" size={20} />
                                <TextInput
                                    secureTextEntry={true}
                                    onFocus={handleFocus}
                                    onChangeText={(value) =>
                                        setUpdateData({
                                            ...updateData,
                                            password: value,
                                        })
                                    }
                                    placeholder="New password"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput,
                                        {
                                            color: "black",
                                        },
                                    ]}
                                />
                            </View>
                            {"password" in errors ? (
                                <Text style={styles.errors}>
                                    {" "}
                                    {errors.password}{" "}
                                </Text>
                            ) : (
                                <></>
                            )}
                            <View style={styles.action}>
                                <Icon name="key" color="black" size={20} />

                                <TextInput
                                    secureTextEntry={true}
                                    onFocus={handleFocus}
                                    onChangeText={(value) =>
                                        setUpdateData({
                                            ...updateData,
                                            confirmPassword: value,
                                        })
                                    }
                                    placeholder="Confirm password"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput,
                                        {
                                            color: "black",
                                        },
                                    ]}
                                />
                                {"confirmPassword" in errors ? (
                                    <Text style={styles.errors}>
                                        {" "}
                                        {errors.confirmPassword}{" "}
                                    </Text>
                                ) : (
                                    <></>
                                )}
                            </View>
                            <TouchableOpacity
                                style={styles.commandButton}
                                onPress={onSubmit}
                            >
                                <Text style={styles.panelButtonTitle}>
                                    Update Password
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <></>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export const EditProfileSS = () => {
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState(
        "https://api.adorable.io/avatars/80/abott@adorable.png"
    );
    const [updateData, setUpdateData] = React.useState({});
    const [formData, setData] = React.useState({});
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [file, setFile] = useState("");
    const [focus, setFocus] = useState(false);
    const [calender, setCalender] = useState("birthday");
    React.useEffect(() => {
        axios
            .get(
                `http://192.168.11.14:3000/Users/ServiceSeeker/Fetch/${userData._id}`
            )
            .then((res) => {
                const data = res.data;
                setData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const validatePassword = () => {
        let validation = true;
        let errors = {};
        let passwordValid =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        const validateOldPassword = () => {
            if (updateData.oldPassword === undefined) {
                errors.oldPassword = "please enter your password";
                validation = false;
            } else if (updateData.oldPassword !== undefined) {
                if (!passwordValid.test(String(updateData.oldPassword))) {
                    errors.oldPassword = "please enter valid password !";
                    validation = false;
                }
            }
        };
        const validateNewPassword = () => {
            if (updateData.password === undefined) {
                errors.password = "New Password is required";
                validation = false;
            } else if (
                updateData.password !== "undefined" &&
                updateData.confirmPassword !== "undefined"
            ) {
                if (!passwordValid.test(String(updateData.password))) {
                    errors.password =
                        "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character";
                    validation = false;
                } else if (
                    passwordValid.test(String(updateData.password)) &&
                    updateData.password != updateData.confirmPassword
                ) {
                    validation = false;
                    errors["password"] = "Passwords don't match.";
                    errors["confirmPassword"] = "Passwords don't match.";
                }
            }
        };
        validateOldPassword();
        validateNewPassword();

        setErrors(errors);
        return validation;
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setUpdateData({ ...updateData, dateOfBirth: currentDate });
        setCalender(moment(currentDate).format("MMM Do YY"));
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode("date");
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
                console.log("loading");
            },
            (error) => {
                console.log(error);
                return;
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    setUpdateData({ ...updateData, picture: url });
                });
            }
        );
    };
    const persistUpdate = (credentials) => {
        AsyncStorage.setItem("domicareCredentials", JSON.stringify(credentials))
            .then(() => {
                setStoredCredentials(credentials);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const update = () => {
        const userID = formData._id;
        axios
            .put(
                `http://192.168.11.14:3000/Users/ServiceSeeker/Update/${userID}`,
                updateData
            )
            .then((res) => {
                if (res.data === "Email adress already exists") {
                    setErrors({
                        ...errors,
                        email: "*Email adress already exists!",
                    });
                } else if (res.data === "Username already exists!") {
                    setErrors({
                        ...errors,
                        userName: "*Username already exists",
                    });
                } else {
                    const data = res.data;
                    persistUpdate({ userData: data });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const updatePassword = () => {
        const userID = formData._id;
        axios
            .put(
                `http://192.168.11.14:3000/Users/ServiceSeeker/UpdatePassword/${userID}`,
                updateData
            )
            .then((res) => {
                if (res.data === "Wrong Password !!") {
                    setErrors({
                        ...errors,
                        oldPassword: "Wrong Password !!",
                    });
                } else {
                    AsyncStorage.removeItem("domicareCredentials")
                        .then(() => {
                            setStoredCredentials(null);
                        })
                        .catch((error) => console.log(error));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const onSubmit = () => {
        if (validatePassword()) {
            updatePassword();
        } else console.log("Validation Failed");
    };
    const handleFocus = () => setFocus(true);

    // const renderInner = () => (
    //     <View style={styles.panel}>
    //         <View style={{ alignItems: "center" }}>
    //             <Text style={styles.panelTitle}>Upload Photo</Text>
    //             <Text style={styles.panelSubtitle}>
    //                 Choose Your Profile Picture
    //             </Text>
    //         </View>
    //         <TouchableOpacity
    //             style={styles.panelButton}
    //             //    onPress={takePhotoFromCamera}
    //         >
    //             <Text style={styles.panelButtonTitle}>Take Photo</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //             style={styles.panelButton}
    //             //    onPress={choosePhotoFromLibrary}
    //         >
    //             <Text style={styles.panelButtonTitle}>Choose From Library</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={styles.panelButton} onPress={() => {}}>
    //             <Text style={styles.panelButtonTitle}>Cancel</Text>
    //         </TouchableOpacity>
    //     </View>
    // );

    // const renderHeader = () => (
    //     <View style={styles.header}>
    //         <View style={styles.panelHeader}>
    //             <View style={styles.panelHandle} />
    //         </View>
    //     </View>
    // );
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
                px: "20px",
                mb: "4",
                minW: "80",
            }}
        >
            <View style={styles.container}>
                <BottomSheet
                    snapPoints={[330, 0]}
                    // renderContent={renderInner}
                    // renderHeader={renderHeader}
                    initialSnap={1}
                    enabledGestureInteraction={true}
                />
                <View style={{ margin: 20 }}>
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity>
                            <View
                                style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 15,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <ImageBackground
                                    source={{
                                        uri: userData.picture,
                                    }}
                                    style={{ height: 100, width: 100 }}
                                    imageStyle={{ borderRadius: 15 }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Icon
                                            onPress={pickImage}
                                            name="camera"
                                            size={35}
                                            color="#fff"
                                            style={{
                                                opacity: 0.7,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderWidth: 1,
                                                borderColor: "#fff",
                                                borderRadius: 10,
                                            }}
                                        />
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <Text
                            style={{
                                marginTop: 10,
                                fontSize: 18,
                                fontWeight: "bold",
                            }}
                        >
                            {userData.lastName + " " + userData.firstName}
                        </Text>
                    </View>

                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="black" size={20} />
                        <TextInput
                            onFocus={handleFocus}
                            onChangeText={(value) =>
                                setUpdateData({
                                    ...updateData,
                                    firstName: value,
                                })
                            }
                            placeholder="Firstname"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="black" size={20} />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({
                                    ...updateData,
                                    lastName: value,
                                })
                            }
                            placeholder="Lastname"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="black" size={20} />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({
                                    ...updateData,
                                    userName: value,
                                })
                            }
                            placeholder="Username"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    {"userName" in errors ? (
                        <Text style={styles.errors}> {errors.userName} </Text>
                    ) : (
                        <></>
                    )}
                    <View style={styles.action}>
                        <FontAwesome
                            name="transgender"
                            color="black"
                            size={20}
                        />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({ ...updateData, gender: value })
                            }
                            placeholder="Gender"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.action}>
                        <Feather name="phone" color="black" size={20} />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({
                                    ...updateData,
                                    phoneNumber: value,
                                })
                            }
                            placeholder="Phone"
                            placeholderTextColor="#666666"
                            keyboardType="number-pad"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.action}>
                        <FontAwesome
                            name="envelope-o"
                            color="black"
                            size={20}
                        />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({ ...updateData, email: value })
                            }
                            placeholder="Email"
                            placeholderTextColor="#666666"
                            keyboardType="email-address"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    {"email" in errors ? (
                        <Text style={styles.errors}> {errors.email} </Text>
                    ) : (
                        <></>
                    )}
                    <View style={styles.action}>
                        <FontAwesome name="globe" color="black" size={20} />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({ ...updateData, city: value })
                            }
                            placeholder="City"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.action}>
                        <Icon
                            name="map-marker-outline"
                            color="black"
                            size={20}
                        />
                        <TextInput
                            onChangeText={(value) =>
                                setUpdateData({ ...updateData, adress: value })
                            }
                            placeholder="Adresse"
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={[
                                styles.textInput,
                                {
                                    color: "black",
                                },
                            ]}
                        />
                    </View>
                    <View style={styles.action}>
                        <Icon name="cake" color="black" size={20} />
                        <Text onPress={showDatepicker} style={styles.birthday}>
                            {" "}
                            {calender}
                        </Text>
                    </View>

                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}

                    <TouchableOpacity
                        style={styles.commandButton}
                        onPress={update}
                    >
                        <Text style={styles.panelButtonTitle}>
                            Update Profile
                        </Text>
                    </TouchableOpacity>
                    {userData.password ? (
                        <View>
                            <View style={styles.action}>
                                <Icon name="key" color="black" size={20} />
                                <TextInput
                                    secureTextEntry={true}
                                    onFocus={handleFocus}
                                    onChangeText={(value) =>
                                        setUpdateData({
                                            ...updateData,
                                            oldPassword: value,
                                        })
                                    }
                                    placeholder="Your password"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput,
                                        {
                                            color: "black",
                                        },
                                    ]}
                                />
                            </View>
                            {"oldPassword" in errors ? (
                                <Text style={styles.errors}>
                                    {" "}
                                    {errors.oldPassword}{" "}
                                </Text>
                            ) : (
                                <></>
                            )}
                            <View style={styles.action}>
                                <Icon name="key" color="black" size={20} />
                                <TextInput
                                    secureTextEntry={true}
                                    onFocus={handleFocus}
                                    onChangeText={(value) =>
                                        setUpdateData({
                                            ...updateData,
                                            password: value,
                                        })
                                    }
                                    placeholder="New password"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput,
                                        {
                                            color: "black",
                                        },
                                    ]}
                                />
                            </View>
                            {"password" in errors ? (
                                <Text style={styles.errors}>
                                    {" "}
                                    {errors.password}{" "}
                                </Text>
                            ) : (
                                <></>
                            )}
                            <View style={styles.action}>
                                <Icon name="key" color="black" size={20} />

                                <TextInput
                                    secureTextEntry={true}
                                    onFocus={handleFocus}
                                    onChangeText={(value) =>
                                        setUpdateData({
                                            ...updateData,
                                            confirmPassword: value,
                                        })
                                    }
                                    placeholder="Confirm password"
                                    placeholderTextColor="#666666"
                                    autoCorrect={false}
                                    style={[
                                        styles.textInput,
                                        {
                                            color: "black",
                                        },
                                    ]}
                                />
                                {"confirmPassword" in errors ? (
                                    <Text style={styles.errors}>
                                        {" "}
                                        {errors.confirmPassword}{" "}
                                    </Text>
                                ) : (
                                    <></>
                                )}
                            </View>
                            <TouchableOpacity
                                style={styles.commandButton}
                                onPress={onSubmit}
                            >
                                <Text style={styles.panelButtonTitle}>
                                    Update Password
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <></>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    commandButton: {
        width: 200,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#FF6347",
        alignItems: "center",
        marginTop: 50,
        marginBottom: 50,
        marginLeft: 80,
    },
    panel: {
        padding: 20,
        backgroundColor: "#FFFFFF",
        paddingTop: 20,
    },
    header: {
        backgroundColor: "#FFFFFF",
        shadowColor: "#333333",
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: "center",
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#00000040",
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: "gray",
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: "#9ed2a1",
        alignItems: "center",
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
    },
    action: {
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 0.01,
        borderBottomColor: "#696969",
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: "row",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#FF0000",
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        // borderBottomColor: "#696969",
        // borderBottomWidth:1
    },
    birthday: {
        color: "#696969",
        paddingLeft: 5,
    },
    errors: {
        color: "red",
    },
});
