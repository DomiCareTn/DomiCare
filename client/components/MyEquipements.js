import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { CredentialsContext } from "./Authentification/CredentialsContext.js";
import { Avatar, Title, Paragraph, LeftContent } from "react-native-paper";
import Swal from "sweetalert2";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { Card, Button, Icon } from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { localhost } from "@env";

const myEquipements = ({ navigation }) => {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
  const [selectedtype, setSelectedtype] = useState("");
  const [selecteddelivery, setselecteddelivery] = useState("");
  const [selectedavailability, setselectedavailability] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [clicked, setClicked] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [formData, setData] = React.useState({});
  const [myData, setmyData] = React.useState([]);
  const { storedCredentials, setStoredCredentials } =
    React.useContext(CredentialsContext);
  const userData = storedCredentials;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    axios
      .get(`http://192.168.11.203:3000/Equipements/${userData.userData._id}`)
      .then((res) => {
        setmyData(res.data);
        console.log("res.data", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getEquip = () => {
    axios
      .get(`http://192.168.11.203:3000/Equipements/equip/${formData._id}`)
      .then((res) => {
        console.log("getEquip", res.data);
      })
      .then(() => EditEquip())
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchData = () => {
    axios
      .get(`http://192.168.11.203:3000/Equipements/${userData.userData._id}`)
      .then((res) => {
        setmyData(res.data);
        console.log("res.data", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveEquipement = () => {
    console.log("ownerId", formData.ownerId);
    console.log("formData", formData);
    axios
      .post(`http://192.168.11.203:3000/Equipements/saveEquip`, { formData })
      .then((response) => {
        console.log("saveEquipement", response);
        console.log("response.data", response.data);
      })
      .then(() => alert("Equipement added successfully!"))
      .then(() => home())
      .catch(() => {
        fetchData();
      })
      .catch((error) => console.log(error));
  };
  const myDelete = () => {
    console.log("ownerId", formData.ownerId);
    axios
      .delete(`http://192.168.11.203:3000/Equipements/${myData.ownerId}`)
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteItem = () => {
    myDelete();
    alert("Item Deleted Successfully!");
    fetchData();
  };

  const myAlert = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          myDelete();
          swalWithBootstrapButtons
            .fire("Deleted!", "Your file has been deleted.", "success")
            .then(() => home());
        } else if (
          /* Read more about handling dismissals below */

          result.dismiss ===
          Swal.DismissReason.cancel.then(() => home()).then(() => fetchData())
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };
  var EditEquip = () => {
    navigation.navigate("Edit Equipement");
  };
  var home = () => {
    navigation.navigate("Home");
  };
  return (
    <View>
      {clicked === false ? (
        <ScrollView>
          <Button
            icon={
              <Icon
                name="heartbeat"
                type="font-awesome"
                color="#f50"
                iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{
              borderRadius: 30,
              marginLeft: 80,
              marginRight: 0,
              marginTop: 70,
              width: 250,
              height: 50,
              justifyContent: "center",
              // position: "absolute",
              bottom: 20,
            }}
            title="Add Equipement"
            onPress={() => setClicked(true)}
          />
          {myData.map((item, key) => {
            return (
              <View style={styles.itemVue}key={key} >
                <View >
                  <View >
                    <Image
                      style={styles.cardImage}
                      source={{ uri: item.picture }}
                    />
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
                    <View style={styles.test}>
                      <Button
                        icon={
                          <Icon
                            name="closecircle"
                            color="#ffffff"
                            iconStyle={{ marginRight: 10 }}
                          />
                        }
                        style={
                          (styles.ButtonStyle,
                          { paddingBottom: 30, width: 120 })
                        }
                        title="Delete"
                        onPress={deleteItem}
                      />
                      <Button
                        icon={
                          <Icon
                            name="code"
                            color="#ffffff"
                            iconStyle={{ marginRight: 10 }}
                          />
                        }
                        style={
                          (styles.ButtonStyle,
                          { paddingBottom: 30, width: 110 })
                        }
                        title="Update"
                        onPress={getEquip}
                      />
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <SafeAreaView
          style={{
            display: "flex",
            justifyContent: "center",
            // borderRadius: 15,
            // backgroundColor: "#1edcc7",

            // margin: 30,
            // width: 300,
          }}
        >
          <Text
            style={{
              marginBottom: 15,
              marginTop: 170,
              fontSize: 20,
              fontWeight: "500",
              marginLeft: 110,
            }}
          >
            Add An Equipement
          </Text>
          <Picker
            selectedtype={selectedtype}
            style={{
              height: 30,
              borderRadius: 15,
              width: 200,
              marginLeft: 110,
              margin: 6,
            }}
            onValueChange={(TypeValue, TypeIndex) => {
              console.log(TypeValue);
              setData({
                ...formData,
                transactionType: TypeValue,
                ownerId: userData.userData._id,
              });
            }}
          >
            <Picker.Item label="Transaction Type" value="" />
            <Picker.Item label="For Rent" value="For Rent" />
            <Picker.Item label="For Sale" value="For Sale" />
          </Picker>

          <Picker
            selecteddelivery={selecteddelivery}
            style={{
              height: 0,
              borderRadius: 15,
              width: 200,
              marginLeft: 110,
              margin: 6,
              shadowColor: "black",
              shadowRadius: 20,
            }}
            onValueChange={(DeliveryValue, DeliveryIndex) => {
              console.log(DeliveryValue);
              setData({ ...formData, delivery: DeliveryValue });
            }}
          >
            <Picker.Item label="select Delivery" value="" />
            <Picker.Item label="with delivery" value="with delivery" />
            <Picker.Item label="without delivery" value="without delivery" />
          </Picker>
          <Picker
            selectedavailability={selectedavailability}
            style={{
              height: 30,
              borderRadius: 15,
              width: 200,
              marginLeft: 110,
              margin: 6,
            }}
            onValueChange={(AvailabilityValue, AvailabilityIndex) => {
              console.log(AvailabilityValue);
              setData({ ...formData, availability: AvailabilityValue });
            }}
          >
            <Picker.Item label="select availability" value="" />
            <Picker.Item label="Available" value="Available" />
            <Picker.Item label="Not Available" value="Not Available" />
          </Picker>
          <Picker
            selectedValue={selectedValue}
            style={{
              height: 30,
              borderRadius: 15,
              width: 200,
              marginLeft: 110,
              margin: 6,
            }}
            onValueChange={(cityValue, cityIndex) => {
              setData({ ...formData, city: cityValue });
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
          <View style={styles.action}>
            <FontAwesome
              name="medkit"
              color="#0aada8"
              size={20}
              style={{ marginTop: 10, marginLeft: 35 }}
            />
            <TextInput
              style={{
                height: 29,
                backgroundColor: "rgb(248,248,248)",
                // borderRadius: 15,
                width: 280,
                marginLeft: 15,
                justifyContent: "center",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                margin: 6,
                padding: 5,
              }}
              onChangeText={(value) => setData({ ...formData, name: value })}
              placeholder="name"
            />
          </View>
          <View style={styles.action}>
            <FontAwesome
              name="money"
              color="#0aada8"
              size={20}
              style={{ marginTop: 10, marginLeft: 35 }}
            />
            <TextInput
              style={{
                height: 29,
                backgroundColor: "rgb(248,248,248)",
                // borderRadius: 15,
                width: 280,
                marginLeft: 15,
                justifyContent: "center",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                margin: 6,
                padding: 5,
              }}
              onChangeText={(value) => setData({ ...formData, price: value })}
              placeholder="price"
            />
          </View>
          <View style={styles.action}>
            <FontAwesome
              name="money"
              color="#0aada8"
              size={20}
              style={{ marginTop: 10, marginLeft: 35 }}
            />
            <TextInput
              style={{
                height: 29,
                backgroundColor: "rgb(248,248,248)",
                // borderRadius: 15,
                width: 280,
                marginLeft: 15,
                justifyContent: "center",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                margin: 6,
                padding: 5,
              }}
              onChangeText={(value) =>
                setData({ ...formData, quantity: value })
              }
              placeholder="Quantity"
            />
          </View>
          <View style={styles.action}>
            <FontAwesome
              name="book"
              color="#0aada8"
              size={20}
              style={{ marginTop: 10, marginLeft: 35 }}
            />
            <TextInput
              style={{
                height: 29,
                backgroundColor: "rgb(248,248,248)",
                // borderRadius: 15,
                width: 280,
                marginLeft: 15,
                justifyContent: "center",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                margin: 6,
                padding: 5,
              }}
              onChangeText={(value) =>
                setData({ ...formData, description: value })
              }
              placeholder="description"
            />
          </View>
          <View style={styles.action}>
            <FontAwesome
              name="folder-open"
              color="#0aada8"
              size={20}
              style={{ marginTop: 10, marginLeft: 35 }}
            />
            <TextInput
              style={{
                height: 29,
                backgroundColor: "rgb(248,248,248)",
                // borderRadius: 15,
                width: 280,
                marginLeft: 15,
                justifyContent: "center",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                margin: 6,
                padding: 5,
              }}
              onChangeText={(value) =>
                setData({ ...formData, reference: value })
              }
              placeholder="reference"
            />
          </View>
          <View style={styles.action}>
            <FontAwesome
              name="image"
              color="#0aada8"
              size={20}
              style={{ marginTop: 10, marginLeft: 35 }}
            />
            <TextInput
              style={{
                height: 29,
                backgroundColor: "rgb(248,248,248)",
                // borderRadius: 15,
                width: 280,
                marginLeft: 15,
                justifyContent: "center",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                margin: 6,
                padding: 5,
              }}
              placeholder="add image"
              onChangeText={(value) => setData({ ...formData, picture: value })}
            />
          </View>
          <View style={styles.SubmitButton}>
            <Button
              color="#841584"
              backgroundColor="#03A9F4"
              title="Submit"
              style={{
                height: 30,
                width: 100,
                marginLeft: 120,
                borderRadius: 15,
                marginBottom: 20,
                marginTop: 10,
                color: "#008080",
                backgroundColor: "#03A9F4",
              }}
              onPress={saveEquipement}
            />
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

const devicewidth = Math.round(Dimensions.get("window").width);
const radius = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  cardImage: {
    width: devicewidth - 90,
    height: 220,
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
    marginTop: 15,
    width: devicewidth - 60,
    backgroundColor: "#F5F5F5",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    height: 460,
    borderRadius: radius,
    alignContent: "center",
    alignSelf:"center",
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
  ButtonStyle: {
    paddingBottom: 30,
    // backgroundColor:"black",
    // padding:0,
    // borderRadius: 30,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,

    height: 35,
    justifyContent: "space-between",
  },
  test: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    // flexWrap:"no-wrap",
  },
  SubmitButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  action: {
    flexDirection: "row",
    marginTop: 6,
    marginRight: 20,
    marginBottom: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: "#696969",
    paddingBottom: 5,
  }
});

export default myEquipements;
