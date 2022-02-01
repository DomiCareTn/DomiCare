import * as React from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { IPAdress } from "@env";
import {
    Box,
    Heading,
    VStack,
    FormControl,
    Input,
    Button,
    Center,
    NativeBaseProvider,
} from "native-base";

function ResetPassword() {
    const navigation = useNavigation();
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const validate = () => {
        let validation = true;
        let errors = {};
        if (formData.email === undefined) {
            errors.email = "email is required";
            validation = false;
        }
        setErrors(errors);
        return validation;
    };

    const post = () => {
        axios
<<<<<<< HEAD
            .post(`http://192.168.11.98:3000/auth/ForgetPassword`, {
=======
<<<<<<< HEAD
            .post(`http://192.168.11.97:3000/auth/ForgetPassword`, {
=======
            .post(`http://192.168.1.5:3000/auth/ForgetPassword`, {
>>>>>>> 5e38b5dba6c2204c1c7224e5a4902975e672f2e3
>>>>>>> 6ca2dafaaaed2ea509f8b9446400a34a60f607c8
                formData,
            })
            .then((response) => {
                let errors = {};
                let data = response.data;
                if (data === "Email address doesn't exist") {
                    errors.email = "Email address doesn't exist !";
                    setErrors(errors);
                } else {
                    navigation.navigate("VerificationCode", {
                        email: formData.email,
                    });
                }
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
                        <FormControl isRequired isInvalid={"email" in errors}>
                            <FormControl.Label>Email</FormControl.Label>
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
