import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import SpotifyWebApi from 'spotify-web-api-node';

class SongGrid extends React.Component {

	//Display grid of images that represent each song

	// (async () => {
	// 	const spotify = new SpotifyWebApi({
	// 		clientId: '599acb0ea60443bd94be56f2ff0d500a',
	// 	});
	// 	spotify.setAccessToken(accessToken);
	// 	spotify.setRefreshToken(refreshToken);
	// 	const savedTracks = await spotify.getMySavedTracks();
	// 	console.log(savedTracks.body.items);
	// })();

	render() {
		return (
			<Container>
				<Row className='justify-content-md-center'>
					<Col>A</Col>
					<Col>B</Col>
					<Col>C</Col>
				</Row>
			</Container>
		);
	}
}