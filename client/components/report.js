import React from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import {localhost} from "@env";
import {
  TextArea,
  
  Heading,
  Text,
  HStack,
  Stack,
  Button,
  Center,
  NativeBaseProvider,
} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './Authentification/CredentialsContext.js';
import { useNavigation } from "@react-navigation/native";

export default () => {
    const navigation = useNavigation()
    const {storedCredentials,setStoredCredentials}=React.useContext(CredentialsContext)
    const  userData = storedCredentials;
 
  const [reprtText, setData] = React.useState("");

  const post = () => {
    console.log(reprtText)
    Swal.fire({
        title: "report send with succes",
        showConfirmButton: false,
        timer: 1800,
        icon: 'success',
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      var reqS={reason:reprtText,reportedId:'61dd711fdcb65ed8ac17ba1d',reporterId:userData.userData._id}
      userData.userData.type=== undefined ? reqS['onModel']='ServiceSeeker' : reqS['onModel']='ServiceProvider' ;
    Axios.post("http://localhost:3000/reports", reqS)
      .then(() => {
       console.log(userData)
       setTimeout(() => {
        navigation.navigate("Home")
       }, 2000);  
      
      })
      .catch((err) => {
        console.log(err)
      });
     
  };
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <>
        
            
            <Stack p="4" space={6}>
              <Stack space={6}>
                <Center flex={1} px="3">
                  <Heading color="red.400" size="md" ml="-1">
                    report
                  </Heading>
                </Center>
                <Text
                  fontSize="xs"
                  _light={{
                    color: "red.400",
                  }}
                  _dark={{
                    color: "red.400",
                  }}
                  fontWeight="500"
                  ml="-0.5"
                  mt="-1"
                >
                  describe why you want to report this user
                </Text>
                <TextArea
                  h={20}
                  placeholder="Report describe here"
                  isInvalid
                  w={{
                    base: "100%",
                    md: "100%",
                  }}
                  onChangeText={(value) =>
                    setData(value)
                  }
                />
              </Stack>
              <Button onPress={post} size="sm" variant="outline" colorScheme="danger">
                Report
              </Button>
              <HStack
                alignItems="center"
                space={4}
                justifyContent="space-between"
              >
                <HStack alignItems="center"></HStack>
              </HStack>
            </Stack>
        
        </>
      </Center>
    </NativeBaseProvider>
  );
};
