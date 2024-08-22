import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClerkProviderWrapper from '../providers/clerkProvider';
import { store } from '../store/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<ClerkProviderWrapper>
				<Head>
					<title>ReelStream</title>
					<link rel="icon" type="image/png" sizes="16x16" href="/movie.png" />
					<meta name="description" content="Your default description" />
				</Head>

				<Component {...pageProps} />

				<ToastContainer />
			</ClerkProviderWrapper>
		</Provider>
	);
}

export default MyApp;
