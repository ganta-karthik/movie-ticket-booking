const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    type: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const theaterOwnerSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

// Define Movie schema
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image_url: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    duration: { type: Number, required: true },
    release_date: { type: Date, required: true }
});

// Define Theater schema
const theaterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image_url: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    capacity: { type: Number, required: true }
});

// Define Booking schema
const bookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    theater_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
    total_price: { type: Number, required: true },
    seat_numbers: [{ type: String, required: true }],
    booking_date: { type: Date, default: Date.now },
    payment_method: { type: String, required: true },
    payment_status: { type: String, default: 'pending' }
});

// Create and export the corresponding models
const Users = mongoose.model('Users', userSchema);
const TheaterOwner = mongoose.model('TheaterOwner', theaterOwnerSchema);
const Movie = mongoose.model('Movie', movieSchema);
const Theater = mongoose.model('Theater', theaterSchema);
//const Screen = mongoose.model('Screen', screenSchema);
//const Showtime = mongoose.model('Showtime', showtimeSchema);
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Users, Movie, Theater, Booking, TheaterOwner };
