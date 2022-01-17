import * as React from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './Authentification/CredentialsContext.js';

const Home = ({navigation}) => {
    const {storedCredentials,setStoredCredentials}=React.useContext(CredentialsContext)
    const  userData = storedCredentials;
   console.log('homePage :', userData)
    
    const clearLogin = () => {
        AsyncStorage
        .removeItem('domicareCredentials')
        .then(()=>{
            setStoredCredentials("");
        })
        .catch((error)=> console.log(error))
    }

    return (
        <CredentialsContext.Consumer>
             {({storedCredentials})=>(
                  <View>
                  <Text>This is the Home page</Text>
                  <Button
                      title="Go to Equipements Feed"
                      onPress={() => navigation.navigate("Equipementsfetch")}
                  />
                  {
                       storedCredentials ?
                       <>
                         <Button title="Logout" onPress={clearLogin} />
                       </>
                       : <>
                        <Button title="Login"  onPress={() => navigation.navigate("Login")} />
                       </>
                  }
                     {
                       storedCredentials ?
                       <>
                <Button
                      title="Essai"
                      onPress={() => navigation.navigate("Essai")}
                  />
                       </>
                       : <>
                        
                       </>
                  }
                  <Button
                      title="Service Providers"
                      onPress={() => navigation.navigate("serviceProvidersList")}
                  />
                  
                   <Button
                      title="ServiceProviderProfile"
                      onPress={() => navigation.navigate("ServiceProviderProfile")}
                  />
      
                  
                   <Button
                      title="share service"
                      onPress={() => navigation.navigate("shareservice")}
                  />
                  <Button title="Forum2" onPress={()=>navigation.navigate("Forum2",userData)} /> 
                  {/* <Button title="Test" onPress={()=>navigation.navigate("Test",userData)} />  */}
              </View>
             )}
            
        </CredentialsContext.Consumer>
       
    );
};


export default Home;