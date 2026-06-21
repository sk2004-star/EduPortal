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

    if(user){

        const docRef =
        doc(db,"users",user.uid);

        const docSnap =
        await getDoc(docRef);

        if(docSnap.exists()){

            const data =
            docSnap.data();

            const userEmail =
            document.getElementById("userEmail");

            const userRole =
            document.getElementById("userRole");

            const teacherEmail =
            document.getElementById("teacherEmail");

            if(userEmail){
                userEmail.textContent =
                data.name || data.email;
            }

            if(userRole){
                userRole.textContent =
                data.role;
            }

            if(teacherEmail){
                teacherEmail.textContent =
                data.name || data.email;
            }

        }

    }

});