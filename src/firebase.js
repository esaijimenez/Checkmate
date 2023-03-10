import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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

export const db = getDatabase(app);