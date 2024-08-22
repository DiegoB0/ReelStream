import type { NextApiRequest, NextApiResponse } from 'next';

const API_URL = 'http://localhost:5000';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;
	const { userId } = req.query;

	switch (method) {
		case 'POST':
			try {
				const { movieId, title, poster_path } = req.body;
				const response = await fetch(
					`${API_URL}/api/movies/favorites/${userId}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ movieId, title, poster_path }),
					}
				);
				const data = await response.json();
				res.status(response.status).json(data);
			} catch (error) {
				res.status(500).json({ error: 'Failed to add movie to favorites' });
			}
			break;

		case 'GET':
			try {
				const response = await fetch(
					`${API_URL}/api/movies/favorites/${userId}`,
					{
						method: 'GET',
					}
				);
				const data = await response.json();
				res.status(response.status).json(data);
			} catch (error) {
				res.status(500).json({ error: 'Failed to fetch favorite movies' });
			}
			break;

		case 'DELETE':
			try {
				const { movieId } = req.body;
				const response = await fetch(
					`${API_URL}/api/movies/favorites/${userId}/${movieId}`,
					{
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ movieId }),
					}
				);
				const data = await response.json();
				res.status(response.status).json(data);
			} catch (error) {
				res
					.status(500)
					.json({ error: 'Failed to remove movie from favorites' });
			}
			break;

		default:
			res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};

export default handler;
