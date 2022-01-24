import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import {
    SafeAreaView,
    View,
    StyleSheet,
    ScrollView,
    Button,
} from "react-native";
import {
    IconButton,
    Icon,
    Box,
    Heading,
    AspectRatio,
    Image,
    Text,
    Center,
    HStack,
    Stack,
    NativeBaseProvider,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
export const Forum2 = (props) => {
    const navigation = useNavigation();

    const [subjects, setData] = useState([]);
    useEffect(async () => {
        try {
            const result = await axios.get(
                `http://192.168.11.137:3000/savepost/savepost`
            );
            // console.log(result.data)
            setData(result.data);
        } catch (err) {
            console.log(err);
        }
    }, []);
    return (
        <View>
            <SafeAreaView style={styles.container}>
                <ScrollView   showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
                px: "20px",
                mb: "4",
                minW: "80",
            }}>
                    {subjects.map((item, key) => {
                        return (
                            <Box
                                key={key}
                                maxW="2000"
                                rounded="lg"
                                overflow="hidden"
                                marginTop={30}
                                marginBottom={30}
                                borderColor="coolGray.200"
                                borderWidth="1"
                                _dark={{
                                    borderColor: "coolGray.600",
                                    backgroundColor: "gray.700",
                                }}
                                _web={{
                                    shadow: 2,
                                    borderWidth: 0,
                                }}
                                _light={{
                                    backgroundColor: "gray.50",
                                }}
                            >
                                <Box>
                                    {/* <AspectRatio w="100%" ratio={16 / 9}>
                                        <Image
                                            source={{
                                                uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                                            }}
                                            alt="image"
                                        />
                                    </AspectRatio> */}
                                
                                </Box>
                                <Stack p="4" space={3}>
                                    <Stack space={2}>
                                        <Heading size="md" ml="-1">
                                            {item.title}
                                        </Heading>
                                        <Text
                                            fontSize="xs"
                                            _light={{
                                                color: "#f39a6e",
                                            }}
                                            _dark={{
                                                color: "#f39a6e",
                                            }}
                                            fontWeight="500"
                                            ml="-0.5"
                                            mt="-1"
                                        >
                                            {item.owner.userName}
                                        </Text>
                                    </Stack>
                                    <Text fontWeight="400">{item.content}</Text>
                                    <HStack
                                     
                                    >
                                        <HStack alignItems="center">
                                            <Text
                                                color="coolGray.600"
                                                _dark={{
                                                    color: "warmGray.200",
                                                }}
                                                fontWeight="400"
                                            >
                                                {moment( item.createdAt).fromNow() +'    ' }
                                                {item.comments.length} Comments
                                                {'    ' + item.participants.length} Likes
                                            </Text>
                                       
                                        </HStack>
                                      
                                    </HStack>
                                    <View style={[{ width: "50%", marginLeft: 80, marginTop: 20}]}>
                                    <Button
                                            color="#008080"
                                           width="100"
                                                    title="Answer"
                                                    backgroundColor="white"
                                                    onPress={() =>
                                                        navigation.navigate(
                                                            "ForumPost",
                                                            item
                                                        )
                                                    }
                                                ></Button>
                                    </View>
                                 
                                </Stack>
                            </Box>
                        );
                    })}
                </ScrollView>
            </SafeAreaView>

            <IconButton
                onPress={() => navigation.navigate("AddBlog")}
                icon={<Icon as={MaterialIcons} name="post-add" />}
                borderRadius="full"
                _icon={{
                    color: "violet.400",
                    size: "md",
                }}
                _ios={{
                    _icon: {
                        size: "2xl",
                    },
                }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: "pink",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default () => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Forum2 />
            </Center>
        </NativeBaseProvider>
    );
};
