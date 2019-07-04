import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import TrackService from './trackService';

class TrackGrid extends React.Component {

	constructor(props) {
		super(props);

		this._trackService = new TrackService(props.spotify);

		this.state = {
			data: []
		}
	}

	async componentDidMount() {

		const limit = 50;
		let currentOffset = 0;
		let fetchedAllTracks = false;

		while (!fetchedAllTracks) {

			const data = await this._trackService.getTracksWithAudioFeatures(currentOffset, limit);
			if (data.length === 0){
				fetchedAllTracks = true;
			}
			currentOffset += limit;

			this.setState({
				data: this.state.data.concat(data)
			});
		}
	}

	getSliderColumns() {

		const audioFeatures = ['Acousticness', 'Danceability', 'Energy', 'Instrumentalness', 'Liveness', 'Speechiness', 'Valence'];

		return audioFeatures
			.map((feature) => {
				return (
					<Col> 
						<div className="text-center">{feature}</div>
						<input type="range" className=" form-control-range" id="formControlRange" />
					</Col>
				);
			});
	}

	getTrackColumns() {

		return this.state.data
			.map((track) => {
				return (
					<Col className="col-2" key={track.id}>
						<Image className="rounded mx-auto d-block" src={track.albumImages[2].url} rounded />
						<div className="text-center">{track.name}</div>
						<p className="text-center">{track.artists.join(', ')}</p>
					</Col>
				)
			});
	}

	render() {

		const sliders = this.getSliderColumns();
		const trackColumns = this.getTrackColumns();

		return (
			<Container>
				<h1 className="text-center">Saved Tracks</h1>

				<Row className="mb-4">{sliders}</Row>
				
				<Row>{trackColumns}</Row>
			</Container>
		);
	}
}

export default TrackGrid;