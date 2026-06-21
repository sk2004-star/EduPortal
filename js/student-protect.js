import { auth, db } from "./firebase-config.js";

import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
doc,
getDoc
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

onAuthStateChanged(auth, async(user)=>{

    if(!user){

        window.location.href =
        "login.html";

        return;
    }

    const docRef =
    doc(db,"users",user.uid);

    const docSnap =
    await getDoc(docRef);

    if(docSnap.exists()){

        const data =
        docSnap.data();

        if(data.role !== "student"){

            alert(
                "Access Denied!"
            );

            window.location.href =
            "teacher-dashboard.html";
        }

    }

});