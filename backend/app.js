const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./database/config/db');
const swaggerSetup = require('./database/config/swagger');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true     
}));
app.use(express.json());

connectDB();



app.use('/api/taikhoan', require('./routes/taikhoan.route'));
app.use('/api/benhnhan', require('./routes/benhnhan.route'));
app.use('/api/yeucau', require('./routes/yeucau.route'));
app.use('/api/lankham', require('./routes/lankham.route'));
app.use('/api/diagrams', require('./routes/Diagram.route'));
app.use('/api/quytrinh', require('./routes/quytrinh.route'));
swaggerSetup(app);

module.exports = app;
