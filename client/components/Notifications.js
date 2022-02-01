import axios from "axios";
import React, {useState  ,useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moment from "moment";

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";
import { CredentialsContext } from "./Authentification/CredentialsContext.js";

export const NotificationsScreen = () => {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState([]);

    const { storedCredentials, setStoredCredentials } =
        React.useContext(CredentialsContext);
    const userData = storedCredentials.userData;
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            axios.get(`http://192.168.11.97:3000/Notifications/Fetch/${userData._id}`).then((res) => {
                setNotifications(res.data);
            });
        })
        return unsubscribe;
    }, [navigation]);
    const  data= [
        {
            id: 3,
            image: "https://bootdey.com/img/Content/avatar/avatar7.png",
            name: "March SoulLaComa",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
            attachment:
                "https://via.placeholder.com/100x100/FFB6C1/000000",
        },
        {
            id: 2,
            image: "https://bootdey.com/img/Content/avatar/avatar6.png",
            name: "John DoeLink",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
            attachment:
                "https://via.placeholder.com/100x100/20B2AA/000000",
        },
        {
            id: 4,
            image: "https://bootdey.com/img/Content/avatar/avatar2.png",
            name: "Finn DoRemiFaso",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
            attachment: "",
        },
        {
            id: 5,
            image: "https://bootdey.com/img/Content/avatar/avatar3.png",
            name: "Maria More More",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
            attachment: "",
        },
        {
            id: 1,
            image: "https://bootdey.com/img/Content/avatar/avatar1.png",
            name: "Frank Odalthh",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
            attachment:
                "https://via.placeholder.com/100x100/7B68EE/000000",
        },
        {
            id: 6,
            image: "https://bootdey.com/img/Content/avatar/avatar4.png",
            name: "Clark June Boom!",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
            attachment: "",
        },
        {
            id: 7,
            image: "https://bootdey.com/img/Content/avatar/avatar5.png",
            name: "The googler",
            text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
            attachment: "",
        },
    ];
    
    const surf = (notification)=>{
        if( notification.type === 'comment'){
            navigation.navigate("ForumPost",
                    {_id : notification.postId})
            axios.put(`http://192.168.11.97:3000/Notifications/Seen/${notification._id}`)
                 .catch((err)=>console.log(err))
          
        }
    }
    
    return (
        <FlatList
            style={styles.root}
            data={notifications}
            ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
            }}
            keyExtractor={(item) => {
                return item._id;
            }}
            renderItem={(item,key) => {
                
                const Notification = item.item;
                let mainContentStyle;
             
                return (
                    <TouchableOpacity onPress={()=>surf(Notification)}>
                              <View style={styles.container}>
                        <Image
                            source={{ uri: Notification.sender.picture}}
                            style={styles.avatar}
                        />
                        <View style={styles.content}>
                            <View style={mainContentStyle}>
                                <View style={styles.text}>
                                    <Text style={styles.name}>
                                        {Notification.sender.lastName + ' ' + Notification.sender.firstName }
                                    </Text>
                                    <Text>{Notification.content}</Text>
                                </View>
                                <Text style={styles.timeAgo}>
                                    {moment(Notification.createdAt).fromNow()}
                                </Text>
                            </View>
                            {
                                !Notification.seen?(
                                    <FontAwesome
                                    name="eye-slash"
                                    size={25}
                                    style={{position:'absolute',right:10,top:20}}
                                    color="#f39a6e"
                                />
                                ):null
                            }
                        </View>
                    </View>
                    </TouchableOpacity>
              
                );
            }}
        />
    );

}


const styles = StyleSheet.create({
    root: {
        backgroundColor: "#FFFFFF",
    },
    container: {
        padding: 16,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#FFFFFF",
        alignItems: "flex-start",
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    text: {
        marginBottom: 5,
        flexDirection: "row",
        flexWrap: "wrap",
        width:300
    },
    content: {
        flex: 1,
        marginLeft: 16,
        marginRight: 0,
    },
    mainContent: {
        marginRight: 60,
    },
    img: {
        height: 50,
        width: 50,
        margin: 0,
    },
    attachment: {
        position: "absolute",
        right: 0,
        height: 50,
        width: 50,
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC",
    },
    timeAgo: {
        fontSize: 12,
        color: "#696969",
    },
    name: {
        fontSize: 16,
        color: "#008080",
    },
});
