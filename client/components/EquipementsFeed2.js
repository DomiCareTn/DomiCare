import { axios } from "axios";
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    FlatList,
    Button,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import items from "./Equipements.js";

const EquipementsFeed2 = () => {
    const [Equipements, setEquipements] = useState([]);
    useEffect(() => {
        axios
            .get("http://192.168.11.14:19006/Equipements")
            .then((res) => {
                console.log("res", res);
                setEquipements(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <View style={styles.container}>
            <View>
                <h1>{this.state.city}</h1>
                <select
                    onChange={(e) => this.filterData(e.target.value)}
                    size="1"
                >
                    <option value="" defaultValue>
                        City
                    </option>
                    <option>Ariana</option>
                    <option>Tunis</option>
                    <option>Ben arous</option>
                    <option>Sousse</option>
                    <option> Monastir</option>
                    <option>Sfax</option>
                    <option>Sidi bouzid</option>
                    <option>Mannouba</option>
                    <option> Jendouba</option>
                    <option>Kairouan </option>
                    <option> Tozeur</option>
                    <option>Tataouine</option>
                    <option>Zaghouan</option>
                    <option>Kef</option>
                    <option>Beja</option>
                    <option>Mahdia</option>
                    <option>Gafsa</option>
                    <option> Gasserine</option>
                    <option>Nabeul</option>
                    <option>Siliana</option>
                    <option>Kebili</option>
                    <option>Medenin</option>
                    <option> Gabes</option>
                    <option>Benzart</option>
                </select>
            </View>
            <ScrollView>
                {items.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Image
                            style={styles.cardImage}
                            source={{ uri: item.picture }}
                        />
                        <Text>Equipement name : {item.name}</Text>
                        <Text>Price : {item.price}</Text>
                        <Text>Description : {item.description}</Text>
                        <Text>City : {item.city}</Text>
                        <Text>Delivery : {item.delivery}</Text>
                    </View>
                ))}
            </ScrollView>
            <Button onPress={this.fetchData}>click me!</Button>
        </View>
    );
};

export default EquipementsFeed2;
