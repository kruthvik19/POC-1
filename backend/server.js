const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const authRoutes = require('./routes/auth');
const policiesRoutes = require('./routes/policies');
const Policy = require('./models/policy');
const User = require('./models/user');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/poc1';

app.use(cors());
app.use(express.json());

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Seed admin user if none exists
    const adminCount = await User.countDocuments({ username: 'admin' });
    if (adminCount === 0) {
      const passwordHash = await bcrypt.hash('admin123', 10);
      await User.create({ username: 'admin', passwordHash, role: 'admin' });
      console.log('Seeded admin user (admin / admin123)');
    }
    
    // Seed default policies if none exist
    const count = await Policy.countDocuments();
    if (count === 0) {
      await Policy.create([
        {
          name: 'Health Shield',
          premium: '6000',
          coverage: '500000',
          duration: '2',
          eligibility: '18-60 years',
          benefits: ['Cashless Treatment', 'Surgery Cover', 'Diagnostics Cover', 'Room rent cover']
        },
        {
          name: 'Vehicle Protection',
          premium: '9000',
          coverage: '300000',
          duration: '6',
          eligibility: 'Valid RC+ Driving License',
          benefits: ['Accident Cover', 'Third party', 'Damage protection']
        },
        {
          name: 'Life Secure Plan',
          premium: '11000',
          coverage: '1000000',
          duration: '10',
          eligibility: '18-55 years',
          benefits: ['Death benefits', 'Tax benefit', 'Maturity bonus']
        }
      ]);
      console.log('Seeded default policies');
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);
app.use('/api/policies', policiesRoutes);

app.get('/', (req, res) => {
  res.send({ message: 'Insurance API is running' });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
