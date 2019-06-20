
import React from 'react';
import ReactDOM from 'react-dom';
import SongGrid from './SongGrid';


describe('SongGrid', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<SongGrid />, div);
	});
});
