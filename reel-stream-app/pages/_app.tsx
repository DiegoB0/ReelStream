import type { AppProps } from 'next/app';
import ClerkProviderWrapper from '../providers/clerkProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ClerkProviderWrapper>
			<Component {...pageProps} />
		</ClerkProviderWrapper>
	);
}

export default MyApp;
