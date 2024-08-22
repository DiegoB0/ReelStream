const movieService = require('../services/movie');

const postMovie = async (req, res) => {
	try {
		const userId = req.params.userId;

		console.log(req.body);

		// Pass the userId and the entire request body to the service
		const result = await movieService.addMovieToFavorites(userId, req.body);

		if (result.error) {
			console.error('Failed to add movie to favorites:', result.error);
			return res.status(500).json({ error: result.error });
		}

		res.status(200).json(result);
	} catch (error) {
		console.error('Error adding movie to favorites:', error);
		res.status(500).json({ error: 'Internal server error: ' + error.message });
	}
};

const getMovies = async (req, res) => {
	try {
		const userId = req.params.userId;

		const movies = await movieService.getFavoriteMovies(userId);
		res.status(200).json(movies);
	} catch (error) {
		console.error('Error retrieving favorite movies:', error);
		res.status(500).json({ error: error.message });
	}
};

const deleteMovie = async (req, res) => {
	try {
		const userId = req.params.userId;
		const movieId = req.params.movieId;
		const result = await movieService.removeMovieFromFavorites(userId, movieId);
		res.status(200).json(result);
	} catch (error) {
		console.error('Error removing movie from favorites:', error);
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	postMovie,
	getMovies,
	deleteMovie,
};
