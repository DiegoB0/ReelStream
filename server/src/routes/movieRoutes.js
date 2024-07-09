const express = require('express');
const Movie = require('../models/Movie');

const router = express.Router();

router.get('/movies', async (req, res) => {
	try {
		const movies = await Movie.find({});
		res.json(movies);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post('/movies', async (req, res) => {
	const { title, description, genre, year } = req.body;

	const movie = new Movie({
		title,
		description,
		genre,
		year,
	});

	try {
		const newMovie = await movie.save();
		res.status(201).json(newMovie);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
