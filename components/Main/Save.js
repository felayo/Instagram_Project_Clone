import React, { useState } from 'react'
import { View, TextInput, Image, Button } from 'react-native'


import { firestore } from "../../App";
import { storage } from "../../App";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { doc, setDoc, addDoc, serverTimestamp, collection } from 'firebase/firestore';



export default function Save(props) {
    //console.log(props.route.params.image)
    const [caption, setCaption] = useState("");

    const uploadImage = async () => {
        const auth = getAuth();

        const uri = props.route.params.image;
        const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath);

        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = ref(storage, childPath);


        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
                console.log('Upload is ' + progress + '% done');
                }, 
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    }
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        savePostData(downloadURL);
                        console.log('File available at', downloadURL);
                    });
                }
            );

        // uploadBytes(storageRef, blob).then((snapshot) => {
        //     console.log(`transferred: ${snapshot.bytesTransferred}`);
        // });

    }

    // Store the url on firestore
    const savePostData = (downloadURL) => {
        const auth = getAuth();
        const ref = doc(firestore, "posts", auth.currentUser.uid)
        const subRef = collection(ref, "userPosts")

     
            addDoc(subRef, {
                downloadURL,
                caption,
                creation: serverTimestamp()
            }).then((function () {
                props.navigation.popToTop()
            }))
    }

    return (
        <View style={{flex: 1}}>
            <Image source={{ uri: props.route.params.image }} />
            <TextInput
                placeholder="Write a Caption . . ."
                onChangeText={(caption) => setCaption(caption)}
            />
            <Button title="Save" onPress={() => uploadImage()} />
        </View>
    )
}
