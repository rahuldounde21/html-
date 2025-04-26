// Handling the business submissions and displaying them
const businesses = JSON.parse(localStorage.getItem('businesses')) || [];

// Display all businesses on the home page
const displayBusinesses = (filteredBusinesses = businesses) => {
    const businessContainer = document.getElementById('businesses');
    businessContainer.innerHTML = '';  // Clear the existing content

    if (filteredBusinesses.length === 0) {
        businessContainer.innerHTML = '<p>No businesses found matching your search.</p>';
    } else {
        filteredBusinesses.forEach(business => {
            const businessElement = document.createElement('div');
            businessElement.classList.add('business-item');
            businessElement.innerHTML = `
                <h3>${business.name}</h3>
                <p><strong>Description:</strong> ${business.description}</p>
                <p><strong>Contact:</strong> ${business.contact}</p>
            `;
            businessContainer.appendChild(businessElement);
        });
    }
};

// Handle form submission on the Upload page
document.getElementById('business-form')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const contact = document.getElementById('contact').value;

    const newBusiness = {
        name,
        description,
        contact
    };

    // Save to local storage
    businesses.push(newBusiness);
    localStorage.setItem('businesses', JSON.stringify(businesses));

    // Redirect to Home page to show the new business
    window.location.href = 'index.html';
});

// Display businesses when loading the Home page
if (document.getElementById('businesses')) {
    displayBusinesses();
}

// Filter businesses based on search input
function filterBusinesses() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    // Filter businesses by name or description
    const filteredBusinesses = businesses.filter(business => {
        return business.name.toLowerCase().includes(searchTerm) ||
               business.description.toLowerCase().includes(searchTerm);
    });

    // Update the displayed businesses
    displayBusinesses(filteredBusinesses);
}
