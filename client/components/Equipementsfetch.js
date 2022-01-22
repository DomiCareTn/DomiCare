import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  Picker,
  Dimensions,
} from "react-native";

const Equipementsfetch = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedprice, setselectedprice] = useState("");
  const [selectedavailability, setselectedavailability] = useState(null);
  const [Equipements, setEquipements] = useState([]);
  const [myData, setmyData] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.11.203:3000/Equipements")
      .then((res) => {
        setEquipements(res.data);
        setmyData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const availability = (eve) => {
    var ava;
    if (eve === "Available") {
      ava = Equipements.filter((item) => item.availability === "Available");
      setEquipements(ava);
    } else if (eve === "Not Available") {
      ava = Equipements.filter((item) => item.availability === "Not Available");
      setEquipements(ava);
    } else {
      setEquipements(myData);
    }
  };

  const ascendingSort = (eve) => {
    var asc;
    if (eve === "Between 0 and 500") {
      asc = Equipements.filter((item) => {
        if (item.price < 500 && item.price > 0) {
          return item.price;
        }
      });
      setEquipements(asc);
    } else if (eve === "more then 500") {
      asc = Equipements.filter((item) => {
        if (item.price >= 500 && item.price <= 1000) {
          return item.price;
        }
      });
      setEquipements(asc);
    } else if (eve === "more then 1000") {
      asc = Equipements.filter((item) => {
        if (item.price > 1000) {
          return item.price;
        }
      });
      setEquipements(asc);
    } else if (eve === "") {
      setEquipements(myData);
    }
  };

  var filterData = (city) => {
    var FiltredData;
    if (city !== "") {
      FiltredData = Equipements.filter((item) => item.city === city);
      setEquipements(FiltredData);
    } else {
      setEquipements(myData);
    }
  };

  var apihandler = () => {
    const url = "http://192.168.11.203:3000/Equipements";
    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        setEquipements({ data: resJson });
      });
  };

  var filterData2 = (city) => {
    const FiltredData = Equipements.filter((item) => {
      if (city !== "") {
        return item.city === city;
      } else {
        console.log("im in");
        apihandler;
      }
    });
    setEquipements(FiltredData);
  };

  return (
    <View style={styles.container}>
      <View
        style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}
      >
        <View style={styles.cities}>
          <Picker
            selectedValue={selectedValue}
            style={{
              height: 30,
              width: 100,
              marginLeft: 15,
              borderRadius: 15,
              paddingLeft: 5,
              marginTop: 30,
            }}
            onValueChange={(cityValue, cityIndex) => {
              setSelectedValue(cityValue);
              filterData(cityValue);
            }}
          >
            <Picker.Item label="city" value="" />
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
        <View>
          <Picker
            selectedprice={selectedprice}
            style={{
              height: 30,
              width: 110,
              marginLeft: 10,
              borderRadius: 15,
              paddingLeft: 5,
              marginTop: 30,
            }}
            onValueChange={(priceValue, cityIndex) => {
              console.log(priceValue);
              setselectedprice(priceValue);
              ascendingSort(priceValue);
            }}
          >
            <Picker.Item label="price" value="" />
            <Picker.Item label="Less than 500" value="Between 0 and 500" />
            <Picker.Item label="Over 500" value="more then 500" />
            <Picker.Item label="Over 1000" value="more then 1000" />
          </Picker>
        </View>
        <View>
          <Picker
            selectedavailability={selectedavailability}
            style={{
              height: 30,
              width: 150,
              marginLeft: 5,
              borderRadius: 15,
              paddingLeft: 5,
              marginTop: 30,
            }}
            onValueChange={(AvailabilityValue, cityIndex) => {
              setselectedavailability(AvailabilityValue);
              availability(AvailabilityValue);
            }}
          >
            <Picker.Item label="Availability" value="" />
            <Picker.Item label="Available" value="Available" />
            <Picker.Item label="Not Available" value="Not Available" />
          </Picker>
        </View>
      </View>
      <ScrollView style={styles.sProvider}>
        {Equipements.map((item, key) => {
          return (
            <View key={key} style={styles.itemVue}>
              <Image style={styles.cardImage} source={{ uri: item.picture }} />
              <Text style={styles.titleStyle}>{item.name}</Text>
              <Text style={styles.categoryStyle}>
                Price : {item.price + " TND"}
              </Text>
              <Text style={styles.categoryStyle}>
                Quantity : {item.quantity}
              </Text>
              <Text style={styles.categoryStyle}>
                Description : {item.description}
              </Text>
              <Text style={styles.categoryStyle}>City : {item.city}</Text>
              <Text style={styles.categoryStyle}>
                Delivery : {item.delivery}
              </Text>
              <Text style={styles.categoryStyle}>
                Transaction Type : {item.transactionType}
              </Text>
              {item.availability === "Available" ? (
                <Text style={styles.categoryStyle}>Available</Text>
              ) : (
                <Text style={styles.categoryStyle}>Not Available</Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const devicewidth = Math.round(Dimensions.get("window").width);
const radius = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  cardImage: {
    width: devicewidth - 90,
    height: 180,
    borderTopLeftRadius: radius,
    borderTopRightRadius: 25,
    borderBottomRightRadius: radius,
    borderBottomLeftRadius: radius,
    opacity: 0.9,
    alignContent: "center",
    alignSelf: "center",
  },
  itemVue: {
    paddingTop: 15,
    marginTop: 25,
    width: devicewidth - 60,
    backgroundColor: "#F5F5F5",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,

    elevation: 30,

    height: 380,
    marginLeft: 10,
    borderRadius: radius,
  },
  titleStyle: {
    fontSize: 17,
    fontWeight: "700",
    alignContent: "center",
    alignSelf: "center",
  },
  categoryStyle: {
    fontWeight: "200",
    alignContent: "center",
    alignSelf: "center",
  },
  sProvider: {
    // marginHorizontal:10,
  },
});

export default Equipementsfetch;
