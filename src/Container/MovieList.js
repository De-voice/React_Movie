import React, {
	useContext,
	useCallback,
	useState,
	useRef,
} from "react";
import {TOGGLE_FAVOURITE } from "../actions";
import { ApplicationContext } from "../App";
import Card from "../Components/Card/Card";
import Svg from "../Components/Icons/Svg";
import Loader from "../Components/Loader/Loader";
import useFetch from "./useFetch";
import useInfinitScroll from "./useInfinitScroll";

function MovieList() {
	const [state, dispatch, toggleWatchList] = useContext(ApplicationContext);
	const [pageNumber, setPageNumber] = useState(1);
	const end_point = `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
	const actionType = "movies";



	const { movies, isLoading, isError, hasMore,error } = state;

	// custom hook that perform a network req
	useFetch(pageNumber, end_point, actionType);
	// infint scroll
	const [lastElementRef] = useInfinitScroll(isLoading, hasMore, setPageNumber);
// console.log(movies);

	const MovieListComponent = movies.map((item, index) => {
		const { title, vote_average, poster_path, id } = item;
		const uniqueId = Date.now() + id;
		const newId = [...new Set([uniqueId])];

		
		if (movies.length === index + 1) {
			return (
				<Card
					id={id}
					lastElementRef={lastElementRef}
					lastRef
					alt={title}
					key={newId}
					title={title}
					vote_average={vote_average}
					src={`https://image.tmdb.org/t/p/w500/${poster_path}`}>
					<Svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-5 h-5"
						fill="blue"
						stroke="currentColor"
						viewBox="0 0 24 24"
						strokeLinejoin="round"
						strokeLinecap="round"
						strokeWidth="2"
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					/>
					<span
						className="text-blue-500  hover:text-white cursor-pointer"
						onClick={() => toggleWatchList(item)}>
						WatchList
					</span>
				</Card>
			);
		} else {
			return (
				<Card
					id={id}
					alt={title}
					key={newId}
					title={title}
					vote_average={vote_average}
					src={`https://image.tmdb.org/t/p/w500/${poster_path}`}>
					<Svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-5 h-5"
						fill="blue"
						stroke="currentColor"
						viewBox="0 0 24 24"
						strokeLinejoin="round"
						strokeLinecap="round"
						strokeWidth="2"
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					/>
					<span
						className="text-blue-500 text-xs hover:text-white cursor-pointer"
						onClick={() => toggleWatchList(item)}>
						WatchList
					</span>
				</Card>
			);
		}
	});

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-5 lg:grid-cols-7 gap-x-1 gap-y-1">
				{!isLoading || !isError ? MovieListComponent : null}
				{isLoading && <Loader />}
			</div>
			{isError && <h1 className="text-center mt-20">{error.message}</h1>}
		</>
	);
}

export default MovieList;
