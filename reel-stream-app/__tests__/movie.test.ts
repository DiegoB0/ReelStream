import { fetchMoviesByFeature } from '../pages/api/movies';

describe('fetchMoviesByFeature', () => {
	it('fetches movies by genre from the real API', async () => {
		const genreId = '28';

		const movies = await fetchMoviesByFeature('byGenre', genreId);

		expect(Array.isArray(movies)).toBe(true);
		expect(movies.length).toBeGreaterThan(0);

		movies.forEach((movie) => {
			expect(movie).toHaveProperty('id');
			expect(movie).toHaveProperty('title');
			expect(movie).toHaveProperty('poster_path');
		});
	}, 10000);
});
