import { db }
from "./firebase-config.js";

import {
collection,
getDocs,
updateDoc,
doc
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const submissionList =
document.getElementById(
"submissionsContainer"
);

async function loadSubmissions(){

if(!submissionList) return;

const querySnapshot =
await getDocs(
collection(db,"submissions")
);

submissionList.innerHTML="";

querySnapshot.forEach((submission)=>{

const data =
submission.data();

submissionList.innerHTML += `
<div class="assignment-card">

<h3>
${data.assignmentTitle}
</h3>

<a href="${data.submissionLink}"
target="_blank">
View Submission
</a>

<br><br>

<input
type="number"
id="marks-${submission.id}"
placeholder="Enter Marks">

<button
onclick="giveMarks('${submission.id}')">
Save Marks
</button>

<p>
Marks:
${data.marks || "Pending"}
</p>

</div>
`;

});

}

window.giveMarks =
async(id)=>{

const marks =
document.getElementById(
`marks-${id}`
).value;

await updateDoc(
doc(db,"submissions",id),
{
marks
}
);

loadSubmissions();

};

loadSubmissions();