const express = require("express");
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5100;
const mongoose = require('mongoose');
const { MONGO_URI } = require('./db/connect');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const models = require("./models/schema");

// app.use(bodyParser.json());
app.use(cors());

// user schema
app.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, type, email, password } = req.body;
    const user = await models.Users.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user object
    const newUser = new models.Users({
      firstname,
      lastname,
      type,
      email,
      password: hashedPassword
    });
    // Save the new user to the database
    const userCreated = await newUser.save();
    console.log(userCreated, 'user created');
    return res.status(200).json({ message: 'Successfully registered' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await models.Users.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  // Generate a JWT token
  if (user.type === 'viewer') {
    const token = jwt.sign({ userId: user._id }, 'mysecretkey1');
    res.json({ user, token });
  } else if (user.type === 'admin') {
    const jwtToken = jwt.sign({ userId: user._id }, 'mysecretkey2');
    res.json({ user, jwtToken });
  }
});


app.post('/theater-owner/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the theater owner already exists
    const existingOwner = await models.TheaterOwner.findOne({ email });
    if (existingOwner) {
      return res.status(400).json({ message: 'Theater owner already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new theater owner object with the hashed password
    const newOwner = new models.TheaterOwner({ name, email, password: hashedPassword });

    // Save the new owner to the database
    const savedOwner = await newOwner.save();

    return res.status(201).json({ message: 'Theater owner registered successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



app.post('/theater-owner/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the theater owner by email
    const owner = await models.TheaterOwner.findOne({ email });
    console.log(owner)
    // Check if the owner exists
    if (!owner) {
      return res.status(404).json({ message: 'Theater owner not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, owner.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const ownerToken = jwt.sign({ ownerId: owner._id }, 'mysecretkey1');
    res.json({ owner, ownerToken, message: 'Login successful' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new movie
app.post('/movies', async (req, res) => {
  try {
    const movie = await models.Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all movies
app.get('/movies', async (req, res) => {
  try {
    const movies = await models.Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/movie/:id', async (req, res) => {
  try {
    const movies = await models.Movie.findById(req.params.id);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new theater
app.post('/theaters', async (req, res) => {
  try {
    const theater = await models.Theater.create(req.body);
    res.status(201).json(theater);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all theaters
app.get('/theaters', async (req, res) => {
  try {
    const theaters = await models.Theater.find();
    res.json(theaters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new booking
app.post('/bookings', async (req, res) => {
  try {
    const booking = await models.Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings
app.get('/bookings', async (req, res) => {
  try {
    const bookings = await models.Booking.find()
      .populate('movie_id')
      .populate('theater_id');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bookings by user ID
app.get('/bookings/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find bookings for the specified user ID
    const bookings = await models.Booking.find({ user_id: userId })
      .populate('movie_id')
      .populate('theater_id');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Get bookings by movie ID
app.get('/bookings/movie/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;

    // Find bookings for the specified movie ID
    const bookings = await models.Booking.find({ movie_id: movieId })
      // .populate('user_id')
      .populate('theater_id')
      .populate('movie_id');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/theaters', async (req, res) => {
  try {
    const theaters = await models.Theater.find()
    res.send(theaters)
  } catch (error) {
    res.send(error)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await models.Users.find()
    res.send(users)
  } catch (error) {
    res.send(error)
  }
})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;