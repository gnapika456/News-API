const apiKey = 'acd69b5c3d3d4a3db2b61a5051c84655';  // Replace with your NewsAPI key
const newsContainer = document.getElementById('news-container');

// Fetch news for default country (US)
async function fetchNews(country = 'us') {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "ok") {
            displayNews(data.articles);
        } else {
            newsContainer.innerHTML = '<p>No news available at the moment.</p>';
        }
    } catch (error) {
        console.error('Error fetching the news:', error);
        newsContainer.innerHTML = '<p>Error fetching news. Please try again later.</p>';
    }
}

// Display news articles in the container
function displayNews(articles) {
    newsContainer.innerHTML = '';  // Clear any previous content
    
    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No news articles found.</p>';
        return;
    }
    
    articles.forEach(article => {
        const newsItem = `
            <div class="article">
                <img src="${article.urlToImage || 'placeholder.jpg'}" alt="News Image">
                <div class="article-content">
                    <h2 class="article-title">${article.title}</h2>
                    <p class="article-description">${article.description || 'No description available'}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                </div>
            </div>
        `;
        newsContainer.innerHTML += newsItem;
    });
}

// Fetch default news when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchNews();  // Default news for 'us'
});
