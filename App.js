import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Reducers from './redux/reducers';
import thunk from 'redux-thunk';

const store = createStore(Reducers, applyMiddleware(thunk));


//*****8 */ Start firebase //
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBUT6cTpcGCUxfU6F9IdyBxdAFa4yc8cZM",
  authDomain: "instagram-76ff3.firebaseapp.com",
  projectId: "instagram-76ff3",
  storageBucket: "instagram-76ff3.appspot.com",
  messagingSenderId: "334548685389",
  appId: "1:334548685389:web:c2900d0bf892de77b2c204",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);


//****** */ End Firebase //  
             

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './components/auth/landing';
import Register from './components/auth/register';
import Main from './components/Main';

import { getAuth, onAuthStateChanged } from "firebase/auth";


const Stack = createNativeStackNavigator();


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          loaded: false
        }
    }

    componentDidMount() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          this.setState({
            loggedIn: false,
            loaded: true
          }); 

          //const uid = user.uid;
          
        } else {
          this.setState({
            loggedIn: true,
            loaded: true
          });
        }
      });
    }

    render() {
      const {loggedIn, loaded} = this.state;
      
      if(!loaded) {
        return(
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>loading</Text>
          </View>
        );
      }

      if(!loggedIn) {
        return (
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">

              <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: true}}/>
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
          </NavigationContainer>
        );
      }

      return(
        <Provider store={store}>
          <Stack.Navigator initialRouteName="Main">

            <Stack.Screen name="Main" component={Main} options={{headerShown: true}}/>
              
          </Stack.Navigator>
        </Provider>
       
      );
        
    }
}


export default App;





