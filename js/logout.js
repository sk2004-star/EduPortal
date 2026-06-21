import { auth }
from "./firebase-config.js";

import {
    signOut
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

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