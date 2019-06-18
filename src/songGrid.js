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

	async componentDidMount() {

		const limit = 50;
		let currentOffset = 0;
		let fetchedAllTracks = false;

		while (!fetchedAllTracks) {

			const data = await this.getSavedTracks(currentOffset, limit);
			if (data.length === 0){
				fetchedAllTracks = true;
			}
			currentOffset += limit;

			this.setState({
				spotify: this.state.spotify,
				data: this.state.data.concat(data)
			});
		}
	}

	render() {

		const songColumns = this.state.data
			.map((song) => {
				return (
					<Col className = "col-2" key={song.name}>
						<Image className="rounded mx-auto d-block" src={song.albumImages[2].url} rounded />
						<div className="text-center">{song.name}</div>
						<p className="text-center">{song.artists.join(', ')}</p>
					</Col>
				)
			});

		return (
			<Container>
				<h1 className="text-center"> Saved Tracks </h1>
				<Row>{songColumns}</Row>
			</Container>
		);
	}

	async getSavedTracks(offset, limit) {

		const paginationOptions = {
			offset: offset,
			limit: limit
		};
		const result = await this.state.spotify.getMySavedTracks(paginationOptions);

		return result.body.items
			.map((item) => {
				return {
					uri: item.track.uri,
					name: item.track.name,
					artists: item.track.artists
						.map((artist) => artist.name),
					albumImages: item.track.album.images
				};
			});
	}
}

export default SongGrid;