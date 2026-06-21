import { auth, db } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
    doc,
    setDoc
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const registerForm =
document.getElementById("registerForm");

registerForm.addEventListener(
"submit",
async(e)=>{

    e.preventDefault();

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const role = "student";

    try{

        const userCredential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user =
        userCredential.user;

        await setDoc(
            doc(db,"users",user.uid),
            {
                name:name,
                email:email,
                role:role
            }
        );

        alert(
            "Registration Successful!"
        );

        window.location.href =
        "login.html";

    }

    catch(error){

        alert(error.message);

    }

});