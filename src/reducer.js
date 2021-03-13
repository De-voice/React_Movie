import {
	ADD_TO_FAVOURITE,
	FETCH_FAILED,
	FETCH_INIT,
	FETCH_ITEMS,
	FETCH_SERIES,
	FETCH_SINGLE_MOVIE_DETAILS,
	FETCH_SINGLE_SERIES_DETAILS,
	SET_INPUT,
} from "./actions";

export const initialState = {
	setInput: "",
	movies: [],
	series: [],
	favourite: JSON.parse(localStorage.getItem("FavouriteList")) || [],
	message: "",
	isInFavourite: false,
	hasMore:false,
	isLoading: true,
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
				movies: [...state.movies,...action.payload],
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
		case ADD_TO_FAVOURITE:
			return {
				...state,
				favourite: [...state.favourite, action.payload],
				message: "added to favourite",
			};

		default:
			return state;
	}
};


	// className="w-full  sm:w-36 sm:h-56 mt-3 "
	// 				style={{ objectFit: "cover" }}