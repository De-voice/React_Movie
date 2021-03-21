import React, { useContext, useEffect, useState } from "react";
import { FETCH_HOMEMOVIE } from "../actions";
import { reqInstance } from "../api/request/req";
import { ApplicationContext } from "../App";
import useFetch from "./useFetch";
import useInfinitScroll from "./useInfinitScroll";

function ToRatedList() {
	const [state, dispatch] = useContext(ApplicationContext);

	const [pageNumber, setPageNumber] = useState(1);
	const end_point = `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false`;
	const actionType = "to_rated";

	const { homeMovie, isLoading, isError, hasMore } = state;
	// custom hook that perform a network req
	useFetch(pageNumber, end_point, actionType);
	//    console.log(homeMovie,"home");
	// infint scroll
	const [lastElementRef] = useInfinitScroll(isLoading, hasMore, setPageNumber);

	const HomeComponent = state.homeMovie.map((item, index) => {
		if (homeMovie.length === index + 1) {
			return (
				<div className="item" ref={lastElementRef} key={item.id}>
					<img
						className="w-44 object-cover"
						src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
						alt=""
					/>
					<h1 className="text-white text-center">{item.title}</h1>
				</div>
			);
		} else {
			return (
				<div className="item" key={item.id}>
					<img
						className="w-44 object-cover"
						src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
						alt=""
					/>
					<h1 className="text-white text-center">{item.title}</h1>
				</div>
			);
		}
	});

	return (
		<>
			{!isLoading || !isError ? HomeComponent : null}
			{isLoading && <h1>Loading...</h1>}
			{isError && "Error"}
		</>
	);
}

export default ToRatedList;
