import * as React from "react";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IPAdress } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./CredentialsContext.js";

import {
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Button,
    Center,
    NativeBaseProvider,
    InputGroup,
    InputLeftAddon,
    useDisclose,
    Modal,
} from "native-base";

function EPSignUpGoogle() {
    const navigation = useNavigation();
    const route = useRoute();

    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const { isOpen, onOpen, onClose } = useDisclose();
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
        if (formData.phoneNumber === undefined) {
            errors.phoneNumber = "Phone Number is required";
            validation = false;
        } else if (!typeof formData.phoneNumber === "number") {
            console.log(formData.phoneNumber);
            errors.phoneNumber = "Invalid Phone Number ";
            validation = false;
        }
        setErrors(errors);
        return validation;
    };

    const phoneNumber = () => {
        var obj = {
            email: route.params.email,
            firstName: route.params.firstName,
            lastName: route.params.lastName,
            userName: route.params.userName,
            picture: route.params.picture,
            phoneNumber: formData.phoneNumber,
        };
        axios
            .post(`http:/192.168.11.137:3000/auth/EPSignUpGoogle`, { obj })
            .then((res) => {
                console.log(res.data);
                if (res.data === "email already exists") {
                    onOpen();
                    setTimeout(() => {
                        navigation.navigate("SignUpAs");
                        onClose();
                    }, 2000);
                } else {
                    const data = res.data;
                    persistLogin({ userData: data });
                    navigation.navigate("Home");
                }
            })
            .catch((err) => console.log(err));
    };

    const onSubmit = () => {
        if (validate()) {
            phoneNumber();
        } else {
            console.log("Validation Failed");
        }
    };

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Modal isOpen={isOpen} onClose={onClose}>
                    <Modal.Content>
                        <Modal.Header fontSize="4xl" fontWeight="bold">
                            email already exists!{" "}
                        </Modal.Header>
                        <Modal.Body>
                            you will be redirected to the signup page
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
                <Box safeArea p="2" py="8" w="120%" maxW="300">
                    <Heading
                        size="md"
                        fontWeight="300"
                        color="coolGray.800"
                        _dark={{
                            color: "warmGray.50",
                        }}
                    >
                        Put your Phone Number here
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl
                            isRequired
                            isInvalid={"phoneNumber" in errors}
                        >
                            <FormControl.Label>Phone Number</FormControl.Label>
                            <InputGroup
                                w={{
                                    base: "100%",
                                    lg: "100%",
                                }}
                            >
                                <InputLeftAddon
                                    children={"+216"}
                                    w={{
                                        base: "20%",
                                        lg: "100%",
                                    }}
                                />
                                <Input
                                    w={{
                                        base: "80%",
                                        lg: "100%",
                                    }}
                                    onChangeText={(value) =>
                                        setData({
                                            ...formData,
                                            phoneNumber: value,
                                        })
                                    }
                                />
                            </InputGroup>

                            {"phoneNumber" in errors ? (
                                <FormControl.ErrorMessage>
                                    {errors.phoneNumber}
                                </FormControl.ErrorMessage>
                            ) : (
                                ""
                            )}
                        </FormControl>

                        <Button mt="2" colorScheme="teal" onPress={onSubmit}>
                            validate
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
                <EPSignUpGoogle />
            </Center>
        </NativeBaseProvider>
    );
}
