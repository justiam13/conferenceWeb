const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  exposedHeaders: ['Content-Length', 'X-Foo'],
  optionsSuccessStatus: 200
}));

// Middleware
app.use(express.json());

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
const navbarRoutes = require('./routes/navbarRoutes');
app.use('/api/navbar', navbarRoutes);
const footerRoutes = require('./routes/footerRoutes');
app.use('/api/footer', footerRoutes);
const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// NEW: Test CORS route
app.get('/api/test-cors', (req, res) => {
  console.log('CORS test route hit!');
  res.status(200).json({ message: 'CORS test successful!' });
});

// Debugging + Mongoose fix
mongoose.set('strictQuery', true);
console.log('Connecting to Mongo URI:', process.env.MONGO_URI);

// Connect to MongoDB with updated options
mongoose.connect(process.env.MONGO_URI, {
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: true,
  retryWrites: true,
  w: 'majority'
})
.then(() => {
  console.log('✅ MongoDB connected');
  // Start server only after DB connection is established
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  if (err.name === 'MongooseServerSelectionError') {
    console.error('Please check if your IP address is whitelisted in MongoDB Atlas');
    console.error('Visit: https://www.mongodb.com/docs/atlas/security-whitelist/');
  }
  process.exit(1); // Exit if DB connection fails
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Test route
app.get('/', (req, res) => {
  res.send('✅ Backend server running');
});
