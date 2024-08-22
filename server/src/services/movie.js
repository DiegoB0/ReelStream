const User = require('../models/User');
const Movie = require('../models/Movie');

const addMovieToFavorites = async (userId, body) => {
	try {
		const user = await User.findOne({ clerkId: userId });
		if (!user) {
			throw new Error('User not found');
		}

		const { title, poster_path, movieId } = body;
		let movie = await Movie.findOne({ movieId: movieId });

		if (!movie) {
			movie = new Movie({
				movieId: movieId,
				title: title,
				poster_path: poster_path,
			});
			await movie.save();
		}

		if (user.favoriteMovies.includes(movieId)) {
			return { error: 'Movie already in favorites' };
		}

		user.favoriteMovies.push(movieId);
		await user.save();

		return { message: 'Movie added to favorites' };
	} catch (error) {
		return { error: error.message };
	}
};

const getFavoriteMovies = async (userId) => {
	try {
		// Find the user by clerkId
		const user = await User.findOne({ clerkId: userId });
		if (!user) {
			throw new Error('User not found');
		}

		// Find all movies whose IDs are in the favoriteMovies array
		const movies = await Movie.find({ movieId: { $in: user.favoriteMovies } });
		return movies;
	} catch (error) {
		throw new Error('Error processing request: ' + error.message);
	}
};

const removeMovieFromFavorites = async (userId, movieId) => {
	try {
		const user = await User.findOne({ clerkId: userId });
		if (!user) {
			throw new Error('User not found');
		}

		const movieIndex = user.favoriteMovies.indexOf(movieId);
		if (movieIndex !== -1) {
			user.favoriteMovies.splice(movieIndex, 1);
			await user.save();
		}

		await Movie.deleteOne({ movieId: movieId });

		return { message: 'Movie removed from favorites' };
	} catch (error) {
		throw new Error('Error processing request: ' + error.message);
	}
};

module.exports = {
	addMovieToFavorites,
	getFavoriteMovies,
	removeMovieFromFavorites,
};
