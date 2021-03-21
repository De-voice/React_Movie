import React from 'react'

function Loader() {
    return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(n => <Skeleton key={n}/>)
}


const Skeleton = () => {
	return (
		<div className="shadow mt-20  p-4 w-56">
			<div className="animate-pulse flex justify-center">
				<div className=" bg-gray-300 w-56  h-56"></div>
			</div>
		</div>
	);
}

export default Loader
