import { db }
from "./firebase-config.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const uploadForm =
document.getElementById("uploadForm");

const notesList =
document.getElementById("uploadedNotes");

async function loadNotes(){

const querySnapshot =
await getDocs(
collection(db,"notes")
);

notesList.innerHTML="";

querySnapshot.forEach((note)=>{

const data =
note.data();

notesList.innerHTML += `
<div class="note-card">

<h3>${data.title}</h3>

<p>
Subject:
${data.subject}
</p>

<p>
Uploaded By:
${data.uploadedBy}
</p>

<a href="${data.pdfUrl}"
target="_blank">
View PDF
</a>

<button
class="delete-btn"
onclick="deleteNote('${note.id}')">
Delete
</button>

</div>
`;

});

}

loadNotes();

uploadForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const title =
document.getElementById("title").value;

const subject =
document.getElementById("subject").value;

const pdfUrl =
document.getElementById("pdfUrl").value;

await addDoc(
collection(db,"notes"),
{
title,
subject,
pdfUrl,
uploadedBy:"Teacher"
}
);

uploadForm.reset();

loadNotes();

}
);

window.deleteNote =
async(id)=>{

await deleteDoc(
doc(db,"notes",id)
);

loadNotes();

};