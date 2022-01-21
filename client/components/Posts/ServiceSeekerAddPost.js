
import React, { useState} from "react";
import axios from 'axios';

import { View, StyleSheet,  Picker, } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../Authentification/CredentialsContext.js';
import { useNavigation } from "@react-navigation/native"
import { storage } from "../../.firebase_config.js";
import * as ImagePicker from "expo-image-picker";
import { FormControl,Icon,NativeBaseProvider,Center,Spinner,Input,Button  } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from 'react-native-element-textinput';
import CalendarPicker from 'react-native-calendar-picker';
const SeekerRequest = (props) => {
  const navigation = useNavigation()
  const {storedCredentials,setStoredCredentials}=React.useContext(CredentialsContext)
  const  userData = storedCredentials.userData;
  const [details, setText] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [file, setFile] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [uploading, setUploading] = React.useState("None");
  const[selectedValue, setValue]= React.useState("")
  const seekerId = userData._id 

  const post = () => {
   
    console.log("create a post");
    
    axios.post(`http://192.168.11.61:3000/Posts/CreateServiceSeekerPost`, {details,address,file,seekerId,selectedStartDate, selectedEndDate,selectedValue})
      .then(res => console.log(res)).catch(err => console.log(err))
    
  }
  const onSubmit = () => { 
    post()
    // simpleAlertHandler()
    navigation.navigate('ServiceSeekersPosts')
  }
  const onDateChange = (date, type) => {
    //function to handle the date change
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
    console.log("data",date)
    
  };
  
  const simpleAlertHandler = () => {
    alert('Your request has been sended');
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
    });

    const picked =  "file:///" + result.uri.split("file:/").join("");
   

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
                console.log('urlimage',url)
                setFile(url)
                setData({ ...formData, certificate: url })
                
            });
        }
    );
};

const persistLogin = (credentials) => {
    AsyncStorage.setItem("domicareCredentials", JSON.stringify(credentials))
        .then(() => {
            setStoredCredentials(credentials);
        })
        .catch((err) => {
            console.log(err);
        });
};

  return (
      < NativeBaseProvider>
        <Center flex={1} px="3">
    <View>
    
      <View >
        <Center>

        <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(cityValue, cityIndex) => {
          setValue(selectedValue)
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
          <TextInput
          value={address}
          style={styles.input2}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          // label="your address..."
          placeholder="your address..."
          placeholderTextColor="gray"
          // focusColor="blue"
          onChangeText={address => {
            setAddress(address);
          }}
        />
                <TextInput
          value={details}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          // label=" your request ..."
          placeholder=" your request ..."
          placeholderTextColor="gray"
          // focusColor="blue"
          onChangeText={text => {
            setText(text);
          }}
        />
        </Center>
      </View>
          <View>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={new Date(2018, 1, 1)}
          maxDate={new Date(2050, 6, 3)}
          weekdays={
            [
              'Mon', 
              'Tue', 
              'Wed', 
              'Thur', 
              'Fri', 
              'Sat', 
              'Sun'
            ]}
          months={[
            'January',
            'Febraury',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]}
          previousTitle="Previous"
          nextTitle="Next"
          todayBackgroundColor="#e6ffe6"
          selectedDayColor="#66ff33"
          selectedDayTextColor="#000000"
          scaleFactor={375}
          textStyle={{
            
            color: '#000000',
          }}
          onDateChange={onDateChange}
        />

  <FormControl isRequired isInvalid={"Prescription" in errors}>
                    <FormControl.Label>Prescription</FormControl.Label>
                                 
                    { (uploading==="None")? (
        <Button
        margin={5}
        onPress={pickImage}
        colorScheme="teal"
        leftIcon={
            <Icon
                as={Ionicons}
                name="cloud-upload-outline"
                size="sm"
            />
        }
    >
        Upload
    </Button>
    )

: (uploading === "loading") ?(
    (
        <Spinner />
    )
)
: (
    (
        <Button
        margin={5}
        colorScheme="teal"
        >
        Uploaded!
    </Button>
    )
)
}  
                    </FormControl>
        </View>
    <Button
   colorScheme="teal" margin={5} onPress={()=>onSubmit()}
   >
   Publish
</Button>
        </View>
        </Center>
      </NativeBaseProvider>
      
    
  );
};

export default SeekerRequest;
const styles = StyleSheet.create({
 
  input: {
    height:100,
    width:350,
    paddingHorizontal: 12,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "teal",
  },
  input2: {
    height:50,
    width:350,
    paddingHorizontal: 12,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "teal",
  },
  inputStyle: { fontSize: 16 },
  labelStyle: {
    fontSize: 14,
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
  },

  placeholderStyle: { fontSize: 16 },
  textErrorStyle: { fontSize: 16 },
  textStyle: {
    marginTop:10,
  },
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#ffffff',
    padding: 16,
  
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
});


