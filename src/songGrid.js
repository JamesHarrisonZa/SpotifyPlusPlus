import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SpotifyWebApi from 'spotify-web-api-node';

class SongGrid extends React.Component {

	constructor(props){
		super(props);

		const spotify = new SpotifyWebApi({
			clientId: '599acb0ea60443bd94be56f2ff0d500a',
		});
		spotify.setAccessToken(props.accessToken);
		spotify.setRefreshToken(props.refreshToken);

		this.state = {
			spotify: spotify
		}
	}

	async getSavedTracks() {
		return await this.state.spotify.getMySavedTracks();
	}

	render() {

		this.getSavedTracks()
			.then((result) => {

				var songs = result.body.items
					.map((item) => {
						return {
							uri: item.track.uri,
							name: item.track.name,
							artists: item.track.artists
								.map((artist) => {
									return {
										name: artist.name
									}
								}),
							albumImages: item.track.album.images
						};
					});

				return (
					<Container>
						<Row className='justify-content-md-center'>
							<Col>A</Col>
							<Col>B</Col>
							<Col>C</Col>
						</Row>
					</Container>
				);
			});

		return (
			<Container>
				<p>Loading...</p>
			</Container>
		);
	}
} 

export default SongGrid;