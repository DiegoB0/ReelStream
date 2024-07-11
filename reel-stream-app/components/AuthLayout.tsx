import Head from 'next/head';
import { ReactNode } from 'react';
import NavBar from '../components/NavBar';

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div>
			<Head>
				<meta name="description" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavBar />
			<main className="bg-red-950 min-h-screen text-white relative flex flex-col  items-center">
				{children}
			</main>
		</div>
	);
};

export default Layout;
