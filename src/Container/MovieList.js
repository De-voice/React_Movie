import React, {
	useEffect,
	useContext,
	useCallback,
	useState,
	useRef,
} from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { ApplicationContext } from "../App";
import Card from "../Components/Card/Card";
import Loader from "../Components/Loader/Loader";
import useFetch from "./useFetch";

function MovieList() {
	const [state,dispatch] = useContext(ApplicationContext);
	const [pageNumber, setPageNumber] = useState(1);
const end_point = `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
const actionType = "movies";

// custom hook that perform a network req
	 useFetch(pageNumber, end_point, actionType);


	const { movies, isLoading, isError, hasMore } = state;

	const observer = useRef();

	const lastElementRef = useCallback(
		(node) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber(
						(previousPageNumber) =>
							(previousPageNumber = previousPageNumber + 1)
					);
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoading, hasMore]
	);

	// const addToFavourite = (item) => {
	// 	dispatch({ type: ADD_TO_FAVOURITE, payload: item });
	// };

	// <Icon
	// 	className={`fas fa-heart cursor-pointer text-black`}
	// 	onClick={() => addToFavourite(item)}
	// />;
	// const match = useRouteMatch();

	const MovieListComponent = movies.map((item, index) => {
		const { title, vote_average, poster_path,id } = item;
		if (movies.length === index +1) {
			return (
				<Card
					id={id}
					lastElementRef={lastElementRef}
					lastRef
					alt={title}
					key={item.id}
					title={title}
					vote_average={vote_average}
					src={`https://image.tmdb.org/t/p/w500/${poster_path}`}></Card>
			);
		} else {
			return (
				<Card
					id={id}
					alt={title}
					key={item.id}
					title={title}
					vote_average={vote_average}
					src={`https://image.tmdb.org/t/p/w500/${poster_path}`}></Card>
			);
		}
	});

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-7 gap-x-1">
			{!isLoading || !isError ? MovieListComponent : null}
			{isLoading && <Loader />}
			{!isError && "Error"}
		</div>
	);
}

export default MovieList;
