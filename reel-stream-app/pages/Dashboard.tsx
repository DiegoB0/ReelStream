import { RedirectToSignIn, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import React from 'react';

const DashboardPage: React.FC = () => {
	const { user } = useUser();

	return (
		<div>
			<SignedIn>
				<h1>Welcome, {user?.fullName}</h1>
			</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</div>
	);
};

export default DashboardPage;
