import React from 'react';
import { FaTimes } from 'react-icons/fa';

type TrailerModalProps = {
	isOpen: boolean;
	trailerUrl: string;
	onClose: () => void;
};

const TrailerModal: React.FC<TrailerModalProps> = ({
	isOpen,
	trailerUrl,
	onClose,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
			<div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
				<button
					className="absolute top-4 right-4 text-white text-2xl"
					onClick={onClose}
				>
					<FaTimes />
				</button>
				<iframe
					className="w-full h-96"
					src={trailerUrl}
					title="Trailer"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>
		</div>
	);
};

export default TrailerModal;
