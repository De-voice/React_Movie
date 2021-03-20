import React, { createContext, useReducer,useEffect } from "react";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import { reducer, initialState } from "./reducer";
import NavBar from "./Components/Nav/NavBar";
import Movie from "./pages/Movie";
import Series from "./pages/Series";
import NotFound from "./pages/NotFound";
import SingleMovie from "./pages/SingleMovie";
import SingleSeries from "./pages/SingleSeries"
import Favourite from "./pages/Favourite";
import { TOGGLE_FAVOURITE } from "./actions";
import Home from "./pages/Home";

export const ApplicationContext = createContext(null);

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);


	/*
	 add to favourite
	 toggle between add and remove from favourite
	*/
	const toggleWatchList = (selectedItem) => {
		dispatch({ type: TOGGLE_FAVOURITE, payload: selectedItem });
	};

	return (
		<div className="w-full h-screen bg-white  ">
			<ApplicationContext.Provider value={[state, dispatch, toggleWatchList]}>
				<NavBar />
				<Switch>
					<Route exact path="/">
						<Home/>
					</Route>
					<Route exact path="/movie">
						<Movie />
					</Route>

					<Route path="/movie/:id">
						<SingleMovie />
					</Route>

					<Route exact path="/series">
						<Series />
					</Route>
					<Route path="/series/:id">
						<SingleSeries />
					</Route>

					<Route path="/favourite">
						<Favourite />
					</Route>

					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</ApplicationContext.Provider>
		</div>
	);
}

export default App;
