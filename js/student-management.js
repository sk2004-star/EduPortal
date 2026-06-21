import { db }
from "./firebase-config.js";

import {
    collection,
    getDocs,
    doc,
    updateDoc
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const studentsContainer =
document.getElementById("studentsContainer");

const studentCount =
document.getElementById("studentCount");

if(studentsContainer){

    loadStudents();

}

async function loadStudents(){

    studentsContainer.innerHTML = "";

    let count = 0;

    const snapshot =
    await getDocs(
        collection(db,"users")
    );

    snapshot.forEach((student)=>{

        const data =
        student.data();

        if(data.role === "student"){

            count++;

            studentsContainer.innerHTML += `

            <div class="card">

                <h3>
                    ${data.name || "No Name"}
                </h3>

                <p>
                    ${data.email}
                </p>

                <p>
                    Status:
                    ${data.active === false
                        ? "Blocked"
                        : "Active"}
                </p>

                <button
                onclick="toggleStudent('${student.id}', ${data.active === false})">

                ${data.active === false
                    ? "Unblock"
                    : "Block"}

                </button>

            </div>

            `;

        }

    });

    if(studentCount){

        studentCount.textContent =
        count;

    }

}

window.toggleStudent =
async(id,isBlocked)=>{

    await updateDoc(
        doc(db,"users",id),
        {
            active:isBlocked
        }
    );

    loadStudents();

};