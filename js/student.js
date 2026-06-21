import { db }
from "./firebase-config.js";

import {
    collection,
    getDocs
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const notesContainer =
document.getElementById("notesContainer");

async function loadNotes(){

    if(!notesContainer) return;

    notesContainer.innerHTML = "";

    const snapshot =
    await getDocs(
        collection(db,"notes")
    );

    if(snapshot.empty){

        notesContainer.innerHTML = `
        <p>No notes available.</p>
        `;
        return;
    }

    snapshot.forEach((note)=>{

        const data =
        note.data();

        notesContainer.innerHTML += `

        <div class="note-card">

            <h3>
                ${data.title}
            </h3>

            <p>
                Subject:
                ${data.subject}
            </p>

            <p>
                Uploaded By:
                ${data.uploadedBy}
            </p>

            <a
            href="${data.pdfUrl}"
            target="_blank">

            📄 View PDF

            </a>

        </div>

        `;

    });

}

loadNotes();