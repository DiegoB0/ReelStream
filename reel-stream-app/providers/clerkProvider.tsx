import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';
import { ReactNode } from 'react';
import AuthLayout from '../components/AuthLayout';
import Layout from '../components/Layout';

interface ClerkProviderWrapperProps {
	children: ReactNode;
}

const ClerkProviderWrapper: React.FC<ClerkProviderWrapperProps> = ({
	children,
}) => {
	return (
		<ClerkProvider>
			<SignedIn>
				<AuthLayout>{children}</AuthLayout>
			</SignedIn>
			<SignedOut>
				<Layout>{children}</Layout>
			</SignedOut>
		</ClerkProvider>
	);
};

export default ClerkProviderWrapper;
