import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import SongService from './songService';

class SongGrid extends React.Component {

	constructor(props) {
		super(props);

		this._songService = new SongService(props.spotify);

		this.state = {
			data: []
		}
	}

	async componentDidMount() {

		const limit = 50;
		let currentOffset = 0;
		let fetchedAllTracks = false;

		while (!fetchedAllTracks) {

			const data = await this._songService.getTracksWithAudioFeatures(currentOffset, limit);
			if (data.length === 0){
				fetchedAllTracks = true;
			}
			currentOffset += limit;

			this.setState({
				data: this.state.data.concat(data)
			});
		}
	}

	render() {

		const songColumns = this.state.data
			.map((song) => {
				return (
					<Col className="col-2" key={song.id}>
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
}

export default SongGrid;