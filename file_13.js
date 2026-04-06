// script.js
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');

searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (query === '') return;

    try {
        const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&q=${query}&cx=YOUR_SEARCH_ENGINE_ID`);
        const data = await response.json();

        if (data.items) {
            const results = data.items.map(item => {
                return `
                    <div class="result">
                        <h2>${item.title}</h2>
                        <p>${item.snippet}</p>
                        <a href="${item.link}">Read More</a>
                    </div>
                `;
            }).join('');

            searchResults.innerHTML = results;
        } else {
            searchResults.innerHTML = '<p>No results found.</p>';
        }
    } catch (error) {
        console.error(error);
    }
});