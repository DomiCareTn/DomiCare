import * as React from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { IPAdress } from "@env";
import {
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    HStack,
    Center,
    NativeBaseProvider,
    Divider,
    useDisclose,
    Modal,
    Image,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./CredentialsContext.js";
import * as Google from "expo-google-app-auth";

function Login() {
    const navigation = useNavigation();
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const [googleSubmitting, setGoogleSubmitting] = React.useState(false);
    const { isOpen, onOpen, onClose } = useDisclose();
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);

    const persistLogin = (credentials) => {
        AsyncStorage.setItem("domicareCredentials", JSON.stringify(credentials))
            .then(() => {
                setStoredCredentials(credentials);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const validate = () => {
        let validation = true;
        let errors = {};
        if (formData.email === undefined) {
            errors.email = "email is required";
            validation = false;
        }
        if (formData.password === undefined) {
            errors.password = "Password is required";
            validation = false;
        }
        setErrors(errors);
        return validation;
    };
    const post = () => {
        axios
<<<<<<< HEAD
            .post(`http://192.168.11.97:3000/auth/Login`, { formData })
=======
            .post(`http://192.168.1.5:3000/auth/Login`, { formData })
>>>>>>> 5e38b5dba6c2204c1c7224e5a4902975e672f2e3
            .then((response) => {
                let errors = {};
                const data = response.data;
                if (response.data === "Your email and password do not match") {
                    errors["email"] = "Your email and password do not match !";
                    setErrors(errors);
                } else {
                    persistLogin({ userData: data });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleGoogleSignin = () => {
        const config = {
            iosClientId:
                "477279958073-g64kmtrrh5ut8hbv0ctbggiumiklpgid.apps.googleusercontent.com",
            androidClientId:
                "477279958073-ld24gig53t7i6lo9q4p42ga2ecsg6qvl.apps.googleusercontent.com",
            scopes: ["profile", "email"],
        };
        Google.logInAsync(config)
            .then((result) => {
                const { type, user } = result;
                if (type == "success") {
                    const email = user.email;
                    axios
<<<<<<< HEAD
                        .post(`http://192.168.11.97:3000/auth/GoogleLogin`, {
=======
                        .post(`http://192.168.1.5:3000/auth/GoogleLogin`, {
>>>>>>> 5e38b5dba6c2204c1c7224e5a4902975e672f2e3
                            email,
                        })
                        .then((response) => {
                            const data = response.data;
                            console.log("test google login :", data);
                            if (response.data === "you need to SignUp") {
                                onOpen();
                                setTimeout(() => {
                                    navigation.navigate("SignUpAs");
                                    onClose();
                                }, 2000);
                            } else {
                                persistLogin({ userData: data });
                            }
                        })
                        .catch((err) => console.log(err));
                } else {
                    console.log("Google signin was cancelled");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onSubmit = () => {
        validate() ? post() : console.log("Validation Failed");
    };

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Modal isOpen={isOpen} onClose={onClose}>
                    <Modal.Content>
                        <Modal.Header fontSize="4xl" fontWeight="bold">
                            user not registered!{" "}
                        </Modal.Header>
                        <Modal.Body>
                            you will be redirected to the signup page
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
                <Box safeArea p="2" py="8" w="120%" maxW="300">
                    <Image
                        source={require("../../assets/categories/logo_small.png")}
                        style={{
                            width: 300,
                            height: 60,
                            position: "absolute",
                            top: 20,
                            left: 0,
                        }}
                        alt="logo"
                    />
                    <Heading
                        marginTop={20}
                        size="lg"
                        fontWeight="600"
                        color="coolGray.800"
                        _dark={{
                            color: "warmGray.50",
                        }}
                    >
                        Welcome
                    </Heading>
                    <Heading
                        mt="1"
                        _dark={{
                            color: "warmGray.200",
                        }}
                        color="coolGray.600"
                        fontWeight="medium"
                        size="xs"
                    >
                        Sign in to continue!
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl isRequired isInvalid={"email" in errors}>
                            <FormControl.Label>Email </FormControl.Label>
                            <Input
                                onChangeText={(value) =>
                                    setData({ ...formData, email: value })
                                }
                            />
                            {"email" in errors ? (
                                <FormControl.ErrorMessage>
                                    {errors.email}
                                </FormControl.ErrorMessage>
                            ) : (
                                ""
                            )}
                        </FormControl>

                        <FormControl
                            isRequired
                            isInvalid={"password" in errors}
                        >
                            <FormControl.Label>Password</FormControl.Label>
                            <Input
                                onChangeText={(value) =>
                                    setData({ ...formData, password: value })
                                }
                                type="password"
                            />
                            {"password" in errors ? (
                                <FormControl.ErrorMessage>
                                    {errors.password}
                                </FormControl.ErrorMessage>
                            ) : (
                                ""
                            )}
                            <Link
                                _text={{
                                    fontSize: "xs",
                                    fontWeight: "500",
                                    color: "indigo.500",
                                }}
                                alignSelf="flex-end"
                                mt="1"
                                onPress={() =>
                                    navigation.navigate("ForgetPassword")
                                }
                            >
                                Forget Password?
                            </Link>
                        </FormControl>

                        <Box p={3} px="5" w="80%" maxW="300" ml={8}>
                            <Button
                                mt="2"
                                colorScheme="teal"
                                onPress={onSubmit}
                            >
                                Sign in
                            </Button>

                            <Divider my={3} />
                            <FontAwesome.Button
                                name="google"
                                backgroundColor="#f39a6e"
                                onPress={handleGoogleSignin}
                            >
                                Sign in with Google
                            </FontAwesome.Button>
                        </Box>

                        <HStack mt="6" justifyContent="center">
                            <Text
                                fontSize="sm"
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                            >
                                I'm a new user.{" "}
                            </Text>
                            <Link
                                _text={{
                                    color: "indigo.500",
                                    fontWeight: "medium",
                                    fontSize: "sm",
                                }}
                                onPress={() => navigation.navigate("SignUpAs")}
                            >
                                Sign Up
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
}

export default function () {
    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Login />
            </Center>
        </NativeBaseProvider>
    );
}
