import axios from "axios";
import { useContext, useEffect } from "react";
import { FETCH_FAILED, FETCH_INIT, FETCH_ITEMS, FETCH_SERIES } from "../actions";
import { reqInstance } from "../api/request/req";
import { ApplicationContext } from "../App";

function useFetch(pageNumber, endpoint,dispatchType) {
	const [state, dispatch] = useContext(ApplicationContext);
let actionType = "";

	if(dispatchType === "movies"){
        actionType = FETCH_ITEMS;
	};
	if(dispatchType === "series"){
		actionType = FETCH_SERIES;
	};

	useEffect(() => {
		let cancle;
		dispatch({ type: FETCH_INIT });
		reqInstance
			.get(endpoint, {
				params: { page: pageNumber },
				cancelToken: new axios.CancelToken((c) => (cancle = c)),
			})
			.then((res) => {
				dispatch({ type: actionType, payload: res.data.results });
			})
			.catch((err) => {
				dispatch({ type: FETCH_FAILED, payload: err });
				console.log(err);
			});
		return () => cancle();
	}, [dispatch, pageNumber, endpoint,actionType]);

	return;
}

export default useFetch;
