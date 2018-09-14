import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
  apiKey: "AIzaSyD_IKeqCk44T0Dtm2T5iei_NNaXD1EZMTo",
  authDomain: "humanity-a02e7.firebaseapp.com",
  databaseURL: "https://humanity-a02e7.firebaseio.com",
  projectId: "humanity-a02e7",
  storageBucket: "humanity-a02e7.appspot.com",
  messagingSenderId: "1068800296094"
};
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const postsCollection = db.collection("posts")
const usersCollection = db.collection("users")

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,

}
