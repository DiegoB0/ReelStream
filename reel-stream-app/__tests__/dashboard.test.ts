import { useUser } from '@clerk/nextjs';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import DashboardPage from '../pages/Dashboard'; // Asegúrate de que esta ruta es correcta

// Crear una instancia de MockAdapter antes de cada prueba
let mock: MockAdapter;

beforeEach(() => {
	mock = new MockAdapter(axios);
});

// Restaurar el MockAdapter después de cada prueba
afterEach(() => {
	mock.restore();
});

test('should display loading state initially', () => {
	// Simula un usuario autenticado
	(useUser as jest.Mock).mockReturnValue({ user: { fullName: 'John Doe' } });

	render(<DashboardPage />);

	expect(screen.getByText('Welcome, John Doe!')).toBeInTheDocument();
});

test('should display movies when data is fetched', async () => {
	// Simula un usuario autenticado
	(useUser as jest.Mock).mockReturnValue({ user: { fullName: 'John Doe' } });

	// Configura los mocks de las solicitudes HTTP
	mock
		.onGet(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?feature=top`)
		.reply(200, [
			{
				id: 1,
				title: 'Top Movie 1',
				poster_path: '/top1.jpg',
				trailerUrl: 'http://trailer1',
			},
		]);
	mock
		.onGet(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?feature=popular`)
		.reply(200, [
			{
				id: 2,
				title: 'Popular Movie 1',
				poster_path: '/popular1.jpg',
				trailerUrl: 'http://trailer2',
			},
		]);
	mock
		.onGet(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?feature=upcoming`)
		.reply(200, [
			{
				id: 3,
				title: 'Upcoming Movie 1',
				poster_path: '/upcoming1.jpg',
				trailerUrl: 'http://trailer3',
			},
		]);

	render(<DashboardPage />);

	// Espera a que los datos se muestren en la pantalla
	await waitFor(() => {
		expect(screen.getByText('Top Movies')).toBeInTheDocument();
		expect(screen.getByText('Popular Movies')).toBeInTheDocument();
		expect(screen.getByText('Upcoming Movies')).toBeInTheDocument();
	});
});

test('should redirect to sign in if not signed in', () => {
	// Simula un usuario no autenticado
	(useUser as jest.Mock).mockReturnValue({ user: null });

	render(<DashboardPage />);

	expect(screen.getByText('Redirecting to sign in...')).toBeInTheDocument();
});
