const SkeletonLoader: React.FC = () => {
	return (
		<div className="bg-neutral-950 text-white">
			<div className="container mx-auto py-8">
				<div className="relative">
					<h1 className="text-4xl font-bold text-neutral-700 p-4">Movies</h1>
					<div className="relative w-full max-w-screen-xl mx-auto">
						<div className="grid grid-cols-1 gap-x-4 overflow-hidden">
							{/* Navigation Buttons */}
							<div className="absolute top-1/2 left-3 transform -translate-y-1/2 flex items-center">
								<div className="w-12 h-12 bg-neutral-700 animate-pulse rounded-full"></div>
							</div>
							<div className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center">
								<div className="w-12 h-12 bg-neutral-700 animate-pulse rounded-full"></div>
							</div>

							{/* Card Skeletons */}
							<div className="flex space-x-4">
								<div className="flex-shrink-0 w-[240px] h-[340px] p-4">
									<div className="w-full h-full bg-neutral-700 animate-pulse rounded-lg"></div>
								</div>
								<div className="flex-shrink-0 w-[240px] h-[340px] p-4">
									<div className="w-full h-full bg-neutral-700 animate-pulse rounded-lg"></div>
								</div>
								<div className="flex-shrink-0 w-[240px] h-[340px] p-4">
									<div className="w-full h-full bg-neutral-700 animate-pulse rounded-lg"></div>
								</div>
								<div className="flex-shrink-0 w-[240px] h-[340px] p-4">
									<div className="w-full h-full bg-neutral-700 animate-pulse rounded-lg"></div>
								</div>
								<div className="flex-shrink-0 w-[240px] h-[340px] p-4">
									<div className="w-full h-full bg-neutral-700 animate-pulse rounded-lg"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkeletonLoader;
