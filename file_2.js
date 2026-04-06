const axios = require('axios');

exports.handler = async (event) => {
    const { query, apiKey, engine = 'google' } = event.queryStringParameters;

    if (!query || !apiKey) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing query or API key' }),
        };
    }

    try {
        let url, params;
        if (engine === 'google') {
            // Google Custom Search JSON API
            url = 'https://www.googleapis.com/customsearch/v1';
            params = {
                key: apiKey,
                cx: 'YOUR_CUSTOM_SEARCH_ENGINE_ID', // Replace with your CSE ID
                q: query,
            };
        } else if (engine === 'serpapi') {
            // SerpAPI (alternative)
            url = 'https://serpapi.com/search';
            params = {
                api_key: apiKey,
                q: query,
            };
        } else {
            throw new Error('Unsupported search engine');
        }

        const response = await axios.get(url, { params });
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};