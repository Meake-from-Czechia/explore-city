// API Base URL - Replace with your actual API base URL
const API_BASE_URL = 'https://meake.cz/api'; // Example, adjust as needed

// State management
let cities = [];
let placeTypes = [];
let currentCity = null;
let currentPlace = null;
let currentCityId = null;
let currentPlaceId = null;
let deleteType = null;
let deleteId = null;

// DOM Elements
const citiesContainer = document.getElementById('cities-container');
const cityDetailSection = document.getElementById('city-detail');
const placeDetailSection = document.getElementById('place-detail');
const placesContainer = document.getElementById('places-container');
const selectedCityName = document.getElementById('selected-city-name');
const backCityName = document.getElementById('back-city-name');
const backToCity = document.getElementById('back-to-city');
const newPlaceLink = document.getElementById('new-place-link');
const placeNameElement = document.getElementById('place-name');
const placeDescriptionElement = document.getElementById('place-description');
const addressTextElement = document.getElementById('address-text');
const ratingStarsElement = document.getElementById('rating-stars');
const ratingCountElement = document.getElementById('rating-count');
const commentsListElement = document.getElementById('comments-list');
const commentNameInput = document.getElementById('comment-name');
const commentTextInput = document.getElementById('comment-text');
const submitCommentButton = document.getElementById('submit-comment');
const editPlaceIcon = document.querySelector('.edit-icon');
const deletePlaceIcon = document.querySelector('.delete-icon');
const editPlaceForm = document.getElementById('edit-place-form');
const editPlaceNameInput = document.getElementById('edit-place-name');
const editPlaceTypeSelect = document.getElementById('edit-place-type');
const editPlaceDescriptionInput = document.getElementById('edit-place-description');
const editPlaceAddressInput = document.getElementById('edit-place-address');
const savePlaceEditsButton = document.getElementById('save-place-edits');
const newPlaceForm = document.getElementById('new-place-form');
const newPlaceNameInput = document.getElementById('new-place-name');
const newPlaceTypeSelect = document.getElementById('new-place-type');
const newPlaceDescriptionInput = document.getElementById('new-place-description');
const newPlaceAddressInput = document.getElementById('new-place-address');
const saveNewPlaceButton = document.getElementById('save-new-place');
const confirmDeleteButton = document.getElementById('confirm-delete');
const deleteConfirmText = document.getElementById('delete-confirm-text');

// Bootstrap Modals
const editPlaceModal = new bootstrap.Modal(document.getElementById('editPlaceModal'));
const newPlaceModal = new bootstrap.Modal(document.getElementById('newPlaceModal'));
const deleteConfirmModal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));

// API Functions
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return null;
    }
}

async function postData(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error posting data to ${endpoint}:`, error);
        return null;
    }
}

async function putData(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error updating data at ${endpoint}:`, error);
        return null;
    }
}

async function deleteData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error deleting data at ${endpoint}:`, error);
        return null;
    }
}

// Data Loading Functions
async function loadCities() {
    const data = await fetchData('/cities');
    if (data) {
        cities = data;
        renderCities();
    }
}

async function loadPlaceTypes() {
    const data = await fetchData('/types');
    if (data) {
        placeTypes = data;
        populatePlaceTypeSelects();
    }
}

async function loadPlacesForCity(cityId) {
    const data = await fetchData(`/city/${cityId}/places`);
    if (data) {
        renderPlaces(data);
        return data;
    }
    return [];
}

async function loadPlaceDetails(placeId) {
    const data = await fetchData(`/place/${placeId}`);
    if (data) {
        currentPlace = data;
        renderPlaceDetails(data);
        // Load ratings and comments
        loadPlaceRatings(placeId);
        loadPlaceComments(placeId);
        return data;
    }
    return null;
}

async function loadPlaceRatings(placeId) {
    const data = await fetchData(`/place/${placeId}/ratings`);
    if (data) {
        renderRating(data.averageRating, data.ratingsCount);
    }
}

async function loadPlaceComments(placeId) {
    const data = await fetchData(`/place/${placeId}/comments`);
    if (data) {
        renderComments(data);
    }
}

// Create, Update, Delete Functions
async function createPlace(cityId, placeData) {
    const response = await postData(`/city/${cityId}/place`, placeData);
    if (response) {
        await loadPlacesForCity(cityId);
        return response;
    }
    return null;
}

async function updatePlace(placeId, placeData) {
    const response = await putData(`/place/${placeId}`, placeData);
    if (response) {
        await loadPlaceDetails(placeId);
        return response;
    }
    return null;
}

async function deletePlace(placeId) {
    const response = await deleteData(`/place/${placeId}`);
    if (response) {
        return true;
    }
    return false;
}

async function createComment(placeId, commentData) {
    const response = await postData(`/place/${placeId}/comment`, commentData);
    if (response) {
        await loadPlaceComments(placeId);
        return response;
    }
    return null;
}

async function deleteComment(commentId) {
    const response = await deleteData(`/comment/${commentId}`);
    if (response) {
        await loadPlaceComments(currentPlaceId);
        return true;
    }
    return false;
}

async function createRating(placeId, rating) {
    const response = await postData(`/place/${placeId}/rating`, { rating });
    if (response) {
        await loadPlaceRatings(placeId);
        return response;
    }
    return null;
}

// Rendering Functions
function renderCities() {
    citiesContainer.innerHTML = '';

    cities.forEach(city => {
        const cityCard = document.createElement('div');
        cityCard.className = 'col-md-4 mb-3';
        cityCard.innerHTML = `
            <div class="city-card" data-city-id="${city.id}">
                <div class="placeholder-image" style="background-image: url('safr.jpg');"></div>
                <h3 class="city-name">${city.name}</h3>
            </div>
        `;

        citiesContainer.appendChild(cityCard);
    });

    // Add event listeners
    document.querySelectorAll('.city-card').forEach(card => {
        card.addEventListener('click', function() {
            const cityId = this.getAttribute('data-city-id');
            showCityDetail(cityId);
        });
    });
}

function renderPlaces(places) {
    placesContainer.innerHTML = '';

    places.forEach(place => {
        const placeType = placeTypes.find(t => t.id === place.placeType.id) || { name: 'Neznámý' };

        const placeCard = document.createElement('div');
        placeCard.className = 'col-md-4 col-lg-3 mb-3';
        placeCard.innerHTML = `
            <div class="place-card" data-place-id="${place.id}">
                <div class="placeholder-image" style="background-image: url('pel.jpg');"></div>
                <h4 class="place-name">${place.name}</h4>
                <p class="place-type">${placeType.name}</p>
            </div>
        `;

        placesContainer.appendChild(placeCard);
    });

    // Add event listeners
    document.querySelectorAll('.place-card').forEach(card => {
        card.addEventListener('click', function() {
            const placeId = this.getAttribute('data-place-id');
            showPlaceDetail(placeId);
        });
    });
}

function renderPlaceDetails(place) {
    const placeType = placeTypes.find(t => t.id === place.placeType.id) || { name: 'Neznámý' };

    placeNameElement.textContent = place.name;
    placeDescriptionElement.textContent = place.description;
    addressTextElement.textContent = place.address;
}

function renderRating(average, count) {
    // Reset all stars
    const stars = ratingStarsElement.querySelectorAll('i');
    stars.forEach(star => {
        star.classList.remove('bi-star-fill');
        star.classList.remove('active');
        star.classList.add('bi-star');
    });

    // Fill in stars based on rating
    const fullStars = Math.floor(average);
    const hasHalfStar = average - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars[i].classList.remove('bi-star');
        stars[i].classList.add('bi-star-fill');
        stars[i].classList.add('active');
    }

    if (hasHalfStar && fullStars < 5) {
        stars[fullStars].classList.add('active');
    }

    // Update count text
    ratingCountElement.textContent = `(${count})`;
}

function renderComments(comments) {
    commentsListElement.innerHTML = '';

    if (comments.length === 0) {
        commentsListElement.innerHTML = '<p class="text-muted">Zatím žádné komentáře.</p>';
        return;
    }

    comments.forEach(comment => {
        const date = new Date(comment.createdAt);
        const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;

        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <div class="comment-header">
                <span class="comment-author"><i class="bi bi-person"></i> ${comment.name}</span>
                <div>
                    <span class="comment-date">${formattedDate}</span>
                    <i class="bi bi-trash delete-comment ms-2" data-comment-id="${comment.id}"></i>
                </div>
            </div>
            <div class="comment-text">${comment.text}</div>
        `;

        commentsListElement.appendChild(commentElement);
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-comment').forEach(button => {
        button.addEventListener('click', function() {
            const commentId = this.getAttribute('data-comment-id');
            showDeleteConfirmation('comment', commentId);
        });
    });
}

function populatePlaceTypeSelects() {
    // Clear existing options
    editPlaceTypeSelect.innerHTML = '';
    newPlaceTypeSelect.innerHTML = '';

    // Add option for each place type
    placeTypes.forEach(type => {
        const option1 = document.createElement('option');
        option1.value = type.id;
        option1.textContent = type.name;
        editPlaceTypeSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = type.id;
        option2.textContent = type.name;
        newPlaceTypeSelect.appendChild(option2);
    });
}

// Navigation Functions
async function showCityDetail(cityId) {
    currentCityId = cityId;
    const selectedCity = cities.find(city => city.id == cityId);

    if (!selectedCity) return;

    currentCity = selectedCity;

    // Update city name in UI
    selectedCityName.textContent = currentCity.name;
    backCityName.textContent = currentCity.name;

    // Load places for this city
    await loadPlacesForCity(cityId);

    // Hide place detail if visible
    placeDetailSection.style.display = 'none';

    // Show city detail
    cityDetailSection.style.display = 'block';
}

async function showPlaceDetail(placeId) {
    currentPlaceId = placeId;

    // Load place details
    await loadPlaceDetails(placeId);

    // Show place detail
    placeDetailSection.style.display = 'flex';
    cityDetailSection.style.display = 'none';
}

// Modal Functions
function showEditPlaceModal() {
    // Fill form with current place data
    editPlaceNameInput.value = currentPlace.name;
    editPlaceTypeSelect.value = currentPlace.typeId;
    editPlaceDescriptionInput.value = currentPlace.description;
    editPlaceAddressInput.value = currentPlace.address;

    // Show modal
    editPlaceModal.show();
}

function showNewPlaceModal() {
    // Clear form
    newPlaceForm.reset();

    // Show modal
    newPlaceModal.show();
}

function showDeleteConfirmation(type, id) {
    deleteType = type;
    deleteId = id;

    // Update confirmation text
    if (type === 'place') {
        deleteConfirmText.textContent = `Opravdu chcete smazat místo "${currentPlace.name}"?`;
    } else if (type === 'comment') {
        deleteConfirmText.textContent = 'Opravdu chcete smazat tento komentář?';
    }

    // Show modal
    deleteConfirmModal.show();
}

// Star Rating Interaction
function setupRatingStars() {
    const stars = ratingStarsElement.querySelectorAll('i');

    // Handle hover states
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            // Fill stars up to the current one
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add('hover');
            }
        });

        star.addEventListener('mouseout', () => {
            // Remove hover state from all stars
            stars.forEach(s => s.classList.remove('hover'));
        });

        // Handle click to set rating
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            createRating(currentPlaceId, rating);
        });
    });
}

// Event Listeners
function setupEventListeners() {
    // Back button
    backToCity.addEventListener('click', function(e) {
        e.preventDefault();
        showCityDetail(currentCityId);
    });

    // Add new place button
    newPlaceLink.addEventListener('click', function(e) {
        e.preventDefault();
        showNewPlaceModal();
    });

    // Edit place button
    editPlaceIcon.addEventListener('click', function(e) {
        e.preventDefault();
        showEditPlaceModal();
    });

    // Delete place button
    deletePlaceIcon.addEventListener('click', function(e) {
        e.preventDefault();
        showDeleteConfirmation('place', currentPlaceId);
    });

    // Save place edits button
    savePlaceEditsButton.addEventListener('click', async function() {
        if (editPlaceForm.checkValidity()) {
            const placeData = {
                name: editPlaceNameInput.value,
                typeId: parseInt(editPlaceTypeSelect.value),
                description: editPlaceDescriptionInput.value,
                address: editPlaceAddressInput.value
            };

            const updated = await updatePlace(currentPlaceId, placeData);
            if (updated) {
                editPlaceModal.hide();
            }
        } else {
            editPlaceForm.reportValidity();
        }
    });

    // Save new place button
    saveNewPlaceButton.addEventListener('click', async function() {
        if (newPlaceForm.checkValidity()) {
            const placeData = {
                name: newPlaceNameInput.value,
                typeId: parseInt(newPlaceTypeSelect.value),
                description: newPlaceDescriptionInput.value,
                address: newPlaceAddressInput.value
            };

            const created = await createPlace(currentCityId, placeData);
            if (created) {
                newPlaceModal.hide();
            }
        } else {
            newPlaceForm.reportValidity();
        }
    });

    // Submit comment button
    submitCommentButton.addEventListener('click', async function() {
        if (commentNameInput.value.trim() && commentTextInput.value.trim()) {
            const commentData = {
                name: commentNameInput.value.trim(),
                text: commentTextInput.value.trim()
            };

            const created = await createComment(currentPlaceId, commentData);
            if (created) {
                commentNameInput.value = '';
                commentTextInput.value = '';
            }
        }
    });

    // Confirm delete button
    confirmDeleteButton.addEventListener('click', async function() {
        if (deleteType === 'place') {
            const deleted = await deletePlace(deleteId);
            if (deleted) {
                deleteConfirmModal.hide();
                showCityDetail(currentCityId);
            }
        } else if (deleteType === 'comment') {
            const deleted = await deleteComment(deleteId);
            if (deleted) {
                deleteConfirmModal.hide();
            }
        }
    });
}

// Initialization
async function init() {
    // Load cities and place types
    await loadCities();
    await loadPlaceTypes();

    // Setup event listeners
    setupEventListeners();
    setupRatingStars();
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
