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
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const Equipementsfetch = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");
    const [selectedAvailability, setSelectedAvailability] = useState(null);
    const [itemsList, setitemList] = useState([]);
    const [Equipements, setEquipements] = useState([]);
    const [myData, setmyData] = useState([]);

    useEffect(() => {
        axios
            .get("http://192.168.11.14:3000/Equipements")
            .then((res) => {
                console.log("res", res);
                console.log("res.data", res.data);
                setEquipements(res.data);
                setmyData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    //  var fetchData=()=>{
    //     fetch("http://localhost:3000/Equipements")
    //     .then(response=>{
    //       console.log("response",response,response.json());
    //      response.json()
    //     })
    //     .then(res=>{setEquipements(res)})
    //     .catch(error=>{
    //       console.log("error",error);
    //     })
    // }
    //  var filterData=(city)=> {

    //     const FiltredData = Equipements.filter((item) => {
    //       if(city!==""){

    //       return item.city === city
    //     }

    //     else{console.log("im in")
    //     setEquipements(myData)
    //     console.log(myData)
    //     return item.city}

    //     })
    //       }
    const availability = (eve) => {
        var ava;
        if (eve === "Available") {
            ava = Equipements.filter((item) => item.availability === true);
            setEquipements(ava);
        } else if (eve === "Not Available") {
            ava = Equipements.filter((item) => item.availability === false);
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
        const url = "http://192.168.11.14:3000/Equipements";
        fetch(url)
            .then((res) => res.json())
            .then((resJson) => {
                console.log("resJson", resJson);
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

    var cityOnChange = (e) => {
        console.log("e", e.target.value);
        setCity(e.target.value);
    };
    var search = () => {
        filterData();
    };

    return (
        <View style={styles.container}>
            <View style={styles.cities}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(cityValue, cityIndex) => {
                        setSelectedValue(cityValue);
                        filterData(cityValue);
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
            <View>
                <Picker
                    selectedPrice={selectedPrice}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(priceValue, cityIndex) => {
                        console.log(priceValue);
                        setSelectedPrice(priceValue);
                        ascendingSort(priceValue);
                    }}
                >
                    <Picker.Item label="select price" value="" />
                    <Picker.Item
                        label="Between 0 and 500"
                        value="Between 0 and 500"
                    />
                    <Picker.Item label="more then 500" value="more then 500" />
                    <Picker.Item
                        label="more then 1000"
                        value="more then 1000"
                    />
                </Picker>
                <Picker
                    selectedAvailability={selectedAvailability}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(AvailabilityValue, cityIndex) => {
                        console.log(
                            AvailabilityValue,
                            typeof AvailabilityValue
                        );
                        setSelectedAvailability(AvailabilityValue);
                        availability(AvailabilityValue);
                    }}
                >
                    <Picker.Item label="select availability" value="" />
                    <Picker.Item label="Available" value="Available" />
                    <Picker.Item label="Not Available" value="Not Available" />
                </Picker>
            </View>
            <View style={styles.sProvider}>
                <ScrollView>
                    {Equipements.map((item, key) => {
                        return (
                            <View key={key} style={styles.itemVue}>
                                <Image
                                    style={styles.cardImage}
                                    source={{ uri: item.picture }}
                                />
                                <Text>Equipement name : {item.name}</Text>
                                <Text>Price : {item.price}</Text>
                                <Text>Description : {item.description}</Text>
                                <Text>City : {item.city}</Text>
                                <Text>Delivery : {item.delivery}</Text>
                                {item.availability === true ? (
                                    <Text>Available</Text>
                                ) : (
                                    <Text>Not Available</Text>
                                )}
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    cardImage: {
        width: "50%",
        height: 100,
        resizeMode: "cover",
    },
    itemVue: {
        marginTop: 24,
        padding: 30,
        backgroundColor: "pink",
        fontSize: 24,
    },
});

export default Equipementsfetch;
