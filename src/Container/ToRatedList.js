
import React, { useContext,  useState } from "react";
import { ApplicationContext } from "../App";
import useFetch from "./useFetch";
import useInfinitScroll from "./useInfinitScroll";

function ToRatedList() {
	const [state, dispatch] = useContext(ApplicationContext);

	const [pageNumber, setPageNumber] = useState(1);
	const end_point = `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
	const actionType = "to_rated";


	const { ToRatedList, isLoading, isError, hasMore } = state;

	// custom hook that perform a network req
	useFetch(pageNumber, end_point, actionType);
	
	// infint scroll
	const [lastElementRef] = useInfinitScroll(isLoading, hasMore, setPageNumber);

	const HomeComponent = state.ToRatedList.map((item, index) => {
		if (ToRatedList.length === index + 1) {
			return (
				<div
					className="item transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110 mx-2"
					ref={lastElementRef}
					key={item.id}>
					<img
						className="w-44 object-cover h-56"
						src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
						alt=""
					/>
					<h1 className="text-white text-center text-xs">{item.title}</h1>
				</div>
			);
		} else {
			return (
				<div
					className="item transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110 mx-2"
					key={item.id}>
					<img
						className="w-44 object-cover"
						src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
						alt=""
					/>
					<h1 className="text-white text-center text-xs">{item.title}</h1>
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
