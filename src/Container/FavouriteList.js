import React, { useContext, useEffect } from "react";
import { ApplicationContext } from "../App";
import Card from "../Components/Card/Card";

function FavouriteList() {
	const [state, dispatch] = useContext(ApplicationContext);

	// console.log(state.favourite);

	

	useEffect(() => {
		localStorage.setItem("FavouriteList", JSON.stringify(state.favourite));
	}, [state.favourite]);

	

	const FavouriteListComponent = state.favourite.map((item) => {
		const { title, vote_average, poster_path, release_date } = item;

		// console.log(item);
		return (
			<Card
				key={item.id}
				title={title}
				rating={vote_average}
				alt={title}
				src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
				year={release_date}
			/>
		);
	});
	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-7 gap-x-1">
			{FavouriteListComponent}
		</div>
	);
}

export default FavouriteList;
