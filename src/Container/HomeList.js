import React, { useContext, useEffect } from 'react'
import { FETCH_HOMEMOVIE } from '../actions';
import { reqInstance } from '../api/request/req';
import { ApplicationContext } from '../App';

function HomeList() {
    	
	const [state, dispatch] = useContext(ApplicationContext);

	useEffect(() => {
		reqInstance.get(`/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
			.then((res) => {
				// console.log(res);
				dispatch({ type: FETCH_HOMEMOVIE, payload: res.data.results });
			})
			.catch((err) => {
				console.log(err);
			});
	}, [dispatch]);

	const HomeComponent = state.homeMovie.map((item) => {
		console.log(item);
		return (
			<>
				<img
					src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
					alt=""
				/>
				<h1 className="text-black">{item.title}</h1>
			</>
		);


	});
    return (
        <div>
            {HomeComponent}
        </div>
    )
}

export default HomeList
