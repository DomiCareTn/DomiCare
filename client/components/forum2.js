import React, { useState, useEffect } from "react";
import axios from "axios";
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
      const result = await axios(
        `http://192.168.11.203:3000/savepost/savepost`
      );
      setData(result.data);
      console.log("first", result.data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  console.log("sub", subjects);
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {subjects.map((item, key) => {
            return (
              <Box
                key={key}
                maxW="2000"
                rounded="lg"
                overflow="hidden"
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
                  <AspectRatio w="100%" ratio={16 / 9}>
                    <Image
                      source={{
                        uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                      }}
                      alt="image"
                    />
                  </AspectRatio>
                  <Center
                    bg="violet.500"
                    _dark={{
                      bg: "violet.400",
                    }}
                    _text={{
                      color: "warmGray.50",
                      fontWeight: "700",
                      fontSize: "xs",
                    }}
                    position="absolute"
                    bottom="0"
                    px="3"
                    py="1.5"
                  >
                    PHOTOS
                  </Center>
                </Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1">
                      {item.title}
                    </Heading>
                    <Text
                      fontSize="xs"
                      _light={{
                        color: "violet.500",
                      }}
                      _dark={{
                        color: "violet.400",
                      }}
                      fontWeight="500"
                      ml="-0.5"
                      mt="-1"
                    >
                      {item.owner}
                    </Text>
                  </Stack>
                  <Text fontWeight="400">{item.content}</Text>
                  <HStack
                    alignItems="center"
                    space={4}
                    justifyContent="space-between"
                  >
                    <HStack alignItems="center">
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                        fontWeight="400"
                      >
                        {item.createdAt}
                        {item.numberOfComments} Comments
                        {item.participants.length} Likes
                        <Button
                          title="continue reading"
                          backgroundColor="white"
                          onPress={() => navigation.navigate("ForumPost", item)}
                        ></Button>
                      </Text>
                    </HStack>
                  </HStack>
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
