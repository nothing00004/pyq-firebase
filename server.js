// Initialize Firebase (replace with your own config)
const firebaseConfig = {
    apiKey: "AIzaSyDJ48O6uEyozQrYCG4koIjOzDtiEj_93xE",
    authDomain: "pyq-web-beba7.firebaseapp.com",
    projectId: "pyq-web-beba7",
    storageBucket: "pyq-web-beba7.appspot.com",
    messagingSenderId: "456081134957",
    appId: "1:456081134957:web:b028e71fff102f3b7ef664"
};





// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const subjectListElement = document.getElementById('subject-list');

const subjects = [
    "Subject One", "Subject Two", "Subject Three", "Subject Four",
    "Subject Five", "Subject Six", "Subject Seven", "Subject Eight"
];

function createSubjectFolders() {
    console.log("Creating subject folders");
    subjects.forEach(subject => {
        const subjectFolder = document.createElement('div');
        subjectFolder.className = 'col-md-3 col-sm-6';
        subjectFolder.innerHTML = `
            <div class="mu-book-overview-single">
                <h4>${subject}</h4>
                <div class="pdf-list" id="${subject.replace(/\s+/g, '-').toLowerCase()}"></div>
                <input type="file" accept=".pdf" style="display: none;" id="file-${subject.replace(/\s+/g, '-').toLowerCase()}">
                <button onclick="document.getElementById('file-${subject.replace(/\s+/g, '-').toLowerCase()}').click()">Upload PDF</button>
            </div>
        `;
        subjectListElement.appendChild(subjectFolder);

        // Add event listener for file selection
        document.getElementById(`file-${subject.replace(/\s+/g, '-').toLowerCase()}`).addEventListener('change', (event) => {
            uploadPDF(event, subject);
        });

        // List PDFs for this subject
        listPDFs(subject);
    });
}

function listPDFs(subject) {
    console.log(`Listing PDFs for ${subject}`);
    const folderRef = storage.ref(subject);
    const pdfListElement = document.getElementById(subject.replace(/\s+/g, '-').toLowerCase());

    folderRef.listAll().then((result) => {
        pdfListElement.innerHTML = ''; // Clear existing list
        result.items.forEach((itemRef) => {
            if (itemRef.name.toLowerCase().endsWith('.pdf')) {
                displayPDFItem(itemRef, pdfListElement);
            }
        });
    }).catch((error) => {
        console.error(`Error listing files for ${subject}:`, error);
    });
}

function displayPDFItem(itemRef, pdfListElement) {
    itemRef.getDownloadURL().then((url) => {
        const pdfItem = document.createElement('div');
        pdfItem.className = 'pdf-item';
        
        const nameWithoutExtension = itemRef.name.replace('.pdf', '');
        
        pdfItem.innerHTML = `
            <p>${nameWithoutExtension}</p>
            <a href="${url}" target="_blank">View</a>
            <a href="${url}" download="${itemRef.name}">Download</a>
        `;
        
        pdfListElement.appendChild(pdfItem);
    }).catch((error) => {
        console.error(`Error getting download URL for ${itemRef.name}:`, error);
    });
}

function uploadPDF(event, subject) {
    console.log(`Uploading PDF for ${subject}`);
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        const storageRef = storage.ref(`${subject}/${file.name}`);
        const uploadTask = storageRef.put(file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload progress: ${progress}%`);
            },
            (error) => {
                console.error(`Error uploading file to ${subject}:`, error);
                alert('Upload failed: ' + error.message);
            },
            () => {
                console.log(`Upload completed successfully for ${subject}`);
                alert('Upload completed successfully!');
                listPDFs(subject); // Refresh the PDF list for this subject
            }
        );
    } else {
        alert('Please select a PDF file.');
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    createSubjectFolders();
});