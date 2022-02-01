import React from "react";
import axios from "axios";
import moment from "moment";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    Button
} from "react-native";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CredentialsContext } from "../components/Authentification/CredentialsContext.js";


export const ServiceProviderInfo = (props) => {
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;
    const [formData, setData] = React.useState({});
    const [email, setemail] = React.useState('');
    const [firstName, setfirstName] = React.useState('');
    const [lastName, setlastName] = React.useState('');
    const [gender, setgender] = React.useState('');
    const [phoneNumber, setphoneNumber] = React.useState('');
    const [picture, setpicture] = React.useState('');
    const [city, setcity]=React.useState('');
  console.log("props",props.route.params.not);
    React.useEffect(() => {
        axios
            .get(
                `http://192.168.11.98:3000/Users/ServiceProvider/Fetch/${props.route.params.not.sender._id}`
            )
            .then((res) => {
                const Data = res.data;
                console.log("res.data", Data);
                setData(Data);
              
                setemail(Data.email)
                setlastName(Data.lastName)
                setfirstName(Data.firstName)
                setgender(Data.gender)
                setphoneNumber(Data.phoneNumber)
                setpicture(Data.picture)
                setcity(Data.city)

                console.log("test", formData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const AcceptOffer = async () => {
        try {
            await axios.put(
                `http://192.168.11.98:3000/Transactions/Acceptarequest/${props.route.params.reqoffId}`,
               
            );
        } catch (err) {
            console.log(err);
        }
    };
    const RejectOffer = async () => {
        try {
            await axios.put(
                `http://192.168.11.98:3000/Transactions/deleterequest/${props.route.params.reqoffId}`,{
                    type:"offer", content:"Your offer sent to "+userData.firstName+" "+userData.lastName+" has been rejected",
                    provider_id:props.route.params.not.sender._id,
                    sender:userData,type:'rejected offer'
                },

               
            );
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
                px: "20px",
                mb: "4",
                minW: "80",
            }}
        >
            <View style={styles.container}>
                <View style={styles.header}></View>
                <Image
                    style={styles.avatar}
                    source={{
                        uri: picture,
                    }}
                />
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>
                            {lastName + " " + firstName}
                        </Text>
                    </View>

                    <View style={styles.userInfoSection}>
                        <View style={styles.row}>
                            <Icon
                                name="map-marker-radius"
                                color="#777777"
                                size={20}
                            />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>
                                { city
                                    ?  city
                                    : "N/A"}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Icon name="phone" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>
                                {phoneNumber}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Icon name="email" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>
                                {email}
                            </Text>
                        </View>

                    </View>
                    {props.route.params.not.type==='offer'?
                    <View style={{ flexDirection: "row" , justifyContent: 'space-evenly' }}>
                    <Button style={{ width:10}}
                        onPress={() => {
                            AcceptOffer();
                        }}
                       
                        title="     Accept     "
                        color="teal"
                        accessibilityLabel="Learn more about this purple button"
                    />
                    <Button style={{ width:50 }} 
                        onPress={() => {
                            RejectOffer();
                        }}
                       
                        title="     Decline     "
                        color="#f39a6e"
                        accessibilityLabel="Learn more about this purple button"
                    />
                    </View>
                    :null
                }

                </View>
            </View>
        </ScrollView>
    );
};
export const ServiceSeekerInfo = (props) => {
    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;
    const _id=props.route.params.not.reqoffId
    console.log("id",_id);

    const [details, setdetails] = React.useState('');
    const [email, setemail] = React.useState('');
    const [firstName, setfirstName] = React.useState('');
    const [lastName, setlastName] = React.useState('');
    const [gender, setgender] = React.useState('');
    const [phoneNumber, setphoneNumber] = React.useState('');
    const [picture, setpicture] = React.useState('');
    const [selectedEndDate, setselectedEndDate] = React.useState('');
    const [selectedStartDate, setselectedStartDate] = React.useState('');
    const navigation = useNavigation();
    React.useEffect(async() => {
        
       
          const data= await axios
            .get(
                `http://192.168.11.98:3000/Transactions/findrequest/${_id}`
            )
            
             
                setdetails(data.data.details);
                setemail(data.data.seekerId.email)
                setlastName(data.data.seekerId.lastName)
                setfirstName(data.data.seekerId.firstName)
                setgender(data.data.seekerId.gender)
                setphoneNumber(data.data.seekerId.phoneNumber)
                setpicture(data.data.seekerId.picture)
                setselectedEndDate(data.data.selectedEndDate)
                setselectedStartDate(data.data.selectedStartDate)        
    }, []);
    const AcceptRequest = async () => {
        
        try {
            await axios.put(
                `http://192.168.11.98:3000/Transactions/acceptrequest/${_id}`,{id:props.route.params.not._id,sender:props.route.params.not.sender,content:'your request to '+userData.firstName+" "+ userData.lastName+'has been accepted',Sender:userData}
                
            );
            navigation.navigate("Received Requests")
        } catch (err) {
            console.log(err);
        }
    };
    const DeclineRequest = async () => {
        try {
            console.log("cancel", props.route.params.not);
            await axios.put(
                `http://192.168.11.98:3000/Transactions/deleterequest/${_id}`,{id:props.route.params.not._id,sender:props.route.params.not.sender,content:'your request to '+userData.firstName+" "+ userData.lastName+'has been rejected',Sender:userData}
              
            );
            navigation.navigate("Received Requests")
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{
                px: "20px",
                mb: "4",
                minW: "80",
            }}
        >
            <View style={styles.container}>
                <View style={styles.header}></View>
                <Image
                    style={styles.avatar}
                    source=
                       {{ uri:picture}}
                    
                />
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>
                            {lastName + " " + firstName}
                        </Text>
                    </View>

                    <View style={styles.userInfoSection}>
                        <View style={styles.row}>
                            <Icon
                                name="map-marker-radius"
                                color="#777777"
                                size={20}
                            />
                            {/* <Text style={{ color: "#777777", marginLeft: 20 }}>
                                {adress && city
                                    ? adress + " - " + city
                                    : "N/A"}
                            </Text> */}
                        </View>
                        <View style={styles.row}>
                            <Icon name="phone" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>
                                {phoneNumber}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Icon name="email" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>
                                {email}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Icon
                                name="gender-male-female-variant"
                                color="#777777"
                                size={20}
                            />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>
                                {gender ? gender : "N/A"}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ color: "#777777", marginLeft: 0 }}>Details:</Text>
                            <Text style={{ color: "#777777", marginLeft: 20 }}>
                                {details ? details : "N/A"}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ color: "#777777", marginLeft: 0 }}>Start Date:</Text>
                            <Text style={{ color: "#777777", marginLeft: 20 }}>
                                {selectedStartDate.slice(0,10)}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ color: "#777777", marginLeft: 0 }}>End Date:  </Text>
                            <Text style={{ color: "#777777", marginLeft: 20 }}>
                                {selectedEndDate.slice(0,10)}
                            </Text>
                        </View>
                        
                        <View style={{ flexDirection: "row" , justifyContent: 'space-evenly' }}>
                                <Button style={{ width:10}}
                                    onPress={() => {
                                        AcceptRequest();
                                    }}
                                   
                                    title="     Accept     "
                                    color="teal"
                                    accessibilityLabel="Learn more about this purple button"
                                />
                                <Button style={{ width:50 }} 
                                    onPress={() => {
                                        DeclineRequest();
                                    }}
                                   
                                    title="     Decline     "
                                    color="#f39a6e"
                                    accessibilityLabel="Learn more about this purple button"
                                />
                                </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginTop: 30,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: "500",
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: "#dddddd",
        borderBottomWidth: 1,
        borderTopColor: "#dddddd",
        borderTopWidth: 1,
        flexDirection: "row",
        height: 100,
    },
    infoBox: {
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: "#777777",
        marginLeft: 20,
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 26,
    },

    header: {
        backgroundColor: "#008080",
        height: 130,
    },
    avatar: {
        width: 180,
        height: 180,
        borderRadius: 113,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: "center",
        position: "absolute",
        marginTop: 30,
    },

    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: "center",
        padding: 30,
    },
    name: {
        marginTop: 20,
        fontSize: 28,
        color: "#696969",
        fontWeight: "600",
    },
});
