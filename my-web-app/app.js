const express = require('express');
const app = express();
const path = require('path');

// Middleware to check working hours (Monday to Friday, from 9 to 17)
const checkWorkingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Proceed if it's within working hours
  } else {
    res.send('<h1>Sorry, our website is only available during working hours (Mon-Fri, 9 AM to 5 PM)</h1>');
  }
};

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware for serving static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Use the working hours middleware
app.use(checkWorkingHours);

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/our-services', (req, res) => {
  res.render('services');
});

app.get('/contact-us', (req, res) => {
  res.render('contact');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
