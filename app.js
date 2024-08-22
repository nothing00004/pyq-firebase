const firebaseConfig = {
  apiKey: "AIzaSyDJ48O6uEyozQrYCG4koIjOzDtiEj_93xE",
  authDomain: "pyq-web-beba7.firebaseapp.com",
  projectId: "pyq-web-beba7",
  storageBucket: "pyq-web-beba7.appspot.com",
  messagingSenderId: "456081134957",
  appId: "1:456081134957:web:b028e71fff102f3b7ef664"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');
const subjectListElement = document.getElementById('subject-list');

console.log("Firebase initialized:", !!storage);

const subjects = [
  "CSE 2001", "PHY 1002", "ECE 2005", "MGT 1040",
  "MAT 1003", "ELECTIVE COURSES", "REFERENCE BOOKS", "UNKNOWN SUBJECTS"
];

function createSubjectLinks() {
  console.log("Creating subject links...");
  subjects.forEach(subject => {
    const subjectLink = document.createElement('div');
    subjectLink.className = 'col-md-3 col-sm-6';
    subjectLink.innerHTML = `
      <div class="mu-book-overview-single">
        <h4><a href="${subject.toLowerCase().replace(/\s+/g, '-')}.html">${subject}</a></h4>
      </div>
    `;
    subjectListElement.appendChild(subjectLink);
  });
}
function createSubjectButtons() {
  const subjectListElement = document.getElementById('subject-list');
  subjects.forEach(subject => {
    const subjectButton = document.createElement('div');
    subjectButton.className = 'col-md-3 col-sm-6';
    subjectButton.innerHTML = `
      <div class="mu-book-overview-single">
        <button class="mu-subject-btn">${subject}</button>
      </div>
    `;
    subjectListElement.appendChild(subjectButton);
    
    // Add click event listener
    subjectButton.querySelector('.mu-subject-btn').addEventListener('click', () => {
      // Handle button click (e.g., navigate to subject page or show subject details)
      console.log(`${subject} button clicked`);
      // Add your desired functionality here
    });
  });
}







function displaySearchResults(results) {
  console.log(results);
  if (results.length === 0) {
    searchResults.innerHTML = '<p>No results found.</p>';
    return;
  }

  let html = '<h3>Search Results:</h3><ul>';
  results.forEach(result => {
    html += `
      <li>
        <strong>${result.name}</strong> (${result.subject})
        <a href="${result.url}" target="_blank">View</a>
        <a href="${result.url}" download="${result.name}">Download</a>
      </li>
    `;
  });
  html += '</ul>';

  searchResults.innerHTML = html;
}



document.addEventListener('DOMContentLoaded', createSubjectLinks);
