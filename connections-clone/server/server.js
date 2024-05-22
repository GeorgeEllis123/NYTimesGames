const express = require('express');
//const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017/connections', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.get('/api/words', async (req, res) => {
    const words = await Word.find();
    res.json(words);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
