import React from 'react'
import css from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'
const NavigationItems=()=>(
		<ul className={css.NavigationItems}>
			<NavigationItem link='/'>Burger Builder</NavigationItem>
			<NavigationItem link='/orders'>Orders</NavigationItem>
		</ul>

	);
export default NavigationItems