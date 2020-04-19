import React from 'react';
import './screen.css';

export default ({ display, entry }) => {
	return (
		<div id='screen'>
		<p id='display'>{ display }</p>
		<p id='entry'>{ entry }</p>
		</div>
		);
}