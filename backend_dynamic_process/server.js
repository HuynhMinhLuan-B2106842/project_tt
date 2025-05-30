const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const blockRoutes = require('./src/routes/Block.route');
const connectionRoutes = require('./src/routes/Connection.route');
const diagramRoutes = require('./src/routes/Diagram.route');

app.use('/api/blocks', blockRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/diagrams', diagramRoutes);

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));