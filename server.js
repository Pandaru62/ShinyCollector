const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname)));
app.use('/scss', express.static(path.join(__dirname, 'scss')));


// Define a route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// route for search page
app.get('/generationsearch', (req, res) => {
    res.sendFile(path.join(__dirname, 'generation.html'));
});

app.get('/gamessearch', (req, res) => {
    res.sendFile(path.join(__dirname, 'games.html'));
});

app.get('/pokedex', (req, res) => {
    res.sendFile(path.join(__dirname, 'dex.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
