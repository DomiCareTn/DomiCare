import React from "react";
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from "react-native";

import AppIntroSlider from "react-native-app-intro-slider";

const data = [
  {
    title: "Home Care",
    text: "We provide high quality, individualized care for patients of all ages where you feel most comfortable – your home or community. Our services and equipment are designed to help you ",
    image: require("../../assets/onBoarding/homeCare4.png"),
  },
  {
    title: "Equipements",
    text:  "Home Care",
    text: "Here you can find high quality medical equipements to rent or buy We provide high quality ",
    image: require("../../assets/onBoarding/equipements1.png"),
  },
  {
    title: "Medical Forum",
    text: "Get answers and details around popular health questions on symptoms, causes and treatment options",
    image: require("../../assets/onBoarding/askForHelp.jpg"),
  },
];

const OnboardingScreen = (props) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
          <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <View>
        
          <Text style={styles.text}>{item.text}</Text>
          <TouchableOpacity
                               style={styles.commandButton}
                               onPress={()=> props.navigation.navigate("Login")}
                            >
                                <Text  style={styles.panelButtonTitle}>
                                    Get Started
                                </Text>
                            </TouchableOpacity>
        </View>
      </View>
    );
  };

  const keyExtractor = (item) => item.title;



  const handleDone = () => {
    props.handleDone();
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={data}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
   
      />
    </View>
  );
};

const styles = StyleSheet.create({
  commandButton: {
    width: 200,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f39a6e',
    alignItems: "center",
  position:'absolute',
  bottom : -140,
left : 100,
},
panelButtonTitle: {
  fontSize: 17,
  fontWeight: "bold",
  color: "white",
},
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    width:300,
    height:200,
    marginTop: 20,
    marginVertical: 40,
  },
  title: {
    fontSize: 30,
    color: "#008080",
    textAlign: "center",
    marginHorizontal: 60,
    position: 'absolute',
    top:100,
  },
  text: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
    marginHorizontal: 50,
   
  },
  dotStyle: {
    backgroundColor: "black",
  },
  activeDotStyle: {
    backgroundColor: "#008080",
  },
  rightTextWrapper: {
    width: 40,
    height: 40,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  rightText: {
    color: "#008080",
    fontSize: 14,
  },
  leftTextWrapper: {
    width: 40,
    height: 40,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  leftText: {
    color: "#008080",
    fontSize: 14,
  },
  doneButtonWrapper: {
    flex: 1,
    paddingLeft: 35,
    paddingRight: 50,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: -40,
  },
  doneButtonText: {
    fontSize: 14,
    textAlign: "center",
    color: "#008080",
  },
});

export default OnboardingScreen;