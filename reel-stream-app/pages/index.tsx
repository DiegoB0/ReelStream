import axios from 'axios';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import moviesBg from '../assets/movies.jpg';
import NavBar from '../components/NavBar';
import Slider from '../components/Slider';

type Movie = {
	id: number;
	title: string;
	poster_path: string;
};

type HomeProps = {
	featuredMovies: Movie[];
};

const Home: React.FC<HomeProps> = ({ featuredMovies }) => {
	return (
		<div>
			<NavBar />
			<Head>
				<title>ReelStream</title>
				<meta name="description" content="A Netflix-like streaming platform" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="bg-neutral-950 min-h-screen text-white relative">
				<div
					className="container mx-auto h-[400px] relative z-0 flex flex-col justify-center bg-cover bg-center bg-no-repeat"
					style={{
						backgroundImage: `url(${moviesBg.src})`,
					}}
				>
					<div className="text-center mb-8 bg-black bg-opacity-80 h-[300px] flex flex-col items-center justify-center">
						<div className="mb-4">
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-200 mb-2">
								Descubre un mundo de películas en ReelStream
							</h1>
							<p className="text-lg md:text-xl lg:text-2xl text-gray-400">
								Explora nuestra colección única y disfruta del mejor
								entretenimiento
							</p>
						</div>
						<ul>
							<li className="px-4 py-2 font-bold border rounded-lg bg-purple-500 hover:bg-purple-600 transition-all duration-200 ease-in-out">
								<Link href="/movies" className="text-white">
									¡Iniciar Ahora!
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="container mx-auto py-8 relative z-0">
					<Slider featuredMovies={featuredMovies} />
				</div>
			</main>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	try {
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
	} catch (error) {
		console.error('Failed to fetch data:', error);
		return {
			props: {
				featuredMovies: [],
			},
		};
	}
};

export default Home;
