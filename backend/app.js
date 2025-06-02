const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./database/config/db');
const swaggerSetup = require('./database/config/swagger');

const app = express();
app.use(cors({
  origin: '*', 
}));
app.use(express.json());

connectDB();



app.use('/api/taikhoan', require('./routes/taikhoan.route'));
app.use('/api/benhnhan', require('./routes/benhnhan.route'));
app.use('/api/mauquytrinh', require('./routes/mauquytrinh.route'));
app.use('/api/buocthucthi', require('./routes/buocthucthi.route'));
app.use('/api/thucthiquytrinh', require('./routes/thucthi.route'));
app.use('/api/yeucau', require('./routes/yeucau.route'));
app.use('/api/lankham', require('./routes/lankham.route'));
app.use('/api/blocks', require('./routes/Block.route'));
app.use('/api/connections', require('./routes/Connection.route'));
app.use('/api/diagrams', require('./routes/Diagram.route'));

swaggerSetup(app);

module.exports = app;
