import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

type Movie = {
	id: number;
	title: string;
	poster_path: string;
};

export const fetchMoviesByGenre = async (genreId: number): Promise<Movie[]> => {
	const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
	const response = await axios.get(
		`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
	);
	return response.data.results.slice(0, 10).map((movie: any) => ({
		id: movie.id,
		title: movie.title,
		poster_path: movie.poster_path,
	}));
};

export const fetchMoviesByFeature = async (
	feature: string,
	genreId?: string
): Promise<Movie[]> => {
	const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
	let url = '';

	switch (feature) {
		case 'popular':
			url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
			break;
		case 'top':
			url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
			break;

		case 'upcoming':
			url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
			break;
		case 'byGenre':
			if (!genreId) throw new Error('Genre ID is required for byGenre feature');
			return fetchMoviesByGenre(parseInt(genreId));
		default:
			throw new Error('Invalid feature');
	}

	if (!url) throw new Error('URL not defined for feature');

	try {
		const response = await axios.get(url);
		const results = response.data.results;
		if (!results) throw new Error('No results found in API response');
		return results.slice(0, 10).map((movie: any) => ({
			id: movie.id,
			title: movie.title,
			poster_path: movie.poster_path,
		}));
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching movies:', error.message);
			throw error;
		} else {
			console.error('Unknown error:', error);
			throw new Error('An unknown error occurred');
		}
	}
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { feature, genreId } = req.query;

	// Validate feature parameter
	if (
		!['popular', 'top', 'latest', 'upcoming', 'byGenre'].includes(
			feature as string
		)
	) {
		return res.status(400).json({ error: 'Invalid feature' });
	}

	try {
		const movies = await fetchMoviesByFeature(
			feature as string,
			genreId as string
		);
		res.status(200).json(movies);
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error fetching movies:', error.message);
			res.status(500).json({ error: error.message });
		} else {
			console.error('Unknown error:', error);
			res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
}
