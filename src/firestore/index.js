import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDI3mq0-adf8nlsyNytmR9x1WqB1gOa8Z8",
  authDomain: "shopsharer009.firebaseapp.com",
  databaseURL: "https://shopsharer009.firebaseio.com",
  projectId: "shopsharer009",
  storageBucket: "shopsharer009.appspot.com",
  messagingSenderId: "731666635187",
  appId: "1:731666635187:web:f32c1d4788b5ffcb3013c6",
  measurementId: "G-CDN0YZQHV5",
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();


export async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()
    await auth.signInWithPopup(provider)
    window.location.reload()
}

export function checkAuth(cb){
    return auth.onAuthStateChanged(cb)
}

export async function logOut(){
    await auth.signOut();
    window.location.reload();
}

export async function getCollection(id){
    const snapshot = await db.collection(id).get()
    const data = snapshot.docs.map(doc=>({id:doc.id,...doc.data()})) 
}

export async function getUserLists(userId){
    const snapshot = await db.collection("lists").where("author","==",userId)
    .get()
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(data);
}