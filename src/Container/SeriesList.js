import React, { useRef, useContext, useState, useCallback } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { ApplicationContext } from "../App";
import Card from "../Components/Card/Card";
import Svg from "../Components/Icons/Svg";
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
		const uniqueId = Date.now() + id;
		const newId = [...new Set([uniqueId])];

		if (series.length === index + 1) {
			return (
				<Card
					id={id}
					key={newId}
					lastElementRef={lastElementRef}
					lastRef
					title={name}
					vote_average={vote_average}
					alt={name}
					src={`https://image.tmdb.org/t/p/w500/${poster_path}`}>
					<Svg
						className="w-5 h-5"
						fill="blue"
						stroke="currentColor"
						viewBox="0 0 24 24"
						strokeLinejoin="round"
						strokeLinecap="round"
						strokeWidth="2"
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						xmlns="http://www.w3.org/2000/svg"
					/>
					<span
						className="text-blue-500 hover:text-white cursor-pointer"
						onClick={() => toggleWatchList(item)}>
						WatchList
					</span>
				</Card>
			);
		} else {
			return (
				<Card
					id={id}
					key={newId}
					title={name}
					vote_average={vote_average}
					alt={name}
					src={`https://image.tmdb.org/t/p/w500/${poster_path}`}>
					<Svg
						className="w-5 h-5"
						fill="blue"
						stroke="currentColor"
						viewBox="0 0 24 24"
						strokeLinejoin="round"
						strokeLinecap="round"
						strokeWidth="2"
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						xmlns="http://www.w3.org/2000/svg"
					/>
					<span
						className="text-blue-500 hover:text-white cursor-pointer"
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
