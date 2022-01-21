import React ,{useState,useEffect} from 'react'
import { View, Text,TextInput,Button } from 'react-native'
import {Picker} from "@react-native-picker/picker"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './Authentification/CredentialsContext.js';
import axios from 'axios'


const EditEquipement = ({navigation}) => {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
  const [selectedtype, setSelectedtype] = useState("");
  const [selecteddelivery, setselecteddelivery] = useState("");
  const [selectedavailability, setselectedavailability] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [clicked,setClicked]=useState(false);
  const [clicked2,setClicked2]=useState(false);
  const [formData,setData] = React.useState({});
  const [myData,setmyData] = React.useState([]);
  const {storedCredentials,setStoredCredentials}=React.useContext(CredentialsContext)
  const  userData = storedCredentials;
  // console.log("userData:",userData);
  // console.log(userData.userData._id);

  useEffect(()=>{
    console.log('test1 : ', userData.userData._id)
    axios.get(`http://192.168.11.61:3000/Equipements/${userData.userData._id}`)   ///Equipements/${userData.userData._id}
    .then(res => {
      var user = res.data
      setData(res.data)
      setmyData(res.data)
     
  
    })
    .catch(err => {
        console.log(err);
    })
  }, []);

  const fetchData=()=>{
    axios.get(`http://192.168.11.61:3000/Equipements/${userData.userData._id}`)
    .then(res => {
      // console.log("equipement id",res);
      setData(res.data) 
      console.log("res.data",res.data);
      setData(res.data)
      console.log("formData",formData);
    })
    .catch(err => {
        console.log(err);
    })
  }
  const submit = () =>{
    console.log('tesst :', formData._id);
    console.log("test formData :",formData[0]);
    axios.put(`http://192.168.11.61:3000/Equipements/update/${formData[0]._id}`,{formData})
    .then((res)=>{
      console.log(res.data)
    setData(res.data)
    })
    .then(()=>alert("Equipement updated successfully!"))
    .then(()=>profile())
    .catch(error=>console.log(error))
  }
  var profile = () => {
    navigation.navigate("EquipementsProviderProfile")
  };
  return (
    <View>
       <Text>Edit Your Equipement</Text>
       <View>
       <Picker selectedtype={selectedtype}
        style={{ height: 50, width: 150 }}
        onValueChange={(TypeValue, TypeIndex) => {
          console.log(TypeValue);
          setData({...formData,transactionType:TypeValue,ownerId:userData.userData._id})
        }} >
     <Picker.Item label="select Transaction Type" value="" />
      <Picker.Item label="For Rent" value="For Rent" />
      <Picker.Item label="For Sale" value="For Sale" />
      </Picker>
      </View>
      <View>
      <Picker selecteddelivery={selecteddelivery}
        style={{ height: 50, width: 150 }}
        onValueChange={(DeliveryValue, DeliveryIndex) => {
          console.log(DeliveryValue);
          setData({...formData,delivery:DeliveryValue})
        }} >
     <Picker.Item label="select Delivery" value="" />
      <Picker.Item label="with delivery" value="with delivery" />
      <Picker.Item label="without delivery" value="without delivery" />
      </Picker>
      </View>
      <View>
      <Picker selectedavailability={selectedavailability}
        style={{ height: 50, width: 150 }}
        onValueChange={(AvailabilityValue, AvailabilityIndex) => {
          console.log(AvailabilityValue);
          setData({...formData,availability:AvailabilityValue})
        }} >
     <Picker.Item label="select availability" value="" />
      <Picker.Item label="Available" value="Available" />
      <Picker.Item label="Not Available" value="Not Available" />
      </Picker>
      </View>
      <View>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(cityValue, cityIndex) => {
          setData({...formData,city:cityValue})
        }}
      >
        <Picker.Item label="select city" value=""/>
      <Picker.Item label="Ariana" value="Ariana"/>
      <Picker.Item label="Ben Arous" value="Ben Arous"/>
      <Picker.Item label="Tunis" value="Tunis"/>
      <Picker.Item label="Sousse" value="Sousse"/>
      <Picker.Item label="Monastir" value="Monastir"/>
      <Picker.Item label="Sfax" value="Sfax"/>
      <Picker.Item label="Beja" value="Beja"/>
      <Picker.Item label="Benzart" value="Benzart"/>
      <Picker.Item label="Mahdia" value="Mahdia"/>
      <Picker.Item label="kairouan" value="kairouan"/>
      <Picker.Item label="Sidi Bouzid" value="Sidi Bouzid"/>
      <Picker.Item label="Zaghouane" value="Zaghouane"/>
      <Picker.Item label="Mednine" value="Mednine"/>
      <Picker.Item label="Gabes" value="Gabes"/>
      <Picker.Item label="Kebili" value="Kebili"/>
      <Picker.Item label="Gasserine" value="Gasserine"/>
      <Picker.Item label="Jendouba" value="Jendouba"/>
      <Picker.Item label="Kef" value="Kef"/>
      <Picker.Item label="Siliana" value="Siliana"/>
      <Picker.Item label="Tozeur" value="Tozeur"/>
      <Picker.Item label="Tataouine" value="Tataouine"/>
      <Picker.Item label="Manouba" value="Manouba"/>
      <Picker.Item label="Gafsa" value="Gafsa"/>
      <Picker.Item label="Nabeul" value="Nabeul"/>
    </Picker>
      </View>
      <View>
      <TextInput style={{height: 20,width:150,justifyContent: 'center',flexDirection: 'row',display: 'flex',alignItems: 'center'}}
        placeholder="Change The Equipement name"
        onChangeText={(value)=>setData({...formData,name:value})}
        defaultValue={formData.name} />
          <TextInput style={{height: 20,width:150,justifyContent: 'center',flexDirection: 'row',display: 'flex',alignItems: 'center'}}
        placeholder="Change The Equipement Price"
        onChangeText={(value)=>setData({...formData,price:value})}
        defaultValue={formData.price} />
          <TextInput style={{height: 20,width:150,justifyContent: 'center',flexDirection: 'row',display: 'flex',alignItems: 'center'}}
        placeholder="Change The Equipement Description"
        onChangeText={(value)=>setData({...formData,description:value})}
        defaultValue={formData.description} />
          <TextInput style={{height: 20,width:150,justifyContent: 'center',flexDirection: 'row',display: 'flex',alignItems: 'center'}}
        placeholder="Change The Equipement Reference"
        onChangeText={(value)=>setData({...formData,reference:value})}
        defaultValue={formData.reference} />
        </View>
        <Button onPress={submit} >Submit</Button>
    </View>
  )
}

export default EditEquipement
