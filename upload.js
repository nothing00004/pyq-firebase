// Your Firebase configuration
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
const uploadForm = document.getElementById('upload-form');
const uploadProgress = document.getElementById('upload-progress');

function uploadPDF(event) {
    event.preventDefault();
    console.log("Upload function called");

    const pdfName = document.getElementById('pdf-name').value;
    const pdfFile = document.getElementById('pdf-file').files[0];

    if (!pdfFile) {
        alert('Please select a PDF file to upload.');
        return;
    }

    console.log("File selected:", pdfFile.name);

    const fileName = `${pdfName}.pdf`;
    const storageRef = storage.ref(fileName);
    
    console.log("Attempting to upload file:", fileName);
    
    const uploadTask = storageRef.put(pdfFile);

    uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload progress:", progress);
            uploadProgress.textContent = `Upload progress: ${progress.toFixed(2)}%`;
        },
        (error) => {
            console.error("Full error object:", error);
            uploadProgress.textContent = `Upload failed: ${error.message}`;
        },
        () => {
            console.log("Upload completed successfully");
            uploadProgress.textContent = 'Upload completed successfully!';
            document.getElementById('pdf-name').value = '';
            document.getElementById('pdf-file').value = '';
        }
    );
}

uploadForm.addEventListener('submit', uploadPDF);