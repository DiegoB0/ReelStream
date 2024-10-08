import { RedirectToSignIn, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
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

const DashboardPage: React.FC = () => {
	const { user } = useUser();
	const [genreMovies, setGenreMovies] = useState<GenreMovies[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await new Promise((resolve) => setTimeout(resolve, 500));

				const genreRequests = [
					{ genre: 'Top Movies', feature: 'top' },
					{ genre: 'Popular Movies', feature: 'popular' },
					{ genre: 'Upcoming Movies', feature: 'upcoming' },
				];

				const genreMoviesData = await Promise.all(
					genreRequests.map(async (genreRequest) => {
						try {
							const res = await axios.get(
								`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?feature=${genreRequest.feature}`
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
					<h1 className="font-bold text-2xl p-5 text-center">
						Welcome, {user?.fullName}!
					</h1>

					{loading ? (
						<SkeletonLoader />
					) : genreMovies.length > 0 ? (
						genreMovies.map((genreSection) => (
							<div key={genreSection.genre} className="mx-auto py-8">
								<h1 className="text-4xl font-bold text-neutral-700 p-4">
									{genreSection.genre}
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
};

export default DashboardPage;
