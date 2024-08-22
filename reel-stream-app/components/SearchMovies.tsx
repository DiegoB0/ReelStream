import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaHeart, FaPlay } from 'react-icons/fa';
import { MdRemove } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	addMovieToFavorites,
	removeMovieFromFavorites,
} from '../features/favorites/favoriteSlice';
import { RootState } from '../store/store';
import TrailerModal from './TrailerModal';

interface Movie {
	id: number;
	title: string;
	poster_path: string;
}

interface SearchMoviesProps {
	searchQuery: string;
	onMovieClick: (movieId: number) => void;
}

const SearchMovies: React.FC<SearchMoviesProps> = ({
	searchQuery,
	onMovieClick,
}) => {
	const { user } = useUser();
	const [movies, setMovies] = useState<Movie[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [trailerUrl, setTrailerUrl] = useState<string>('');
	const [currentMovieId, setCurrentMovieId] = useState<number | null>(null);

	// Redux hooks
	const dispatch = useDispatch();
	const favoriteMovies = useSelector(
		(state: RootState) => state.favorites.favoriteMovies
	);

	useEffect(() => {
		if (searchQuery) {
			const fetchMovies = async () => {
				try {
					const response = await axios.get(
						`https://api.themoviedb.org/3/search/movie?api_key=${
							process.env.NEXT_PUBLIC_TMDB_API_KEY
						}&query=${encodeURIComponent(searchQuery)}`
					);
					setMovies(response.data.results);
					setError(null);
				} catch (err) {
					setError('Failed to fetch movies. Please try again later.');
				}
			};

			fetchMovies();
		}
	}, [searchQuery]);

	const fetchTrailerKey = async (movieId: number): Promise<string | null> => {
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
			);
			const data = await response.json();
			const trailer = data.results.find(
				(video: { type: string; site: string }) =>
					video.type === 'Trailer' && video.site === 'YouTube'
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

	const addMovieToFavoritesHandler = async (movie: Movie) => {
		if (user && user.id) {
			try {
				const response = await fetch(`/api/my-list?userId=${user.id}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						userId: user.id,
						movieId: movie.id,
						title: movie.title,
						poster_path: movie.poster_path,
					}),
				});

				const data = await response.json();
				if (response.ok) {
					dispatch(addMovieToFavorites(movie));
					toast.success('Movie added to favorites');
				} else {
					toast.error(`Failed to add movie to favorites: ${data.error}`);
				}
			} catch (error) {
				console.error('Failed to add movie to favorites:', error);
				toast.error('An error occurred while adding the movie to favorites.');
			}
		} else {
			toast.warn('You must be signed in to add movies to favorites');
		}
	};

	const removeMovieFromFavoritesHandler = async (movie: Movie) => {
		if (user && user.id) {
			try {
				const response = await fetch(
					`/api/my-list?userId=${user.id}&movieId=${movie.id}`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);
				const data = await response.json();
				if (response.ok) {
					dispatch(removeMovieFromFavorites(movie.id));
					toast.success('Movie removed from favorites');
				} else {
					toast.error(`Failed to remove movie from favorites: ${data.error}`);
				}
			} catch (error) {
				console.error('Failed to remove movie from favorites:', error);
				toast.error(
					'An error occurred while removing the movie from favorites.'
				);
			}
		} else {
			toast.warn('You must be signed in to remove movies from favorites');
		}
	};

	return (
		<div className="p-4">
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{movies.map((movie) => (
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
								{favoriteMovies.some((fav) => fav.id === movie.id) ? (
									<button
										className="text-neutral-500 w-12 h-12 flex items-center justify-center rounded-full hover:text-neutral-800 hover:bg-neutral-200 hover:border-neutral-200 duration-300 ease-in-out transition-all border-2 border-neutral-500"
										onClick={(e) => {
											e.stopPropagation();
											removeMovieFromFavoritesHandler(movie);
										}}
									>
										<span className="text-3xl">
											<MdRemove />
										</span>
									</button>
								) : (
									<button
										className="text-neutral-500 w-12 h-12 flex items-center justify-center rounded-full hover:text-neutral-800 hover:bg-neutral-200 hover:border-neutral-200 duration-300 ease-in-out transition-all border-2 border-neutral-500"
										onClick={(e) => {
											e.stopPropagation();
											addMovieToFavoritesHandler(movie);
										}}
									>
										<FaHeart />
									</button>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
			<TrailerModal
				isOpen={isModalOpen}
				trailerUrl={trailerUrl}
				onClose={closeTrailerModal}
			/>
			<ToastContainer />
		</div>
	);
};

export default SearchMovies;
