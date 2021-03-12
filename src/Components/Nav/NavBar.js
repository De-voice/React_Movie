import React from 'react'
import TopBar1 from './TopBar1'
import TopBar2 from './TopBar2'

function NavBar() {
    return (
			<nav className="bg-gray-800 fixed z-50 w-screen">
				<TopBar1 />
				<TopBar2 />
			</nav>
		);
}

export default NavBar
