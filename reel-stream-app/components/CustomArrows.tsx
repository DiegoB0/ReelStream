import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CustomPrevArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => (
	<button
		type="button"
		onClick={onClick}
		className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10 text-white"
		style={{ zIndex: 10, left: '-30px' }}
	>
		<FaChevronLeft className="text-white" />
	</button>
);

const CustomNextArrow: React.FC<{ onClick: () => void }> = ({ onClick }) => (
	<button
		type="button"
		onClick={onClick}
		className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full z-10 text-white"
		style={{ zIndex: 10, right: '-30px' }}
	>
		<FaChevronRight className="text-white" />
	</button>
);

export { CustomNextArrow, CustomPrevArrow };
