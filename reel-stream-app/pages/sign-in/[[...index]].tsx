import { SignIn } from '@clerk/nextjs';

export default function Page() {
	return (
		<div className="mt-4">
			<SignIn />
		</div>
	);
}
