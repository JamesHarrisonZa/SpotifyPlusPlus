
import React from 'react';
import ReactDOM from 'react-dom';
import TrackGrid from './TrackGrid';


describe('TrackGrid', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<TrackGrid />, div);
	});
});
