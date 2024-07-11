import axios from 'axios';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons
import NavBar from '../components/NavBar';

type Movie = {
	id: number;
	title: string;
	poster_path: string;
};

type HomeProps = {
	featuredMovies: Movie[];
};

const Slider: React.FC<HomeProps> = ({ featuredMovies }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const totalSlides = featuredMovies.length;

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

	// Automatic slide change every 5 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
			);
		}, 3000); // Change slide every 5 seconds

		return () => clearInterval(interval); // Cleanup interval on unmount
	}, [totalSlides]); // Re-run effect if totalSlides changes

	return (
		<div className="bg-neutral-950 min-h-screen text-white">
			<Head>
				<title>ReelStream</title>
				<meta name="description" content="A Netflix-like streaming platform" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="container mx-auto py-8">
				<h1 className="text-4xl font-bold mb-4 p-4 text-neutral-700">
					Top Movies
				</h1>
				<div className="relative overflow-hidden">
					<div className="flex items-center justify-center">
						<button
							className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-purple-500 p-2 rounded-full z-10 text-white border-2 border-transparent hover:border-white transition-all duration-200 ease-in-ou"
							onClick={prevSlide}
						>
							<FaChevronLeft className="text-white" />
						</button>
						<div className="overflow-hidden w-full max-w-screen-xl">
							<div
								className="flex transition-transform duration-500"
								style={{
									transform: `translateX(-${
										currentIndex * (100 / totalSlides)
									}%)`,
								}}
							>
								{featuredMovies.map((movie, index) => (
									<div
										key={movie.id}
										className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
									>
										<img
											src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
											alt={movie.title}
											className="w-full h-72 object-cover rounded-lg mb-2"
										/>
										<h2 className="text-lg font-bold">{movie.title}</h2>
									</div>
								))}
							</div>
						</div>
						<button
							className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-500 p-2 rounded-full z-10 text-white border-2 border-transparent hover:border-white transition-all duration-200 ease-in-out"
							onClick={nextSlide}
						>
							<FaChevronRight className="text-white" />
						</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
	const res = await axios.get(
		`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
	);
	const featuredMovies = res.data.results.slice(0, 10).map((movie: any) => ({
		id: movie.id,
		title: movie.title,
		poster_path: movie.poster_path,
	}));

	return {
		props: {
			featuredMovies,
		},
	};
};

export default Slider;
