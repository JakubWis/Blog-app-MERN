const express = require('express');
const cors = require('cors');
const config = require('./config')
const mongoose = require('mongoose');
const helmet = require('helmet');
const loadTestData = require('./testData');
const app = express();
const sanitize = require('mongo-sanitize')
const path = require('path');

// import routes
const postRoutes = require('./routes/post.routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use('/api', postRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

// connecting with MongoDB
mongoose.connect(config.DB, { useNewUrlParser: true })
let db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to the database');
    loadTestData();
});
db.on('error', (err) => console.log('Error ' + err));

app.listen(8000, () => {
    console.log('Server is running on port:', config.PORT);
})