import { firestore } from "../../App";
import { collection, getDoc, doc } from 'firebase/firestore';

import { getAuth} from 'firebase/auth';


//import USER_STATE_CHANGE from "../constants/index";


export function fetchUser() {
    const auth = getAuth();
    return((dispatch) => {
            
        const ref = doc(firestore, "users", auth.currentUser.uid)
        getDoc(ref)
        
        .then((snapshot) => {
            console.log(snapshot.data());
            if(snapshot.exists) {
                dispatch({
                    type: "USER_STATE_CHANGE",
                    payload: snapshot.data()
                })
            } else {
                console.log("does not exist");
            }
        })
    })
}

