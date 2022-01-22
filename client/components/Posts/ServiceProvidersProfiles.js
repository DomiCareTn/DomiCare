import React, { useState, useEffect } from "react";
import { localhost } from "@env";
import {
  View,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
  Picker,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Card, Icon } from "react-native-elements";
import { Rating, AirbnbRating } from "react-native-ratings";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const serviceProvidersList = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedgender, setSelectedGender] = useState("");
  const [ServiceProviders, setSProviders] = useState([]);
  const [Data, setData] = useState([]);

  useEffect(async () => {
    try {
      const result = await axios.get(
        `http://192.168.11.203:3000/Posts/serviceProvidersList`
      );
      setSProviders(result.data);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };

  const filterData = (city, gender) => {
    let FiltredData;
    if (city !== "" && gender !== "") {
      FiltredData = ServiceProviders.filter((item) => {
        return item.city === city && item.gender === gender;
      });
      setSProviders(FiltredData);
    } else if (gender === "" && city !== "") {
      FiltredData = ServiceProviders.filter((item) => {
        return item.city === city;
      });
      setSProviders(FiltredData);
    } else if (city === "" && gender !== "") {
      FiltredData = ServiceProviders.filter((item) => {
        return item.gender === gender;
      });
      setSProviders(FiltredData);
    } else {
      setSProviders(Data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cities}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(cityValue, cityIndex) => {
            setSelectedValue(cityValue);
            filterData(cityValue, selectedgender);
          }}
        >
          <Picker.Item label="select city" value="" />
          <Picker.Item label="Ariana" value="Ariana" />
          <Picker.Item label="Ben Arous" value="Ben Arous" />
          <Picker.Item label="Tunis" value="Tunis" />
          <Picker.Item label="Sousse" value="Sousse" />
          <Picker.Item label="Monastir" value="Monastir" />
          <Picker.Item label="Sfax" value="Sfax" />
          <Picker.Item label="Beja" value="Beja" />
          <Picker.Item label="Benzart" value="Benzart" />
          <Picker.Item label="Mahdia" value="Mahdia" />
          <Picker.Item label="kairouan" value="kairouan" />
          <Picker.Item label="Sidi Bouzid" value="Sidi Bouzid" />
          <Picker.Item label="Zaghouane" value="Zaghouane" />
          <Picker.Item label="Mednine" value="Mednine" />
          <Picker.Item label="Gabes" value="Gabes" />
          <Picker.Item label="Kebili" value="Kebili" />
          <Picker.Item label="Gasserine" value="Gasserine" />
          <Picker.Item label="Jendouba" value="Jendouba" />
          <Picker.Item label="Kef" value="Kef" />
          <Picker.Item label="Siliana" value="Siliana" />
          <Picker.Item label="Tozeur" value="Tozeur" />
          <Picker.Item label="Tataouine" value="Tataouine" />
          <Picker.Item label="Manouba" value="Manouba" />
          <Picker.Item label="Gafsa" value="Gafsa" />
          <Picker.Item label="Nabeul" value="Nabeul" />
        </Picker>
      </View>

      <View style={styles.gender}>
        <Picker
          selectedgender={selectedgender}
          style={{ height: 50, width: 150 }}
          onValueChange={(genderValue, genderIndex) => {
            setSelectedGender(genderValue);
            filterData(selectedValue, genderValue);
          }}
        >
          <Picker.Item label="select gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <ScrollView>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Title>Service Providers</Card.Title>
            <Card.Divider />
            {ServiceProviders.map((u, i) => {
              return (
                <View key={i} style={styles.user}>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{
                      uri: "https://i.pinimg.com/originals/6e/ff/53/6eff53e82b80fb5dd7614d5ba054f144.jpg",
                    }}
                  />
                  <Text style={styles.name}> firstName : {u.firstName}</Text>
                  <Text style={styles.name}> lastName : {u.lastName}</Text>
                  <Text style={styles.name}> Position : {u.speciality}</Text>
                  <Text style={styles.name}> City : {u.city}</Text>
                  <Text style={styles.name}> Gender : {u.gender}</Text>
                  <Text style={styles.name}> Services : {u.posts}</Text>
                  <AirbnbRating style={styles.airbnbRating} />
                  <Button
                    title="Ask for service"
                    onPress={() =>
                      navigation.navigate("ServiceSeekerSendARequest", u)
                    }
                  />
                </View>
              );
            })}
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },

  sProvider: {
    flex: 1,
    paddingTop: 20,
  },
  user: {
    flexDirection: "column",
    marginBottom: 50,
  },

  image: {
    borderRadius: 100,
    width: 90,
    height: 90,
    marginRight: 10,
  },
  airbnbRating: {
    marginRight: 20,
  },
  name: {
    fontSize: 20,
    marginTop: 5,
    // fontWeight: "bold",

    fontStyle: "italic",
  },
});
export default serviceProvidersList;
