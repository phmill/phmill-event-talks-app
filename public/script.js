let allTalks = [];
let currentCategory = 'All';
let currentSpeaker = 'All';

const scheduleElement = document.getElementById('schedule');
const categoryTagsElement = document.getElementById('categoryTags');
const speakerFilterElement = document.getElementById('speakerFilter');
const searchInput = document.getElementById('searchInput');

async function fetchTalks() {
    try {
        const response = await fetch('/api/talks');
        allTalks = await response.json();
        renderCategories();
        renderSpeakers();
        renderSchedule();
    } catch (error) {
        console.error('Error fetching talks:', error);
        scheduleElement.innerHTML = '<p class="error">Failed to load schedule. Please try again later.</p>';
    }
}

function renderCategories() {
    const categories = ['All', ...new Set(allTalks.flatMap(talk => talk.categories))];
    categoryTagsElement.innerHTML = categories.map(cat => `
        <button class="tag-btn ${cat === currentCategory ? 'active' : ''}" onclick="filterByCategory('${cat}')">
            ${cat}
        </button>
    `).join('');
}

function renderSpeakers() {
    const speakers = [...new Set(allTalks.flatMap(talk => talk.speakers))].sort();
    speakerFilterElement.innerHTML = '<option value="All">All Speakers</option>' + 
        speakers.map(speaker => `<option value="${speaker}">${speaker}</option>`).join('');
}

function filterByCategory(category) {
    currentCategory = category;
    renderCategories();
    renderSchedule();
}

speakerFilterElement.addEventListener('change', (e) => {
    currentSpeaker = e.target.value;
    renderSchedule();
});

searchInput.addEventListener('input', () => {
    renderSchedule();
});

function renderSchedule() {
    const searchTerm = searchInput.value.toLowerCase();
    
    // Filter talks
    const filteredTalks = allTalks.filter(talk => {
        const matchesCategory = currentCategory === 'All' || talk.categories.includes(currentCategory);
        const matchesSpeaker = currentSpeaker === 'All' || talk.speakers.includes(currentSpeaker);
        const matchesSearch = talk.title.toLowerCase().includes(searchTerm) || 
                              talk.speakers.join(', ').toLowerCase().includes(searchTerm) ||
                              talk.categories.join(', ').toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSpeaker && matchesSearch;
    });

    scheduleElement.innerHTML = '';

    // If any filter is active, don't show the lunch break in the middle
    // unless it's the full schedule
    const isFiltered = searchTerm !== '' || currentCategory !== 'All' || currentSpeaker !== 'All';

    filteredTalks.forEach((talk, index) => {
        // Add talk card
        const card = document.createElement('div');
        card.className = 'talk-card';
        card.innerHTML = `
            <div class="time-slot">${talk.startTime} - ${talk.endTime}</div>
            <h2 class="talk-title">${talk.title}</h2>
            <div class="speakers">by ${talk.speakers.join(' & ')}</div>
            <p class="description">${talk.description}</p>
            <div class="talk-tags">
                ${talk.categories.map(cat => `<span class="talk-tag">${cat}</span>`).join('')}
            </div>
        `;
        scheduleElement.appendChild(card);

        // Insert lunch break after the 3rd talk of the TOTAL schedule
        // and only if we are showing the full schedule (or the 3rd talk is present)
        if (!isFiltered && talk.id === 3) {
            const lunchCard = document.createElement('div');
            lunchCard.className = 'break-card';
            lunchCard.innerHTML = `
                <div class="time-slot">1:20 PM - 2:20 PM</div>
                <div class="break-title">🍱 Lunch Break & Networking</div>
            `;
            scheduleElement.appendChild(lunchCard);
        }
    });

    if (filteredTalks.length === 0) {
        scheduleElement.innerHTML = '<p class="no-results">No talks found matching your criteria.</p>';
    }
}

// Initial fetch
fetchTalks();
