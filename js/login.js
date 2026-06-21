import { auth, db } from "./firebase-config.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    try {

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user =
            userCredential.user;

        const userDoc =
            await getDoc(
                doc(db, "users", user.uid)
            );

        if (!userDoc.exists()) {

            alert("User data not found in Firestore.");
            return;

        }

        const userData =
            userDoc.data();

        console.log(userData);

        if (userData.role === "teacher") {

            window.location.href =
                "teacher-dashboard.html";

        }
        else {

            window.location.href =
                "student-dashboard.html";

        }

    }
    catch (error) {

        console.error(error);

        alert(
            "Login Failed : " +
            error.message
        );

    }

});