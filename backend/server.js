const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const todoRoutes = require('./routes/todos');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/poc1';
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:4200';

app.use(helmet());
app.use(morgan('combined'));
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
app.use(limiter);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => res.send({ message: 'Node backend is running' }));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
