import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    addDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const assignmentList =
    document.getElementById("assignmentList");

async function loadAssignments() {

    const querySnapshot =
        await getDocs(
            collection(db, "assignments")
        );

    assignmentList.innerHTML = "";

    querySnapshot.forEach((doc) => {

        const data = doc.data();

        assignmentList.innerHTML += `

        <div style="
            border:1px solid #ccc;
            padding:15px;
            margin:15px 0;
            border-radius:10px;
            background:white;
        ">

            <h3>${data.title}</h3>

            <p>
                Subject:
                ${data.subject}
            </p>

            <p>
                Deadline:
                ${data.deadline}
            </p>

            <a
                href="${data.pdfUrl}"
                target="_blank">
                View Assignment PDF
            </a>

            <br><br>

            <input
                type="url"
                id="link-${doc.id}"
                placeholder="Google Drive Submission Link">

            <button
                onclick="submitAssignment('${doc.id}','${data.title}')">
                Submit
            </button>

        </div>

        `;
    });
}

window.submitAssignment =
async function(id,title){

    const link =
        document.getElementById(
            `link-${id}`
        ).value;

    if(!link){

        alert(
            "Enter Submission Link"
        );

        return;
    }

    await addDoc(
        collection(
            db,
            "submissions"
        ),
        {
            assignmentId:id,
            assignmentTitle:title,
            submissionLink:link,
            submittedAt:
                new Date().toISOString()
        }
    );

    alert(
        "Assignment Submitted!"
    );
};

loadAssignments();