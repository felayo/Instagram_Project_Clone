import React, { Component } from 'react';
import { TextInput, View, Button } from 'react-native';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firestore } from "../../App";
import { doc, setDoc } from 'firebase/firestore';



class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }
        this.onSignUp = this.onSignUp.bind(this);

    }

    onSignUp() {
        const { email, password, name} = this.state;
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            const ref = doc(firestore, "users", auth.currentUser.uid)
                
                setDoc(ref, {
                    name,
                    email
                })
           
            console.log(userCredential);
        })
        .catch((error) => {
            console.log(error);
            //const errorCode = error.code;
            //const errorMessage = error.message;
        });

    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder="name"
                    onChangeText={(name) => this.setState({name})} 
                />
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
                    onPress={() => this.onSignUp()}
                    title="Sign Up" 
                />
            </View>
        );
    }
}


export default Register;