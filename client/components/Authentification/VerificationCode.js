import * as React from "react";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
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

function VerificationCode() {
    const navigation = useNavigation();
    const route = useRoute();

    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const validate = () => {
        let validation = true;
        let errors = {};
        if (formData.code === undefined) {
            errors.code = "code is required !";
            validation = false;
        }
        if (formData.code !== formData.Hash_code) {
            errors.code = "Wrong code !";
            validation = false;
        }
        setErrors(errors);
        return validation;
    };

    const onSubmit = () => {
        if (validate()) {
            surf();
            navigation.navigate("ResetPassword", {
                email: route.params.email,
            });
        } else {
            console.log("Validation Failed");
        }
    };

    const surf = () => {
        const fetchedEmail = route.params.email;
        axios
            .delete(
<<<<<<< HEAD
                `http://192.168.11.97:3000/auth/DeleteCodeVerification/${fetchedEmail}`
=======
                `http://192.168.1.5:3000/auth/DeleteCodeVerification/${fetchedEmail}`
>>>>>>> 5e38b5dba6c2204c1c7224e5a4902975e672f2e3
            )
            .catch((err) => console.log(err));
    };

    React.useEffect(() => {
        const fetchedEmail = route.params.email;
        axios
            .get(
<<<<<<< HEAD
                `http://192.168.11.97:3000/auth/FetchCodeVerification/${fetchedEmail}`
=======
                `http://192.168.1.5:3000/auth/FetchCodeVerification/${fetchedEmail}`
>>>>>>> 5e38b5dba6c2204c1c7224e5a4902975e672f2e3
            )
            .then((res) => setData({ ...formData, Hash_code: res.data.code }))
            .catch((err) => console.log(err));
    }, []);

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Box safeArea p="2" py="8" w="120%" maxW="300">
                    <Heading
                        size="md"
                        fontWeight="300"
                        color="coolGray.800"
                        _dark={{
                            color: "warmGray.50",
                        }}
                    >
                        Put your code here
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl isRequired isInvalid={"code" in errors}>
                            <Input
                                onChangeText={(value) =>
                                    setData({ ...formData, code: value })
                                }
                            />
                            {"code" in errors ? (
                                <FormControl.ErrorMessage>
                                    {errors.code}
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
                <VerificationCode />
            </Center>
        </NativeBaseProvider>
    );
}
