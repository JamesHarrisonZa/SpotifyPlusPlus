import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import SpotifyWebApi from 'spotify-web-api-node';

class SongGrid extends React.Component {

	constructor(props) {
		super(props);

		const spotify = new SpotifyWebApi({
			clientId: '599acb0ea60443bd94be56f2ff0d500a',
		});
		spotify.setAccessToken(props.accessToken);
		spotify.setRefreshToken(props.refreshToken);

		this.state = {
			spotify: spotify,
			data: []
		}
	}

	componentDidMount() {

		this.getSavedTracks()
			.then((result) => {

				const data = result.body.items
					.map((item) => {
						return {
							uri: item.track.uri,
							name: item.track.name,
							artists: item.track.artists
								.map((artist) => artist.name),
							albumImages: item.track.album.images
						};
					});
				this.setState({
					spotify: this.state.spotify,
					data: data
				});
			});
	}

	render() {

		const songColumns = this.state.data
			.map((song) => {
				return (
					<Col key={song.name}>
						<Image src={song.albumImages[2].url} rounded />
						<p>{song.name}</p>
						<p>{song.artists.join(', ')}</p>
					</Col>
				)
			});

		return (
			<Container>
				<h1 class="text-center"> Saved Tracks </h1>
				<Row>{songColumns}</Row>
			</Container>
		);
	}

	//ToDo: Pagination
	async getSavedTracks() {
		return await this.state.spotify.getMySavedTracks();
	}
}

export default SongGrid;