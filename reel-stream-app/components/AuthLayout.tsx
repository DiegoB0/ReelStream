import { UserButton, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { PiFilmReelFill } from 'react-icons/pi';
import SearchMovies from './SearchMovies';

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { user } = useUser();
	const router = useRouter();
	const [isSearching, setIsSearching] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const linkClasses = (path: string) =>
		router.pathname === path
			? 'text-base text-neutral-200'
			: 'text-base text-neutral-500';

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleSearchClick = () => {
		setIsSearching(true);
	};

	const handleSearchBlur = () => {
		if (searchQuery === '') {
			setIsSearching(false);
		}
	};

	const handleClearSearch = () => {
		setSearchQuery('');
		setIsSearching(false);
	};

	const handleMovieClick = (movieId: number) => {
		// Handle movie click here, e.g., navigate to movie detail page
		console.log(`Movie clicked: ${movieId}`);
	};

	return (
		<div>
			<Head>
				<meta name="description" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<nav className="bg-neutral-900 p-4 sticky top-0 z-50">
				<div className="container mx-auto flex justify-between items-center">
					<div className="flex justify-center items-center gap-4">
						<Link href="#" className="text-2xl font-bold flex text-gradient">
							<span className="mt-1 px-1 text-purple-500">
								<PiFilmReelFill />
							</span>
							ReelStream
						</Link>
						<div className="flex gap-4">
							<Link href="/Dashboard" className={linkClasses('/Dashboard')}>
								Home
							</Link>
							<Link href="/Films" className={linkClasses('/Films')}>
								Films
							</Link>
							<Link href="/MyList" className={linkClasses('/MyList')}>
								MyList
							</Link>
						</div>
					</div>
					<ul className="flex space-x-4 gap-4">
						<li className="flex items-center justify-center text-neutral-200 relative">
							{!isSearching ? (
								<button
									onClick={handleSearchClick}
									className="flex items-center justify-center text-neutral-200"
								>
									<FaSearch />
								</button>
							) : (
								<div className="relative">
									<input
										type="text"
										autoFocus
										value={searchQuery}
										onChange={handleSearch}
										onBlur={handleSearchBlur}
										className="bg-neutral-950 text-neutral-200 p-1 rounded-md pl-8"
										placeholder="Search..."
									/>
									<button
										className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-200"
										onClick={handleClearSearch}
										style={{ zIndex: 10 }}
									>
										<FaTimes />
									</button>
								</div>
							)}
						</li>
						{user ? (
							<UserButton />
						) : (
							<>
								<li className="px-4 py-2 font-bold border rounded-lg bg-purple-500 hover:bg-purple-600 transition-all duration-200 ease-in-out">
									<Link href="/sign-in" className="text-white">
										Iniciar Sesión
									</Link>
								</li>
								<li className="px-4 py-2 font-bold border rounded-lg hover:border-purple-400 transition-all duration-200 ease-in-out hover:text-purple-400 text-white">
									<Link href="/sign-up">Registrarse</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</nav>
			<main className="bg-neutral-950 min-h-screen text-white relative flex flex-col items-center">
				{isSearching && searchQuery ? (
					<SearchMovies
						searchQuery={searchQuery}
						onMovieClick={handleMovieClick}
					/>
				) : (
					children
				)}
			</main>
		</div>
	);
};

export default Layout;
