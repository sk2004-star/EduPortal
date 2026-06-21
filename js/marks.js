import { db }
from "./firebase-config.js";

import {
    collection,
    getDocs
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const marksList =
    document.getElementById(
        "marksList"
    );

async function loadMarks(){

    const querySnapshot =
        await getDocs(
            collection(
                db,
                "submissions"
            )
        );

    marksList.innerHTML="";

    querySnapshot.forEach((doc)=>{

        const data =
            doc.data();

        marksList.innerHTML += `

        <div style="
            border:1px solid #ccc;
            padding:15px;
            margin:10px 0;
        ">

            <h3>
                ${data.assignmentTitle}
            </h3>

            <p>

            Marks:
            ${data.marks || "Pending"}

            </p>

        </div>

        `;
    });
}

loadMarks();