import * as React from "react";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IPAdress } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./CredentialsContext.js";
import { Ionicons } from "@expo/vector-icons";
import { storage } from "../../.firebase_config.js";
import * as ImagePicker from "expo-image-picker";

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
  Select,
  Spinner,
  CheckIcon,
  Icon,
  useDisclose,
  Modal,
} from "native-base";

function SPSignUpGoogle() {
  const navigation = useNavigation();
  const route = useRoute();

  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const { storedCredentials, setStoredCredentials } =
    React.useContext(CredentialsContext);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [file, setFile] = React.useState("");
  const [uploading, setUploading] = React.useState("None");
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
    if (formData.city === undefined) {
      errors.password = "city is required";
      validation = false;
    }
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
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    const picked = "file:///" + result.uri.split("file:/").join("");
    console.log("picked", picked);

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
        setUploading("loading");
      },
      (error) => {
        setUploading("none");
        console.log(error);
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading("done");
          setData({ ...formData, certificate: url });
        });
      }
    );
  };

  const post = () => {
    var obj = {
      email: route.params.email,
      firstName: route.params.firstName,
      lastName: route.params.lastName,
      picture: route.params.picture,
      phoneNumber: formData.phoneNumber,
      city: formData.city,
      certificate: formData.certificate,
    };
    axios
      .post(`http://192.168.11.203:3000/auth/SPSignUpGoogle`, { obj })
      .then((res) => {
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
      post();
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
            <Modal.Body>you will be redirected to the signup page</Modal.Body>
          </Modal.Content>
        </Modal>
        <Box safeArea p="2" py="8" w="120%" maxW="300">
          <VStack space={3} mt="5">
            <FormControl isRequired isInvalid={"phoneNumber" in errors}>
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
            <FormControl isRequired isInvalid={"city" in errors}>
              <FormControl.Label>Select City</FormControl.Label>
              <Select
                selectedValue={formData.city || "Tunis"}
                minWidth={200}
                accessibilityLabel="Select your City"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size={5} />,
                }}
                mt={1}
                onValueChange={(itemValue) => {
                  setData({ ...formData, city: itemValue });
                }}
              >
                <Select.Item label="Tunis" value="Tunis" />
                <Select.Item label="Ariana" value="Ariana" />
                <Select.Item label="Ben arous" value="Ben arous" />
                <Select.Item label="Manouba" value="Manouba" />
                <Select.Item label="Sousse" value="Sousse" />
                <Select.Item label="Sfax" value="Sfax" />
                <Select.Item label="Gabes" value="Gabes" />
                <Select.Item label="Medenine" value="Medenine" />
                <Select.Item label="Mahdia" value="Mahdia" />
                <Select.Item label="Beja" value="Beja" />
                <Select.Item label="Bizerte" value="Bizerte" />
                <Select.Item label="Gafsa" value="Gafsa" />
                <Select.Item label="Jendouba" value="Jendouba" />
                <Select.Item label="Kairouan" value="Kairouan" />
                <Select.Item label="Kasserine" value="Kasserine" />
                <Select.Item label="Kef" value="Kef" />
                <Select.Item label="Monastir" value="Monastir" />
                <Select.Item label="Nabeul" value="Nabeul" />
                <Select.Item label="Sidi Bouzid" value="Sidi Bouzid" />
                <Select.Item label="Siliana" value="Siliana" />
                <Select.Item label="Tataouine" value="Tataouine" />
                <Select.Item label="Tozeur" value="Tozeur" />
                <Select.Item label="Zaghouan" value="Zaghouan" />
                <Select.Item label="Kebili" value="Kebili" />
              </Select>

              <FormControl.ErrorMessage>{errors.city}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"certificate" in errors}>
              <FormControl.Label>Certificate</FormControl.Label>

              {uploading === "None" ? (
                <Button
                  onPress={pickImage}
                  colorScheme="teal"
                  leftIcon={
                    <Icon as={Ionicons} name="cloud-upload-outline" size="sm" />
                  }
                >
                  Upload
                </Button>
              ) : uploading === "loading" ? (
                <Spinner />
              ) : (
                <Button colorScheme="teal">Uploaded!</Button>
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
        <SPSignUpGoogle />
      </Center>
    </NativeBaseProvider>
  );
}
