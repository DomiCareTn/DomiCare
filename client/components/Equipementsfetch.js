import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-paper";

const Equipementsfetch = () => {
    const navigation = useNavigation();
    const [city, setCity] = useState("");
    const [transaction, setTransaction] = useState("");
    const [Equipements, setEquipements] = useState([]);
    const [myData, setmyData] = useState([]);
    const [reset, setReset] = useState([]);

    useEffect(() => {
        axios
            .get("http://192.168.1.5:3000/Equipements")
            .then((res) => {
                console.log("res", res);
                console.log("res.data", res.data);
                setEquipements(res.data);
                setmyData(res.data);
                setReset(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    //  var fetchData=()=>{
    //     fetch("http://192.168.11.61:3000/Equipements")
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

    var filter = () => {
        var FiltredData;
        if (city !== "" && transaction === "") {
            FiltredData = myData.filter((item) => item.city === city);
            setEquipements(FiltredData);
            setmyData(reset);
        } else if (city === "" && transaction !== "") {
            FiltredData = myData.filter(
                (item) => item.transactionType === transaction
            );
            setEquipements(FiltredData);
            setmyData(reset);
        } else if (city !== "" && transaction !== "") {
            FiltredData = myData.filter(
                (item) =>
                    item.transactionType === transaction && item.city === city
            );
            setEquipements(FiltredData);
            setmyData(reset);
        } else {
            setEquipements(reset);
        }
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                }}
            >
                <View style={styles.cities}>
                    <Picker
                        selectedValue={city}
                        style={{
                            height: 30,
                            width: 110,
                            marginLeft: 30,
                            borderRadius: 15,
                            paddingLeft: 5,
                            marginTop: 0,
                        }}
                        onValueChange={(cityValue) => {
                            setCity(cityValue);
                        }}
                    >
                        <Picker.Item label="City" value="" />
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
                        selectedValue={transaction}
                        style={{
                            height: 30,
                            width: 110,
                            marginLeft: 20,
                            borderRadius: 15,
                            paddingLeft: 5,
                            marginTop: 0,
                        }}
                        onValueChange={(transactionType) => {
                            setTransaction(transactionType);
                        }}
                    >
                        <Picker.Item label="All" value="" />
                        <Picker.Item label="Sale" value="For Sale" />
                        <Picker.Item label="Rent" value="For Rent" />
                    </Picker>
                </View>
                <TouchableOpacity style={styles.shareButton} onPress={filter}>
                    <Text style={{ color: "white" }}>Filter</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                style={styles.list}
                contentContainerStyle={styles.listContainer}
                data={Equipements}
                horizontal={false}
                numColumns={2}
                keyExtractor={(item) => {
                    return item._id;
                }}
                ItemSeparatorComponent={() => {
                    return <View style={styles.separator} />;
                }}
                renderItem={(post) => {
                    const item = post.item;
                    return (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <View>
                                    <Text style={styles.title}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.info}>
                                        {item.transactionType +
                                            " - " +
                                            item.city}
                                    </Text>
                                </View>
                            </View>

                            <Image
                                style={styles.cardImage}
                                source={{ uri: item.picture }}
                            />

                            <View style={styles.cardFooter}>
                                <View style={styles.socialBarContainer}>
                                    <View style={styles.socialBarSection}>
                                        <TouchableOpacity
                                            style={styles.socialBarButton}
                                            onPress={() =>
                                                navigation.navigate(
                                                    "Equipement",
                                                    item
                                                )
                                            }
                                        >
                                            <Image
                                                style={styles.icon}
                                                source={{
                                                    uri: "https://img.icons8.com/nolan/96/3498db/add-shopping-cart.png",
                                                }}
                                            />
                                            {item.transactionType === 'For Rent' ? (
                                                    <Text
                                                    style={[
                                                        styles.socialBarLabel,
                                                        styles.buyNow,
                                                    ]}
                                                >
                                                    Rent Now
                                                </Text>
                                            ): (
                                                <Text
                                                style={[
                                                    styles.socialBarLabel,
                                                    styles.buyNow,
                                                ]}
                                            >
                                                Buy Now
                                            </Text>
                                            )}
                                         
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.socialBarSection}>
                                        <Text style={styles.price}>
                                            {item.price + " TD"}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default Equipementsfetch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    list: {
        marginTop: 30,
        paddingHorizontal: 5,
        backgroundColor: "#E6E6E6",
    },
    listContainer: {
        alignItems: "center",
    },
    separator: {
        marginTop: 10,
    },
    shareButton: {
        height: 30,
        width: 80,
        marginTop: 10,
        marginLeft: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#f39a6e",
    },
    /******** card **************/
    card: {
        shadowColor: "#00000021",
        shadowOffset: {
            width: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
        backgroundColor: "white",
        flexBasis: "47%",
        marginHorizontal: 5,
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    cardImage: {
        flex: 1,
        height: 150,
        width: null,
    },
    /******** card components **************/
    title: {
        fontSize: 16,
        flex: 1,
    },
    info: {
        fontSize: 12,
        color: "#008080",
        marginTop: 5,
    },
    price: {
        fontSize: 14,
        color: "#f39a6e",
        marginTop: 5,
        marginLeft: 15,
    },
    buyNow: {
        color: "#008080",
        marginTop: 5,
    },
    icon: {
        width: 25,
        height: 25,
    },
    /******** social bar ******************/
    socialBarContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
    },
    socialBarSection: {
        justifyContent: "center",
        flexDirection: "row",
        flex: 1,
    },
    socialBarlabel: {
        marginLeft: 8,
        alignSelf: "flex-end",
        justifyContent: "center",
    },
    socialBarButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
