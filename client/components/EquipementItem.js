import React, { useState} from "react";
import axios from 'axios'
import {  useNavigation } from "@react-navigation/native";

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal,
    TextArea,
    TextInput,
    Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Picker } from "@react-native-picker/picker";

const EquipementItem = (props) => {
    const item = props.route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [rentDays, setRentDays] = useState(0);

    const [formData, setData] = React.useState({});
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView   showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{
                        px: "20px",
                        mb: "4",
                        minW: "80",
                    }}>
            <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.addPostTittle}>
                                        Rent Days
                                    </Text>
                           
                               
                               <Picker
                        selectedValue={rentDays}
                        style={{
                            height: 30,
                            width: 110,
                            marginLeft: 20,
                            borderRadius: 15,
                            paddingLeft: 5,
                            marginTop: 0,
                        }}
                        onValueChange={(rentDays) => {
                            setRentDays(rentDays);
                        }}
                    >
                        <Picker.Item label="choose.." value="" />
                        <Picker.Item
                            label="1"
                            value="1"
                        />
                            <Picker.Item
                            label="2"
                            value="2"
                        />
                               <Picker.Item
                            label="3"
                            value="3"
                        />
                               <Picker.Item
                            label="4"
                            value="4"
                        />
                               <Picker.Item
                            label="5"
                            value="5"
                        />
                               <Picker.Item
                            label="6"
                            value="6"
                        />
                               <Picker.Item
                            label="7"
                            value="7"
                        />
                   
                    </Picker>
                               
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-evenly",
                                            marginTop: 20,
                                            marginLeft: 0,
                                        }}
                                    >
                                        <Pressable
                                            style={[
                                                styles.button,
                                                styles.buttonClose,
                                                styles.cancelButton,
                                            ]}
                                            onPress={() =>
                                                setModalVisible(!modalVisible)
                                            }
                                        >
                                            <Text style={styles.textStyle}>
                                                Cancel
                                            </Text>
                                        </Pressable>
                                        <Pressable
                                            style={[
                                                styles.button,
                                                styles.buttonClose,
                                                styles.confirmButton,
                                            ]}
                                            onPress={()=>{   navigation.navigate('Paiment', {item , rentDays})
                                        }}
                                        >
                                            <Text style={styles.textStyle}>
                                                Confirm
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                <View style={{ alignItems: "center", marginHorizontal: 30 }}>
                    <Text style={styles.name}>{item.name}</Text>

                    <Image
                        style={styles.productImg}
                        source={{ uri: item.picture }}
                    />
                    <Text style={styles.reference}>
                        {"Ref : " + item.reference}
                    </Text>
                    <View style={{ flexDirection: "row", marginTop:10
}}>
                        <Icon
                            name="map-marker-radius"
                            color="black"
                            size={20}
                        />
                        <Text style={{color:'black'}}>{' ' +item.city}</Text>
                    </View>

                    <Text style={styles.price}>
                        {item.transactionType + " - " + item.price + " TD"}
                    </Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>

                <View style={styles.separator}></View>
                <View style={styles.addToCarContainer}>
                    {item.transactionType === 'For Sale' ? (  <TouchableOpacity
                        style={styles.shareButton}
                        onPress={() => {navigation.navigate("Paiment", {item})}}
                    >
                        <Text style={styles.shareButtonText}>Buy</Text>
                    </TouchableOpacity>): (  <TouchableOpacity
                        style={styles.shareButton}
                        onPress={() =>  setModalVisible(!modalVisible)
                        }
                    >
                        <Text style={styles.shareButtonText}>Continue</Text>
                    </TouchableOpacity>)}
                  
                </View>
            </ScrollView>
        </View>
    );
};
export default EquipementItem;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    productImg: {
        width: 300,
        height: 300,
        borderRadius: 30,
    },
    name: {
        marginBottom: 20,
        fontSize: 28,
        color: "#696969",
        fontWeight: "bold",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    addPostTittle: {
        fontWeight: "bold",
        marginBottom: 10,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },

    buttonClose: {
        width: 80,
    },
    cancelButton: {
        backgroundColor: "#f39a6e",
    },
    confirmButton: {
        backgroundColor: "#008080",
        marginLeft: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    reference: {
        fontSize: 18,
        color: "#696969",
    },
    price: {
        marginTop: 10,
        fontSize: 18,
        color: "green",
        fontWeight: "bold",
    },
    description: {
        textAlign: "center",
        marginTop: 10,
        color: "black",
    },
    star: {
        width: 40,
        height: 40,
    },
    btnColor: {
        height: 30,
        width: 30,
        borderRadius: 30,
        marginHorizontal: 3,
    },
    btnSize: {
        height: 40,
        width: 40,
        borderRadius: 40,
        borderColor: "#778899",
        borderWidth: 1,
        marginHorizontal: 3,
        backgroundColor: "white",

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    contentColors: {
        justifyContent: "center",
        marginHorizontal: 30,
        flexDirection: "row",
        marginTop: 20,
    },
    contentSize: {
        justifyContent: "center",
        marginHorizontal: 30,
        flexDirection: "row",
        marginTop: 20,
    },
    separator: {
        height: 2,
        backgroundColor: "#eeeeee",
        marginTop: 20,
        marginHorizontal: 30,
    },
    shareButton: {
        marginTop: 10,
        marginBottom: 30,

        height: 45,
        marginLeft: "auto",
        marginRight: "auto",
        width: 120,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: "#f39a6e",
    },
    shareButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    addToCarContainer: {
        marginHorizontal: 30,
    },
});
