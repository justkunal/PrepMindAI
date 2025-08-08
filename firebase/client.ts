import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAhm-PHSldF21PV0OTkZdZBFzUKRZH6j6s",
    authDomain: "prepmind-70a73.firebaseapp.com",
    projectId: "prepmind-70a73",
    storageBucket: "prepmind-70a73.appspot.com",
    messagingSenderId: "94933507595",
    appId: "1:94933507595:web:0257db3b84d4a9b5d8710e",
    measurementId: "G-70K0DX0VN2"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db =  getFirestore(app);