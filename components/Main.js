import React, { Component } from 'react'
import { Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
//const Tab = createBottomTabNavigator();



import FeedScreen from './Main/Feed'
import ProfileScreen from './Main/Profile'



import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'





const EmptyScreen = () => {
    return (null);
}


export class Main extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        const { currentUser } = this.props;
        //console.log(currentUser)
        if(currentUser == undefined) {
            return(
                <View></View>
            )
        }
        
        return (
            <Tab.Navigator initialRouteName="Feed" activeColor="#f0edf6" inactiveColor="#3e2465" >
                <Tab.Screen
                    name="Feed"
                    component={FeedScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="AddContainer"
                    component={EmptyScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Add");
                        }
                    })}
                    options={{
                        tabBarLabel: 'Add',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="plus-box" color={color} size={size} />
                        ),
                    }}
                />

                  <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.userState.currentUser
})

const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)




