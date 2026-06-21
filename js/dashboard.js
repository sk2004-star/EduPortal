import { auth } from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


// ==========================
// SHOW USER EMAIL
// ==========================

onAuthStateChanged(auth, (user) => {

    if (user) {

        const teacherEmail =
            document.getElementById("teacherEmail");

        const studentEmail =
            document.getElementById("studentEmail");

        if (teacherEmail) {
            teacherEmail.textContent = user.email;
        }

        if (studentEmail) {
            studentEmail.textContent = user.email;
        }

    } else {

        window.location.href = "login.html";

    }

});


// ==========================
// LOGOUT
// ==========================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async () => {

            try {

                await signOut(auth);

                alert("Logged Out!");

                window.location.href =
                    "login.html";

            } catch (error) {

                alert(error.message);

            }

        }
    );

}


// ==========================
// DARK MODE
// ==========================

const darkBtn =
    document.getElementById("darkModeBtn");

if (darkBtn) {

    if (
        localStorage.getItem("theme")
        === "dark"
    ) {

        document.body.classList
            .add("dark-mode");

        darkBtn.innerHTML =
            "☀️ Light Mode";
    }

    darkBtn.addEventListener(
        "click",
        () => {

            document.body.classList
                .toggle("dark-mode");

            if (
                document.body.classList
                    .contains("dark-mode")
            ) {

                localStorage.setItem(
                    "theme",
                    "dark"
                );

                darkBtn.innerHTML =
                    "☀️ Light Mode";

            } else {

                localStorage.setItem(
                    "theme",
                    "light"
                );

                darkBtn.innerHTML =
                    "🌙 Dark Mode";

            }

        }
    );

}