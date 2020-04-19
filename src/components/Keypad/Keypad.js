import React from 'react';
import Button from '../Button/Button';
import btnValues from '../btnValues';
import './keypad.css';

export default ({ handler }) => {
	return (
		<div id="keypad" onClick={ handler }>
		{
			btnValues.map(({ id, text }) => (
				<Button id={ id } text={ text } key={ id } />
				))
		}
		</div>
		);
	}