import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "",
    authDomain: "checkmate-a504d.firebaseapp.com",
    databaseURL: "https://checkmate-a504d-default-rtdb.firebaseio.com",
    projectId: "checkmate-a504d",
    storageBucket: "checkmate-a504d.appspot.com",
    messagingSenderId: "1063106249029",
    appId: "1:1063106249029:web:e7d6096169a90685297e2c",
    measurementId: "G-JLSZPGMWDM",
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);
export { db, provider, auth };
