import { useRef,useCallback } from "react";

function useInfinitScroll(isLoading,hasMore,setPageNumber) {
	const observer = useRef();
	const lastElementRef = useCallback(
		(node) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber(
						(previousPageNumber) =>
							(previousPageNumber = previousPageNumber + 1)
					);
				}
			});
			console.log(node,"node");
			if (node) observer.current.observe(node);
		},
		[isLoading, hasMore,setPageNumber]
	);
	return [lastElementRef];
}

export default useInfinitScroll;
