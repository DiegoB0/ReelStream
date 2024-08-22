import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
	id: number;
	title: string;
	poster_path: string;
}

interface FavoritesState {
	favoriteMovies: Movie[];
}

const initialState: FavoritesState = {
	favoriteMovies: [],
};

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addMovieToFavorites(state, action: PayloadAction<Movie>) {
			state.favoriteMovies.push(action.payload);
		},
		removeMovieFromFavorites(state, action: PayloadAction<number>) {
			state.favoriteMovies = state.favoriteMovies.filter(
				(movie) => movie.id !== action.payload
			);
		},
		setFavoriteMovies(state, action: PayloadAction<Movie[]>) {
			state.favoriteMovies = action.payload;
		},
	},
});

export const {
	addMovieToFavorites,
	removeMovieFromFavorites,
	setFavoriteMovies,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
