import React, { useState, useEffect } from "react";
import {
  PermissionsAndroid,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  View,
} from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "./Authentification/CredentialsContext.js";
import axios from "axios";
import { localhost } from "@env";

const EditEquipement = ({ navigation }) => {
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
  // console.log("userData:",userData);
  // console.log(userData.userData._id);

  useEffect(() => {
    console.log("test1 : ", userData.userData._id);
    axios
      .get(`http://192.168.11.203:3000/Equipements/${userData.userData._id}`) ///Equipements/${userData.userData._id}
      .then((res) => {
        var user = res.data;
        setData(res.data);
        setmyData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchData = () => {
    axios
      .get(`http://192.168.11.203:3000/Equipements/${userData.userData._id}`)
      .then((res) => {
        // console.log("equipement id",res);
        setData(res.data);
        console.log("res.data", res.data);
        setData(res.data);
        console.log("formData", formData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submit = () => {
    console.log("tesst :", formData._id);
    console.log("test formData :", formData[0]);
    axios
      .put(`http://192.168.11.203:3000/Equipements/update/${formData[0]._id}`, {
        formData,
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .then(() => alert("Equipement updated successfully!"))
      .then(() => homePage())
      .then(() => {
        fetchData();
      })
      .catch((error) => console.log(error));
  };
  var profile = () => {
    navigation.navigate("EquipementsProviderProfile");
  };
  var homePage = () => {
    navigation.navigate("My Equipements");
  };
  return (
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
          marginTop: 200,
          fontSize: 20,
          fontWeight: "500",
          marginLeft: 100,
        }}
      >
        Edit Your Equipement
      </Text>

      <Picker
        selectedtype={selectedtype}
        style={{
          height: 0,
          borderRadius: 15,
          width: 200,
          marginLeft: 105,
          margin: 6,
          shadowColor: "black",
          shadowRadius: 20,
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
        <Picker.Item label="select Transaction Type" value="" />
        <Picker.Item label="For Rent" value="For Rent" />
        <Picker.Item label="For Sale" value="For Sale" />
      </Picker>

      <Picker
        selecteddelivery={selecteddelivery}
        style={{
          height: 0,
          borderRadius: 15,
          width: 200,
          marginLeft: 105,
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
          height: 0,
          borderRadius: 15,
          width: 200,
          marginLeft: 105,
          margin: 6,
          shadowColor: "black",
          shadowRadius: 20,
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
          height: 0,
          borderRadius: 15,
          width: 200,
          marginLeft: 105,
          margin: 6,
          shadowColor: "black",
          shadowRadius: 20,
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
            height: 35,
            backgroundColor: "rgb(248,248,248)",
            // borderRadius: 15,
            width: 290,
            marginLeft: 15,
            justifyContent: "center",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            margin: 6,
            padding: 5,
          }}
          placeholder="Change The Equipement name"
          onChangeText={(value) => setData({ ...formData, name: value })}
          defaultValue={formData.name}
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
            height: 35,
            backgroundColor: "rgb(248,248,248)",
            // borderRadius: 15,
            width: 290,
            marginLeft: 15,
            justifyContent: "center",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            margin: 6,
            padding: 5,
          }}
          placeholder="Change The Equipement Price"
          onChangeText={(value) => setData({ ...formData, price: value })}
          defaultValue={formData.price}
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
            height: 35,
            backgroundColor: "rgb(248,248,248)",
            // borderRadius: 15,
            width: 290,
            marginLeft: 15,
            justifyContent: "center",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            margin: 6,
            padding: 5,
          }}
          placeholder="Change The Equipement Description"
          onChangeText={(value) => setData({ ...formData, description: value })}
          defaultValue={formData.description}
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
            height: 35,
            backgroundColor: "rgb(248,248,248)",
            borderColor: "black",
            shadowColor: "black",
            // borderRadius: 15,
            shadowRadius: 15,
            width: 290,
            marginLeft: 15,
            justifyContent: "center",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            margin: 6,
            padding: 5,
          }}
          placeholder="Change The Equipement Reference"
          onChangeText={(value) => setData({ ...formData, reference: value })}
          defaultValue={formData.reference}
        />
      </View>
      <View style={styles.SubmitButton}>
        <Button
          title="Submit"
          style={{
            height: 30,
            width: 100,
            marginLeft: 100,
            borderRadius: 15,
            marginBottom: 20,
            marginTop: 30,
          }}
          onPress={submit}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginRight: 20,
    marginBottom: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: "#696969",
    paddingBottom: 5,
  },
  SubmitButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
export default EditEquipement;
