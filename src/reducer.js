import {
	ADD_TO_FAVOURITE,
	FETCH_FAILED,
	FETCH_HOMEMOVIE,
	FETCH_INIT,
	FETCH_ITEMS,
	FETCH_SERIES,
	FETCH_SINGLE_MOVIE_DETAILS,
	FETCH_SINGLE_SERIES_DETAILS,
	FETCH_TO_RATED,
	SEARCH_MOVIES,
	SEARCH_SERIES,
	SET_INPUT,
	TOGGLE_FAVOURITE,
} from "./actions";

export const initialState = {
	setInput: "",
	homeMovie: [],
	ToRatedList: [],
	movies: [],
	series: [],
	favourite: JSON.parse(localStorage.getItem("FavouriteList")) || [],
	message: "",
	isInFavourite: false,
	hasMore: false,
	isLoading: false,
	isError: false,
	error: {},
	movieDetails: null,
	seriesDetails: null,
};

// `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

export const reducer = (state, action) => {
	switch (action.type) {
		case SET_INPUT:
			return {
				...state,
				setInput: action.payload,
			};
		case FETCH_INIT:
			return {
				...state,
				isLoading: true,
				isError: false,
			};

		case FETCH_ITEMS:
			return {
				...state,
				movies: [...state.movies, ...action.payload],
				hasMore: action.payload.length > 0,
				isLoading: false,
				isError: false,
			};
		case FETCH_SERIES:
			return {
				...state,
				series: [...state.series, ...action.payload],
				isLoading: false,
				isError: false,
			};

		case FETCH_FAILED:
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.payload,
			};
		case FETCH_SINGLE_MOVIE_DETAILS:
			return {
				...state,
				movieDetails: action.payload,
				isError: false,
				isLoading: false,
			};
		case FETCH_SINGLE_SERIES_DETAILS:
			return {
				...state,
				seriesDetails: action.payload,
				isError: false,
				isLoading: false,
			};
		case TOGGLE_FAVOURITE:
			const newList = [...state.favourite];
			const itemIndex = newList.findIndex(
				(item) => item.id === action.payload.id
			);
			if (itemIndex > -1) {
				newList.splice(itemIndex, 1);
			} else {
				newList.push(action.payload);
			}
			return {
				...state,
				favourite: newList,
				message: "added to favourite",
			};

		case SEARCH_MOVIES:
			return {
				...state,
				movies: action.payload,
				hasMore: action.payload.length > 0,
				isLoading: false,
				isError: false,
			};
		case SEARCH_SERIES:
			return {
				...state,
				series: action.payload,
				hasMore: action.payload.length > 0,
				isLoading: false,
				isError: false,
			};
		case FETCH_HOMEMOVIE:
			return {
				...state,
				homeMovie: [...state.homeMovie, ...action.payload],
				isLoading: false,
				isError: false,
			};

		case FETCH_TO_RATED:
			return {
				...state,
				ToRatedList: [...state.homeMovie, ...action.payload],
				isLoading: false,
				isError: false,
			};
		default:
			return state;
	}
};

