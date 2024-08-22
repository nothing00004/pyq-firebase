// Firebase configuration
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
const uploadProgress = document.getElementById('upload-progress');
const storage = firebase.storage();

// Get subject name from URL
const subjectName = window.location.pathname.split('/').pop().replace('.html', '').replace(/-/g, ' ');
document.getElementById('subject-title').textContent = subjectName;

function listPDFs() {
    const pdfListElement = document.getElementById('pdf-list');
    pdfListElement.innerHTML = ''; // Clear existing list

    const folderRef = storage.ref(subjectName);
    folderRef.listAll().then((result) => {
        result.items.forEach((itemRef) => {
            itemRef.getDownloadURL().then((url) => {
                const pdfItem = document.createElement('div');
                pdfItem.className = 'pdf-item';
                pdfItem.innerHTML = `
                    <p>${itemRef.name}</p>
                    <a href="${url}" target="_blank">View</a>
                    <a href="${url}" download="${itemRef.name}">Download</a>
                `;
                pdfListElement.appendChild(pdfItem);
            });
        });
    }).catch((error) => {
        console.error("Error listing files:", error);
    });
}

function uploadPDF() {
    const fileInput = document.getElementById('pdf-file');
    const file = fileInput.files[0];
    if (file && file.type === 'application/pdf') {
        const storageRef = storage.ref(`${subjectName}/${file.name}`);
        const uploadTask = storageRef.put(file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload progress:", progress);
                uploadProgress.textContent = `Upload progress: ${progress.toFixed(2)}%`;
            },
            (error) => {
                console.error("Error uploading file:", error);
                alert('Upload failed: ' + error.message);
            },
            () => {
                
                fileInput.value = ''; // Clear the file input
                listPDFs(); // Refresh the PDF list
            }
        );
    } else {
        alert('Please select a PDF file.');
    }
}





document.getElementById('upload-btn').addEventListener('click', uploadPDF);

// Initial PDF list population
listPDFs();