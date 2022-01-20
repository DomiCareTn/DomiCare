import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const SIZES = {
    base: 10,
    width,
    height,
  };

let exercises = [
  {
    title: 'Medical Advices',
    image: "https://s3-us-east-2.amazonaws.com/maryville/wp-content/uploads/2019/09/16172732/nurse-holds-clipboard.jpg",
    subTitle:
      'Live happier and healthier by learning the fundamentals of diet recommendation',
  },
  {
    title: 'Kegel Exercises',
    image: "https://s3-us-east-2.amazonaws.com/maryville/wp-content/uploads/2019/09/16172732/nurse-holds-clipboard.jpg",    subTitle:
      'Live happier and healthier by learning the fundamentals of kegel exercises',
  },
  {
    title: 'Meditation',
    image: "https://s3-us-east-2.amazonaws.com/maryville/wp-content/uploads/2019/09/16172732/nurse-holds-clipboard.jpg",    subTitle:
      'Live happier and healthier by learning the fundamentals of meditation and mindfulness',
  },
  {
    title: 'Yoga',
    image: "https://s3-us-east-2.amazonaws.com/maryville/wp-content/uploads/2019/09/16172732/nurse-holds-clipboard.jpg",    subTitle: 'Live happier and healthier by learning the fundamentals of Yoga',
  },
];

const HomeScreen = () => {
  const ExerciseItem = ({exercise}) => {
    return (
      <TouchableOpacity
        onPress={() =>{}
        //   navigation.navigate('ExerciseDetailsScreen', {exercise: exercise})
        }
        activeOpacity={0.8}
        style={{
          backgroundColor: 'white',
          width: 0.5 * SIZES.width - 35,
          margin: 10,
          height: 180,
          borderRadius: 10,
          padding: 15,
          shadowColor: '#9e9898',
          elevation: 5,
        }}>
        <ImageBackground
          source={{uri : exercise.image}}
          style={{
            width: '100%',
            resizeMode: 'cover',
            flex: 1,
          }}
        />
        <Text style={{marginTop: 20, textAlign: 'center', fontSize: 16}}>
          {exercise.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, position: 'relative'}}>
      <StatusBar
        backgroundColor='#008080'
        barStyle="dark-content"
        animated={true}
      />
      <View
        style={{
          width: '100%',
          height: '30%',
          padding: 30,
          backgroundColor: '#008080',
          position: 'relative',
        }}>
        <Image
          source={{uri : "https://media.nurse.org/cache/b6/53/b6532ae191a90b032909b0964307d60d@2x.webp"}}
          style={{
            position: 'absolute',
            top: 60,
            left: -50,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
        
        </View>

        <Text style={{fontSize: 30, lineHeight: 45 , color :'white'}}>
          Welcome Home
        </Text>
 
      </View>

      <FlatList
        data={exercises}
        style={{
          paddingHorizontal: 20,
          marginTop: -60,
        }}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={item => item.title}
        renderItem={({item}) => <ExerciseItem exercise={item} />}
      />
    </SafeAreaView>
  );
};

export default HomeScreen