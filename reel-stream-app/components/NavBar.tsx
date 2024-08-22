import { useClerk, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { PiFilmReelFill } from 'react-icons/pi';

const NavBar: React.FC = () => {
	const { user } = useUser();
	const { signOut } = useClerk();

	return (
		<nav className="bg-neutral-900 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/" className="text-2xl font-bold flex text-gradient">
					<span className="mt-1 px-1 text-purple-500">
						<PiFilmReelFill />
					</span>
					ReelStream
				</Link>
				<ul className="flex space-x-4">
					{user ? (
						<li
							onClick={() => signOut()}
							className="px-4 py-2 font-bold border rounded-lg bg-purple-500 hover:bg-purple-600 transition-all duration-200 ease-in-out cursor-pointer text-white"
						>
							Sign Out
						</li>
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
	);
};

export default NavBar;
