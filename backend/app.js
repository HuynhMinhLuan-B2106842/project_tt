const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./database/config/db');
const swaggerSetup = require('./database/config/swagger');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

swaggerSetup(app);

app.use('/api/taikhoan', require('./routes/taikhoan.route'));
app.use('/api/benhnhan', require('./routes/benhnhan.route'));
app.use('/api/mauquytrinh', require('./routes/mauquytrinh.route'));
app.use('/api/buocthucthi', require('./routes/buocthucthi.route'));
app.use('/api/thucthi', require('./routes/thucthi.route'));

module.exports = app;
