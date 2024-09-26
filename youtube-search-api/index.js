const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins
app.use(cors());

// Endpoint to fetch YouTube search suggestions
app.get('/api/search', async (req, res) => {
    const query = req.query.q;

    // Check if the query is provided
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required.' });
    }

    try {
        const response = await axios.get(`https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${query}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from YouTube API.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
