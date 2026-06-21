import { db }
from "./firebase-config.js";

import {
    collection,
    getDocs
}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

async function loadCounters(){

    const notes =
        await getDocs(
            collection(db,"notes")
        );

    const assignments =
        await getDocs(
            collection(db,"assignments")
        );

    const submissions =
        await getDocs(
            collection(db,"submissions")
        );

    const noteCount =
        document.getElementById(
            "noteCount"
        );

    const assignmentCount =
        document.getElementById(
            "assignmentCount"
        );

    const submissionCount =
        document.getElementById(
            "submissionCount"
        );

    if(noteCount)
        noteCount.innerText =
            notes.size;

    if(assignmentCount)
        assignmentCount.innerText =
            assignments.size;

    if(submissionCount)
        submissionCount.innerText =
            submissions.size;
}

loadCounters();