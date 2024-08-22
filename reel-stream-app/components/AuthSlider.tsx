import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaHeart, FaPlay } from 'react-icons/fa';
import { MdRemove } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import TrailerModal from '../components/TrailerModal';
import {
	addMovieToFavorites,
	removeMovieFromFavorites,
} from '../features/favorites/favoriteSlice';
import { RootState } from '../store/store';

type Movie = {
	id: number;
	title: string;
	poster_path: string;
	trailerUrl: string;
};

type AuthSliderProps = {
	featuredMovies: Movie[];
};

const AuthSlider: React.FC<AuthSliderProps> = ({ featuredMovies }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [trailerUrl, setTrailerUrl] = useState<string>('');
	const { user } = useUser();
	const [currentIndex, setCurrentIndex] = useState(0);
	const totalSlides = featuredMovies.length;

	// Redux hooks
	const dispatch = useDispatch();
	const favoriteMovies = useSelector(
		(state: RootState) => state.favorites.favoriteMovies
	);

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
	};

	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
		);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
		);
	};

	useEffect(() => {
		const interval = setInterval(nextSlide, 3000);
		return () => clearInterval(interval);
	}, [totalSlides]);

	const handleAddMovieToFavorites = (movie: Movie) => {
		if (user && user.id) {
			dispatch(addMovieToFavorites(movie));
			toast.success('Movie added to favorites');
		} else {
			toast.warn('You must be signed in to add movies to favorites');
		}
	};

	const handleRemoveMovieFromFavorites = (movie: Movie) => {
		if (user && user.id) {
			dispatch(removeMovieFromFavorites(movie.id));
			toast.success('Movie removed from favorites');
		} else {
			toast.warn('You must be signed in to remove movies from favorites');
		}
	};

	return (
		<div className="relative bg-neutral-950 text-white">
			<div className="flex items-center justify-center">
				<button
					className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-purple-500 p-2 rounded-full z-10 text-white border-2 border-transparent hover:border-white hover:bg-purple-600 transition-all duration-200 ease-in-out"
					onClick={prevSlide}
				>
					<FaChevronLeft className="text-white" />
				</button>
				<div className="overflow-hidden w-full max-w-screen-xl">
					<div
						className="flex transition-transform duration-500"
						style={{
							transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`,
						}}
					>
						{featuredMovies.map((movie) => {
							const isFavorite = favoriteMovies.some(
								(fav) => fav.id === movie.id
							);
							return (
								<div
									key={movie.id}
									className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 relative"
									style={{ cursor: 'pointer' }}
								>
									<img
										src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
										alt={movie.title}
										className="w-full h-72 object-cover rounded-lg mb-2 opacity-75 hover:opacity-100 transition-opacity duration-300"
									/>
									<div className="absolute inset-0 flex flex-col justify-end opacity-0 hover:opacity-100 transition-opacity duration-300">
										<div className="h-1/2 bg-neutral-800 opacity-50 rounded-t-lg"></div>
										<div className="h-1/2 bg-neutral-900 p-4 rounded-b-lg flex flex-col items-start space-y-2">
											<h2 className="text-lg font-bold text-white">
												{movie.title}
											</h2>
											<div className="flex gap-2">
												<button
													className="bg-purple-500 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-purple-600 duration-300 ease-in-out transition-all"
													onClick={() => openTrailerModal(movie.id)}
												>
													<FaPlay />
												</button>
												{isFavorite ? (
													<button
														className="text-neutral-500 w-12 h-12 flex items-center justify-center rounded-full hover:text-neutral-800 hover:bg-neutral-200 hover:border-neutral-200 duration-300 ease-in-out transition-all border-2 border-neutral-500"
														onClick={(e) => {
															e.stopPropagation();
															handleRemoveMovieFromFavorites(movie);
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
															handleAddMovieToFavorites(movie);
														}}
													>
														<FaHeart />
													</button>
												)}
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<button
					className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-500 p-2 rounded-full z-10 text-white border-2 border-transparent hover:border-white hover:bg-purple-600 transition-all duration-200 ease-in-out"
					onClick={nextSlide}
				>
					<FaChevronRight className="text-white" />
				</button>
			</div>

			{/* Trailer Modal */}
			<TrailerModal
				isOpen={isModalOpen}
				trailerUrl={trailerUrl}
				onClose={closeTrailerModal}
			/>
		</div>
	);
};

export default AuthSlider;
