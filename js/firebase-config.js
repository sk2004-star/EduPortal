import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBXAqSLneMF4jb1AxSWFXsbujv2AFJZ4Uk",
    authDomain: "eduportal-81d92.firebaseapp.com",
    projectId: "eduportal-81d92",
    storageBucket: "eduportal-81d92.firebasestorage.app",
    messagingSenderId: "21447272382",
    appId: "1:21447272382:web:df5659aac9224fa03c3bef",
    measurementId: "G-0RPM1WSZ77"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);