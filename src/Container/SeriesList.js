import React, { useRef, useContext, useState, useCallback } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { ApplicationContext } from "../App";
import Card from "../Components/Card/Card";
import Loader from "../Components/Loader/Loader";
import useFetch from "./useFetch";
import useInfinitScroll from "./useInfinitScroll";

function SeriesList() {
	const [state, dispatch, toggleWatchList] = useContext(ApplicationContext);
	const { series, isLoading, isError, hasMore } = state;
	const [pageNumber, setPageNumber] = useState(1);

	const actionType = "series";
	const end_point = `/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

	// custom hook that perform a network req
	useFetch(pageNumber, end_point, actionType);

	// infint scroll
	const [ lastElementRef] = useInfinitScroll(isLoading, hasMore, setPageNumber);

	const SeriesListComponent = series.map((item, index) => {
		const { name, poster_path, vote_average, id } = item;

		if (series.length === index + 1) {
			return (
				<Card
					id={id}
					key={item.id}
					lastElementRef={lastElementRef}
					lastRef
					title={name}
					vote_average={vote_average}
					alt={name}
					src={`https://image.tmdb.org/t/p/w500/${poster_path}`}>
					<span
						className="text-blue-500 cursor-pointer"
						onClick={() => toggleWatchList(item)}>
						WatchList
					</span>
				</Card>
			);
		} else {
			return (
				<Card
					id={id}
					key={item.id}
					title={name}
					vote_average={vote_average}
					alt={name}
					src={`https://image.tmdb.org/t/p/w500/${poster_path}`}>
					<span
						className="text-blue-500 cursor-pointer"
						onClick={() => toggleWatchList(item)}>
						WatchList
					</span>
				</Card>
			);
		}
	});

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-7 gap-x-1  ">
			{isLoading && <Loader />}
			{isError && "Error"}
			{!isLoading || !isError ? SeriesListComponent : null}
		</div>
	);
}

export default SeriesList;
