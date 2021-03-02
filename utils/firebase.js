import firebase from 'firebase/app'
import 'firebase/firestore'

    const firebaseConfig = {
        apiKey: "AIzaSyDvElIuLfAVeehvh1W96QCfqO_JD4xPlYc",
        authDomain: "restaurants-7d2fa.firebaseapp.com",
        projectId: "restaurants-7d2fa",
        storageBucket: "restaurants-7d2fa.appspot.com",
        messagingSenderId: "620545535468",
        appId: "1:620545535468:web:08fee7958e711fdbdae4c9"
    }

  
  export const firebaseApp =  firebase.initializeApp(firebaseConfig);