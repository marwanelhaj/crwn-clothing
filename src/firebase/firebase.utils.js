import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const config =  {
 apiKey: "AIzaSyAEiwBCrM9OwFIjXzTUsQKLH686qk3zwUA",
 authDomain: "crwn-clowthing-mar.firebaseapp.com",
 projectId: "crwn-clowthing-mar",
 storageBucket: "crwn-clowthing-mar.appspot.com",
 messagingSenderId: "110425674161",
 appId: "1:110425674161:web:1c9cb1d7daba649121ad90",
 measurementId: "G-0LX28F65JQ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return ;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapshot = await userRef.get();

    if(!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
return userRef
}



firebase.initializeApp(config);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;