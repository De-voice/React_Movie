import React, { useContext, useState, useEffect, useCallback } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { FETCH_ITEMS, SEARCH_MOVIES, SEARCH_SERIES, SET_INPUT } from "../../actions";
import { ApplicationContext } from "../../App";
import Icon from "../Icons/Icon";
import Input from "./Input";
import { reqInstance } from "../../api/request/req";

function SearchBar() {
	const [state, dispatch] = useContext(ApplicationContext);

	//  func to get access to the user input
	const handleChange = (e) => {
		const value = e.target.value;
		dispatch({ type: SET_INPUT, payload: value });
	};
	const { setInput } = state;

	const match = useRouteMatch();
	const location = useLocation();
	let history = useHistory();
// https://api.themoviedb.org/3/search/tv?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
	const handleSearch = useCallback(() => {
		const path = location.pathname;
		const chars = path.split("/");
		if (chars[1] === "") {
			console.log("we are now in home");
		}
		if (chars[1] === "movie") {
			console.log("we are now in movies");
			if(setInput === "") return
			reqInstance.get(`/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&include_adult=false`,{params:{query:setInput}})
				.then((res) => {
					console.log(res, "movies endpoint");
					dispatch({ type: SEARCH_MOVIES, payload: res.data.results });
				});
		}
		if (chars[1] === "favourite") {
			history.push("/movie");
			console.log("we are now in favourite");
			reqInstance.get(`/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&include_adult=false`,{params:{query:setInput}})
				.then((res) => {
					console.log(res, "movies endpoint");
					dispatch({ type: SEARCH_MOVIES, payload: res.data.results });
				});
		}
		if (chars[1] === "series") {
			if (setInput === "") return;
			console.log("we are now in series");
			reqInstance.get(`/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&include_adult=false`,{params:{query:setInput}})
				.then((res) => {
					console.log(res, "series endpoint");
					dispatch({ type: SEARCH_SERIES, payload: res.data.results });
				});
		}
		console.log(chars[1]);
	},[dispatch,history,setInput,location.pathname]);


	const handleSubmit = (e) => {
		e.preventDefault();
		handleSearch();
		state.setInput = "";
	};

	return (
		<form className="relative " onSubmit={handleSubmit}>
			<Icon className="fas fa-search sm:fa-lg absolute text-gray-600 top-1 sm:top-3 sm:left-56" />
			<Input
				className="sm:w-64 sm:py-2  text-black sm:px-4 outline-none border rounded-2xl"
				type="text"
				value={setInput}
				onChange={handleChange}
				placeholder="search..."
			/>
		</form>
	);
}

export default SearchBar;
