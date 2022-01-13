import React, { Component } from 'react';
import { TextInput, View, Button } from 'react-native';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
        this.onSignIn = this.onSignIn.bind(this);

    }

    onSignIn() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            //const user = userCredential.user;
            console.log(userCredential)
            // ...
        })
        .catch((error) => {
            console.log(error)
            //const errorCode = error.code;
            //const errorMessage = error.message;
        });

    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder="email"
                    onChangeText={(email) => this.setState({email})} 
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})} 
                />
                <Button
                    onPress={() => this.onSignIn()}
                    title="Sign in" 
                />
            </View>
        );
    }
}


export default Login;