import * as React from "react";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./CredentialsContext.js";
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
} from "native-base";

function ResetPassword() {
    const navigation = useNavigation();
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const route = useRoute();
    const email = route.params.email;

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
        let passwordValid =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const expression =
            /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        let errors = {};
        if (formData.password === undefined) {
            errors.password = "Password is required";
            validation = false;
        } else if (
            formData.password !== "undefined" &&
            formData.confirmPassword !== "undefined"
        ) {
            if (!passwordValid.test(String(formData.password))) {
                errors.password =
                    "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character";
                validation = false;
            } else if (
                passwordValid.test(String(formData.password)) &&
                formData.password != formData.confirmPassword
            ) {
                validation = false;
                errors["password"] = "Passwords don't match.";
            }
        }
        setErrors(errors);
        return validation;
    };

    const post = () => {
        const pass = formData.password;
        axios
            .post(`http://192.168.11.137:3000/auth/ResetPassword`, {
                pass,
                email,
            })
            .then((response) => {
                const data = response.data;
                persistLogin({ userData: data });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onSubmit = () => {
        validate() ? post() : console.log("Validation Failed");
    };

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Box safeArea p="2" py="8" w="120%" maxW="300">
                    <Heading
                        size="lg"
                        fontWeight="600"
                        color="coolGray.800"
                        _dark={{
                            color: "warmGray.50",
                        }}
                    >
                        Password Reset
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl
                            isRequired
                            isInvalid={"password" in errors}
                        >
                            <FormControl.Label>Password</FormControl.Label>
                            <Input
                                type="password"
                                onChangeText={(value) =>
                                    setData({ ...formData, password: value })
                                }
                            />

                            {"password" in errors ? (
                                <FormControl.ErrorMessage>
                                    {errors.password}
                                </FormControl.ErrorMessage>
                            ) : (
                                <FormControl.HelperText
                                    _text={{ fontSize: "xs" }}
                                >
                                    Must Contain 8 Characters, One Uppercase,
                                    One Lowercase, One Number and one special
                                    case Character
                                </FormControl.HelperText>
                            )}
                        </FormControl>

                        <FormControl
                            isRequired
                            isInvalid={"password" in errors}
                        >
                            <FormControl.Label>
                                Confirm Password
                            </FormControl.Label>
                            <Input
                                type="password"
                                onChangeText={(value) =>
                                    setData({
                                        ...formData,
                                        confirmPassword: value,
                                    })
                                }
                            />
                            {"password" in errors ? (
                                <FormControl.ErrorMessage>
                                    {errors.password}
                                </FormControl.ErrorMessage>
                            ) : (
                                ""
                            )}
                        </FormControl>

                        <Button mt="2" colorScheme="teal" onPress={onSubmit}>
                            Reset my Password
                        </Button>
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
                <ResetPassword />
            </Center>
        </NativeBaseProvider>
    );
}
