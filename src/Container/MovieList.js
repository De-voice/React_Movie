import React, {
	useEffect,
	useContext,
	useCallback,
	useState,
	useRef,
} from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { ApplicationContext } from "../App";
import { reqInstance } from "../api/request/req";
import Card from "../Components/Card/Card";
import {
	ADD_TO_FAVOURITE,
	FETCH_FAILED,
	FETCH_INIT,
	FETCH_ITEMS,
} from "../actions";
import Icon from "../Components/Icons/Icon";
import Loader from "../Components/Loader/Loader";
import useFetch from "./useFetch";

function MovieList() {
	const [dispatch] = useContext(ApplicationContext);
	const [pageNumber, setPageNumber] = useState(1);

	const { state, hasMore } = useFetch(pageNumber);
	const { movies, isLoading, isError } = state;

	const observer = useRef();

	const lastElementRef = useCallback(
		(node) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					console.log("got it");
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

	const addToFavourite = (item) => {
		dispatch({ type: ADD_TO_FAVOURITE, payload: item });
	};

	// const match = useRouteMatch();

	const MovieListComponent = movies.map((item, index) => {
		const { title, vote_average, poster_path, release_date } = item;
		if (movies.length === index +1) {
			return (
				<Card
					lastElementRef={lastElementRef}
					alt={title}
					key={item.id}
					title={title}
					rating={vote_average}
					src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
					year={release_date}>
					<Icon
						className={`fas fa-heart cursor-pointer text-black `}
						onClick={() => addToFavourite(item)}
					/>
				</Card>
			);
		} else {
			return (
				<Card
					alt={title}
					key={item.id}
					title={title}
					rating={vote_average}
					src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
					year={release_date}>
					<Icon
						className={`fas fa-heart cursor-pointer text-black`}
						onClick={() => addToFavourite(item)}
					/>
				</Card>
			);
		}
	});

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-7 gap-x-1">
			{isLoading ? <Loader /> : <> {MovieListComponent} </>}
		</div>
	);
}

export default MovieList;
