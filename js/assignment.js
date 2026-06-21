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

const assignmentForm =
document.getElementById("assignmentForm");

const assignmentList =
document.getElementById(
"assignmentsContainer"
);

async function loadAssignments(){

const querySnapshot =
await getDocs(
collection(db,"assignments")
);

assignmentList.innerHTML="";

querySnapshot.forEach((assignment)=>{

const data =
assignment.data();

assignmentList.innerHTML += `
<div class="assignment-card">

<h3>${data.title}</h3>

<p>
Subject:
${data.subject}
</p>

<p>
Deadline:
${data.deadline}
</p>

<a href="${data.pdfUrl}"
target="_blank">
View PDF
</a>

<button
class="delete-btn"
onclick="deleteAssignment('${assignment.id}')">
Delete
</button>

</div>
`;

});

}

loadAssignments();

assignmentForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

await addDoc(
collection(db,"assignments"),
{
title:
document.getElementById("assignmentTitle").value,

subject:
document.getElementById("assignmentSubject").value,

pdfUrl:
document.getElementById("assignmentPdf").value,

deadline:
document.getElementById("deadline").value
}
);

assignmentForm.reset();

loadAssignments();

}
);

window.deleteAssignment =
async(id)=>{

await deleteDoc(
doc(db,"assignments",id)
);

loadAssignments();

};