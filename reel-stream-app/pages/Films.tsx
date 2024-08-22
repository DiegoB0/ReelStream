import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AuthSlider from '../components/AuthSlider';
import SkeletonLoader from '../components/SkeletonLoader';

type Movie = {
	id: number;
	title: string;
	poster_path: string;
	trailerUrl: string;
};

type GenreMovies = {
	genre: string;
	movies: Movie[];
};

function Films() {
	const [genreMovies, setGenreMovies] = useState<GenreMovies[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await new Promise((resolve) => setTimeout(resolve, 500));
				const genreRequests = [
					{ genre: 'Horror', genreId: 27 },
					{ genre: 'Comedy', genreId: 35 },
					{ genre: 'Action', genreId: 28 },
					{ genre: 'Drama', genreId: 18 },
				];

				const genreMoviesData = await Promise.all(
					genreRequests.map(async (genreRequest) => {
						try {
							const res = await axios.get(
								`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?feature=byGenre&genreId=${genreRequest.genreId}`
							);
							return { genre: genreRequest.genre, movies: res.data };
						} catch (apiError) {
							console.error(
								`Failed to fetch ${genreRequest.genre} movies:`,
								apiError
							);
							return { genre: genreRequest.genre, movies: [] };
						}
					})
				);

				setGenreMovies(genreMoviesData);
			} catch (error) {
				console.error('Failed to fetch data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<SignedIn>
				<div className="container mx-auto">
					{loading ? (
						<SkeletonLoader />
					) : genreMovies.length > 0 ? (
						genreMovies.map((genreSection) => (
							<div key={genreSection.genre} className="mx-auto py-8">
								<h1 className="text-4xl font-bold text-neutral-700 p-4">
									{genreSection.genre} Movies
								</h1>
								<AuthSlider featuredMovies={genreSection.movies} />
							</div>
						))
					) : (
						<p>No movies found</p>
					)}
				</div>
			</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</div>
	);
}

export default Films;
