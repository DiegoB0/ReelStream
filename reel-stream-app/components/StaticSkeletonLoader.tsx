const StaticSkeletonLoader: React.FC = () => {
	return (
		<div className="bg-neutral-950 text-white">
			<div className="container mx-auto py-8">
				<div className="relative">
					<div className="relative w-full max-w-screen-xl mx-auto">
						<div className="grid grid-cols-1 gap-x-4 overflow-hidden">
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

export default StaticSkeletonLoader;
