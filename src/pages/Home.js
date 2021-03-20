import "../App.css"
import React,{ useEffect,useContext } from "react";
import { FETCH_HOMEMOVIE } from "../actions";
import { reqInstance } from "../api/request/req";
import { ApplicationContext } from "../App";
import Test2 from "../assets/test2.jpg";


//  videos
// https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US

// latest
// https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US

// top_rated
// https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1

// theatres
// https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1

function Home() {
	
	const [ state,dispatch ] = useContext(ApplicationContext);

	useEffect(() => {
          reqInstance.get(`/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
		  .then(res => {
			// console.log(res);
			  dispatch({type:FETCH_HOMEMOVIE,payload:res.data.results})

		  })
		  .catch(err => {
			  console.log(err);
		  })
		  
	},[dispatch]);


	// const HomeComponent = state.homeMovie.map(item => {
	// 	console.log(item);
	// 	return (
	// 		<div className="">
	// 			<img
	// 				src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
	// 				alt=""
	// 			/>
	// 			<h1 className="text-black">{item.title}</h1>
	// 		</div>
	// 	);
	// })


	return (
		<>
			<div style={{ paddingTop: "125px", paddingBottom: "7px" }}>
				<h1>Latest Movies</h1>
				<div className="  block box-border w-full overflow-x-scroll mt-7">
					<div className="slider_container">
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
					</div>
				</div
				<h1 className="mt-10">Top Rated Movies</h1>
				<div className="horizontal_slider mt-7">
					<div className="slider_container">
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
						<div className="item">
							<img src={Test2} alt="" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
