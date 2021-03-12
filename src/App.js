import React, { createContext, useReducer } from "react";
import { Switch, Route } from "react-router-dom";
import { reducer, initialState } from "./reducer";
import NavBar from "./Components/Nav/NavBar";
import Movie from "./pages/Movie";
import Series from "./pages/Series";
import NotFound from "./pages/NotFound";
import SingleMovie from "./pages/SingleMovie";
import SingleSeries from "./pages/SingleSeries"
import Favourite from "./pages/Favourite";

export const ApplicationContext = createContext(null);

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className="w-full h-screen bg-white  ">
			<ApplicationContext.Provider value={[state, dispatch]}>
				<NavBar />
				<Switch>
					<Route exact path="/">
						<h1 className="text-black">Welcome home</h1>
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
