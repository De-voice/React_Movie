import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { FETCH_FAILED, FETCH_INIT, FETCH_ITEMS } from "../actions";
import { reqInstance } from "../api/request/req";
import { ApplicationContext } from "../App";

function useFetch(pageNumber) {
	const [hasMore, setHasMore] = useState(false);
	const [state, dispatch] = useContext(ApplicationContext);
	// const getMovies = useCallback(() => {}, [dispatch, pageNumber]);

	useEffect(() => {
        let cancle;
		dispatch({ type: FETCH_INIT });
		reqInstance
			.get(`/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
				{ params: { page: pageNumber },
                cancelToken:new axios.CancelToken(c => cancle = c)
             }
                
			)
			.then((res) => {
				dispatch({ type: FETCH_ITEMS, payload: res.data.results });
				setHasMore(res.data.results.length > 0);
			})
			.catch((err) => {
				dispatch({ type: FETCH_FAILED, payload: err });
				console.log(err);
			});
            return () => cancle()
	}, [dispatch,pageNumber]);

	return { state, hasMore };
}

export default useFetch;
