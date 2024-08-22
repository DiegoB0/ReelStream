import { RedirectToSignIn, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaPlay, FaPlus } from 'react-icons/fa';
import { MdRemove } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import StaticSkeletonLoader from '../components/StaticSkeletonLoader';
import TrailerModal from '../components/TrailerModal';
import { removeMovieFromFavorites } from '../features/favorites/favoriteSlice';
import { RootState } from '../store/store';

interface Movie {
	id: number;
	title: string;
	poster_path: string;
}

function MyList() {
	const { user } = useUser();
	const dispatch = useDispatch();
	const favoriteMovies = useSelector(
		(state: RootState) => state.favorites.favoriteMovies
	);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [trailerUrl, setTrailerUrl] = useState<string>('');
	const [currentMovieId, setCurrentMovieId] = useState<number | null>(null);

	useEffect(() => {
		const fetchFavoriteMovies = async () => {
			if (user && user.id) {
				try {
					await new Promise((resolve) => setTimeout(resolve, 500));
					const response = await fetch(`/api/my-list?userId=${user.id}`);
					const data = await response.json();
					// Aquí puedes agregar las películas a Redux si es necesario
				} catch (error) {
					setError('Failed to fetch favorite movies');
				} finally {
					setIsLoading(false); // Set loading to false after fetching data
				}
			}
		};

		fetchFavoriteMovies();
	}, [user]);

	if (!user || !user.id) {
		return (
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		);
	}

	const fetchTrailerKey = async (movieId: number): Promise<string | null> => {
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
			);
			const data = await response.json();
			const trailer = data.results.find(
				(video: any) => video.type === 'Trailer' && video.site === 'YouTube'
			);
			return trailer ? trailer.key : null;
		} catch (error) {
			console.error('Failed to fetch trailer key:', error);
			return null;
		}
	};

	const openTrailerModal = async (movieId: number) => {
		setCurrentMovieId(movieId);
		const trailerKey = await fetchTrailerKey(movieId);
		if (trailerKey) {
			const youtubeUrl = `https://www.youtube.com/embed/${trailerKey}`;
			setTrailerUrl(youtubeUrl);
			setIsModalOpen(true);
		} else {
			console.error('Trailer not available for this movie.');
		}
	};

	const closeTrailerModal = () => {
		setIsModalOpen(false);
		setTrailerUrl('');
		setCurrentMovieId(null);
	};

	const unaddMovieFromFavorites = async (movie: Movie) => {
		if (user && user.id) {
			try {
				const response = await fetch(`/api/my-list?userId=${user.id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						movieId: movie.id,
					}),
				});
				const data = await response.json();
				if (response.ok) {
					// Dispatch action to remove movie from Redux state
					dispatch(removeMovieFromFavorites(movie.id));
					toast.success('Movie removed from favorites'); // Show success toast
				} else {
					toast.error(`Failed to remove movie from favorites: ${data.error}`); // Show error toast
				}
			} catch (error) {
				console.error('Failed to remove movie from favorites:', error);
				toast.error(
					'An error occurred while removing the movie from favorites.'
				); // Show error toast
			}
		} else {
			toast.error('You must be signed in to remove movies from favorites'); // Show error toast
		}
	};

	return (
		<div className="p-4">
			<h1 className="text-4xl font-bold text-neutral-700 p-4">My Movies</h1>
			{isLoading ? ( // Display the Skeleton Loader while loading
				<StaticSkeletonLoader />
			) : favoriteMovies.length > 0 ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
					{favoriteMovies.map((movie) => (
						<div
							key={movie.id}
							className="relative flex flex-col items-center group"
							style={{ cursor: 'pointer' }}
						>
							<img
								src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
								alt={movie.title}
								className="w-full h-72 object-cover rounded-lg mb-2 opacity-75 group-hover:opacity-100 transition-opacity duration-300"
							/>
							<div className="absolute inset-x-0 top-0 h-1/2 bg-neutral-800 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-t-lg"></div>
							<div className="absolute inset-x-0 bottom-0 h-1/2 bg-neutral-900 p-4 rounded-b-lg flex flex-col items-start space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								<h2 className="text-lg font-bold text-white line-clamp-2">
									{movie.title}
								</h2>
								<div className="flex gap-2 w-full">
									<button
										className="bg-purple-500 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-purple-600 duration-300 ease-in-out transition-all"
										onClick={() => openTrailerModal(movie.id)}
									>
										<FaPlay />
									</button>
									<button
										className="text-neutral-500 w-12 h-12 flex items-center justify-center rounded-full hover:text-neutral-800 hover:bg-neutral-200 hover:border-neutral-200 duration-300 ease-in-out transition-all border-2 border-neutral-500"
										onClick={(e) => {
											e.stopPropagation();
											unaddMovieFromFavorites(movie);
										}}
									>
										<span className="text-3xl">
											<MdRemove />
										</span>
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-neutral-500 mt-8">
					<p className="text-lg mb-4 text-center text-neutral-300">
						You have no favorite movies yet.
					</p>
					<div className="flex">
						<Link
							href="/Films"
							className="flex-shrink-0 w-[240px] h-[340px] p-4"
						>
							<div className="w-full h-full bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300 rounded-lg flex flex-col justify-center items-center text-center">
								<FaPlus className="text-white text-4xl mb-4" />
								<p className="text-neutral-100 text-lg font-bold p-2">
									Add Movies to Favorites
								</p>
							</div>
						</Link>
						<div className="flex-shrink-0 w-[240px] h-[340px] p-4">
							<div className="w-full h-full bg-transparent rounded-lg"></div>
						</div>
						<div className="flex-shrink-0 w-[240px] h-[340px] p-4">
							<div className="w-full h-full bg-transparent rounded-lg"></div>
						</div>
						<div className="flex-shrink-0 w-[240px] h-[340px] p-4">
							<div className="w-full h-full bg-transparent rounded-lg"></div>
						</div>
						<div className="flex-shrink-0 w-[240px] h-[340px] p-4">
							<div className="w-full h-full bg-transparent rounded-lg"></div>
						</div>
					</div>
				</div>
			)}
			<TrailerModal
				isOpen={isModalOpen}
				trailerUrl={trailerUrl}
				onClose={closeTrailerModal}
			/>
		</div>
	);
}

export default MyList;
