const express = require('express');
const router = express.Router();

// Dummy data for now
const dummyStats = {
  totalVisitors: 1200,
  totalRegistrations: 450,
  activeUsers: 300,
  pendingTasks: 15,
};

const dummyVisitorData = [
  { name: 'Mon', visitors: 400 },
  { name: 'Tue', visitors: 300 },
  { name: 'Wed', visitors: 500 },
  { name: 'Thu', visitors: 450 },
  { name: 'Fri', visitors: 600 },
  { name: 'Sat', visitors: 700 },
  { name: 'Sun', visitors: 550 },
];

const dummyRegistrationData = [
  { name: 'Conference A', value: 200 },
  { name: 'Workshop B', value: 150 },
  { name: 'Seminar C', value: 100 },
];

const dummyRecentActivities = [
  { id: 1, text: 'User John Doe registered', timestamp: '2023-10-26T10:00:00Z' },
  { id: 2, text: 'New event created: AI Summit', timestamp: '2023-10-25T14:30:00Z' },
  { id: 3, text: 'Jane Smith updated profile', timestamp: '2023-10-24T09:15:00Z' },
];

// @route GET /api/dashboard/stats
// @desc Get dashboard statistics
router.get('/stats', (req, res) => {
  console.log('Fetching dashboard stats');
  res.json(dummyStats);
});

// @route GET /api/dashboard/visitors
// @desc Get weekly visitor data
router.get('/visitors', (req, res) => {
  console.log('Fetching weekly visitor data');
  res.json(dummyVisitorData);
});

// @route GET /api/dashboard/registrations
// @desc Get registration types data
router.get('/registrations', (req, res) => {
  console.log('Fetching registration types data');
  res.json(dummyRegistrationData);
});

// @route GET /api/dashboard/recent-activities
// @desc Get recent activities
router.get('/recent-activities', (req, res) => {
  console.log('Fetching recent activities');
  res.json(dummyRecentActivities);
});

// Placeholder for registration types data (if needed separately from general registrations)
// For now, it will return the same as registrations for simplicity
router.get('/registration-types', (req, res) => {
  console.log('Fetching registration types data');
  res.json(dummyRegistrationData);
});

module.exports = router; 