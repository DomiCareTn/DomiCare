import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import CustomSwitch from "./CustomSwitch";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { LogBox } from "react-native";

const SIZES = {
  base: 10,
  width,
  height,
};

let exercises = [
  {
    title: "Home Care",
    image: require("../assets/categories/homeCare8.png"),
  },
  {
    title: "Medical Advices",
    image: require("../assets/categories/askForHelp2.png"),
  },

  {
    title: "Equipements",
    image: require("../assets/categories/equipements.png"),
  },
  {
    title: "Contact Us",
    image: require("../assets/categories/contactUs8.png"),
  },
];

const ListItem = ({ photo, fullName, city, price, onPress }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Image
          source={{ uri: photo }}
          style={{
            width: 55,
            height: 55,
            borderRadius: 10,
            marginRight: 8,
          }}
        />
        <View style={{ width: windowWidth - 220 }}>
          <Text
            style={{
              color: "#333",
              fontSize: 14,
              marginLeft: 10,
              fontWeight: "bold",
            }}
          >
            {fullName}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: "#333",
              //   fontFamily: 'Roboto-Medium',
              fontSize: 14,
              marginLeft: 10,

              textTransform: "uppercase",
            }}
          >
            {city}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: "#f39a6e",
          padding: 10,
          width: 100,
          borderRadius: 10,
          marginRight: 10,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 14,
          }}
        >
          request
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = () => {
  const [formData, setData] = React.useState([]);
  const [equipements, setEquipements] = React.useState([]);
  const [SPTab, setSPTab] = React.useState(1);
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

  React.useEffect(() => {
    axios
      .get(`http://192.168.11.203:3000/Users/ServiceProvider/Fetch/`)
      .then((res) => {
        const data = res.data;
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://192.168.11.203:3000/Equipements`)
      .then((result) => {
        const data = result.data;
        setEquipements(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSelectSwitch = (value) => {
    setSPTab(value);
  };

  const ExerciseItem = ({ exercise }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: "white",
          width: 0.5 * SIZES.width - 35,
          margin: 10,
          height: 200,
          borderRadius: 10,
          padding: 15,
          shadowColor: "#9e9898",
          elevation: 5,
        }}
      >
        <ImageBackground
          source={exercise.image}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            flex: 1,
          }}
        />
        <Text style={{ marginTop: 20, textAlign: "center", fontSize: 16 }}>
          {exercise.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar
        backgroundColor="#008080"
        barStyle="dark-content"
        animated={true}
      />
      <View
        style={{
          width: "100%",
          height: "25%",
          padding: 30,
          backgroundColor: "#008080",
          position: "relative",
        }}
      >
        <Image
          source={require("../assets/categories/domicare2.png")}
          style={{
            width: 300,
            height: 60,
            position: "absolute",
            top: 30,
            left: 50,
          }}
        />
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={exercises}
          style={{
            paddingHorizontal: 20,
            marginTop: -120,
          }}
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <ExerciseItem exercise={item} />}
        />
      </SafeAreaView>

      <View style={{ marginTop: 80, height: windowHeight }}>
        <View style={{ marginVertical: 20 }}>
          <CustomSwitch
            selectionMode={1}
            option1="Nurses"
            option2="Equipements"
            onSelectSwitch={onSelectSwitch}
          />
        </View>
        <ScrollView nestedScrollEnabled={true}>
          {SPTab == 1 &&
            formData.map((item) => (
              <ListItem
                key={item._id}
                photo={item.picture}
                fullName={item.firstName + " " + item.lastName}
                city={item.city}

                //   onPress={() =>
                //     navigation.navigate('SPDetails', {
                //       title: item.title,
                //       id: item.id,
                //     })
                //   }
              />
            ))}
          {SPTab == 2 &&
            equipements.map((equipements) => (
              <ListItem
                key={equipements._id}
                photo={equipements.picture}
                fullName={equipements.name}
                city={equipements.city}
                //   onPress={() =>
                //     navigation.navigate('EquipementDetails', {
                //       title: item.title,
                //       id: item.id,
                //     })
                //   }
              />
            ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
