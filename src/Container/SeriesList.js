import React, { useCallback, useContext, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { ApplicationContext } from "../App";
import { FETCH_INIT, FETCH_FAILED, FETCH_SERIES } from "../actions";
import { reqInstance } from "../api/request/req";
import Card from "../Components/Card/Card";
import Icon from "../Components/Icons/Icon";
import Loader from "../Components/Loader/Loader";

function SeriesList() {
	const [state, dispatch] = useContext(ApplicationContext);
	const { series, isLoading, isError } = state;

	console.log({ series });
	const getSeries = useCallback(() => {
		dispatch({ type: FETCH_INIT });
		reqInstance
			.get(
				`/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
			)
			.then((res) => {
				console.log(res);
				dispatch({ type: FETCH_SERIES, payload: res.data.results });
			})
			.catch((err) => {
				//  console.log(err.);
				dispatch({ type: FETCH_FAILED, payload: err });
			});
	}, [dispatch]);

	useEffect(() => {
		getSeries();
	}, [getSeries]);

	const match = useRouteMatch();

	const SeriesListComponent = series.map((item) => {
		const { name, poster_path, vote_average, first_air_date } = item;
		return (
			<Link
				to={`${match.url}/${item.id}`}
				key={item.id}
				className="cursor-default">
				<Card
					title={name}
					year={first_air_date}
					rating={vote_average}
					alt={name}
					src={`https://image.tmdb.org/t/p/w500/${poster_path}`}>
					<Icon
						className="fas fa-heart cursor-pointer text-black"
						onClick={() => console.log(item.id)}
					/>
				</Card>
			</Link>
		);
	});

	return (
		<div className=" text-center">
			<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-7 gap-x-1  ">
				{isLoading ? <Loader /> : <> {SeriesListComponent} </>}
			</div>
		</div>
	);
}

export default SeriesList;
