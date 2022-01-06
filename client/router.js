
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import EquipementsFeed from './components/EquipementsFeed.js'
import Forum from './components/Forum.js'
import Home from './components/Home.js'
import ServiceProviderList from './components/ServiceProviderList.js'
import ForumPost from './components/ForumPost.js'



const Stack = createNativeStackNavigator()
const Router = () => {
  return (
    //create your routes here
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="EquipementsFeed" component={EquipementsFeed} />
      <Stack.Screen name="ServiceProviderList" component={ServiceProviderList} />

      <Stack.Screen name="Forum" component={Forum} /> 
      <Stack.Screen name="ForumPost" component={ForumPost} /> 
    </Stack.Navigator>
  )
}

export default Router
