let universities = [];
let currentPage = 1;
const universitiesPerPage = 5;
let filteredUniversities = [];

// Fetch the data from the JSON file
document.addEventListener("DOMContentLoaded", function () {
    fetch('universities.json')
        .then(response => response.json())
        .then(data => {
            universities = data.universities;
            filteredUniversities = universities; // Initialize with full data
            displayUniversities(currentPage);
            updatePageInfo();
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayUniversities(page) {
    const universityList = document.getElementById('university-list');
    universityList.innerHTML = ''; // Clear previous entries

    // Calculate the slice of universities to display on the current page
    const start = (page - 1) * universitiesPerPage;
    const end = start + universitiesPerPage;
    const paginatedUniversities = filteredUniversities.slice(start, end);

    // Display each university
    paginatedUniversities.forEach(university => {
        const universityCard = document.createElement('div');
        universityCard.classList.add('university-card');

        universityCard.innerHTML = `
            <div class="university-logo">
                <img src="${university.logo}" alt="${university.name} logo">
            </div>
            <div>
                <h2>${university.name}</h2>
                <p><strong>Location:</strong> ${university.location}</p>
                <p><strong>Ranking:</strong> ${university.ranking}</p>
                <p><strong>Courses:</strong> ${university.courses.join(', ')}</p>
                <p><strong>Fees:</strong> ₹${university.fees}</p>
                <p><a href="${university.website}" target="_blank">Visit Website</a></p>
            </div>
        `;

        universityList.appendChild(universityCard);
    });
}

function updatePageInfo() {
    const pageInfo = document.getElementById('pageInfo');
    const totalPages = Math.ceil(filteredUniversities.length / universitiesPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

document.getElementById('nextPage').addEventListener('click', function () {
    const totalPages = Math.ceil(filteredUniversities.length / universitiesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayUniversities(currentPage);
        updatePageInfo();
    }
});

document.getElementById('prevPage').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        displayUniversities(currentPage);
        updatePageInfo();
    }
});

// Filter universities by location, course, or fees
document.getElementById('filterBtn').addEventListener('click', function () {
    const locationFilter = document.getElementById('locationFilter').value.toLowerCase();
    const courseFilter = document.getElementById('courseFilter').value.toLowerCase();
    const feesFilter = document.getElementById('feesFilter').value;

    filteredUniversities = universities.filter(university => {
        const matchesLocation = university.location.toLowerCase().includes(locationFilter);
        const matchesCourse = university.courses.some(course => course.toLowerCase().includes(courseFilter));
        const matchesFees = !feesFilter || university.fees <= feesFilter;

        return matchesLocation && matchesCourse && matchesFees;
    });

    currentPage = 1; // Reset to the first page after filtering
    displayUniversities(currentPage);
    updatePageInfo();
});
