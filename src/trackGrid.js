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
		this._audioFeatures = ['Acousticness', 'Danceability', 'Energy', 'Instrumentalness', 'Liveness', 'Speechiness', 'Valence'];
		this.sliderOnChange = this.sliderOnChange.bind(this);

		this.state = {
			trackData: [],
			sliderValues: {
				Acousticness: 0,
				Danceability: 0,
				Energy: 0,
				Instrumentalness: 0,
				Liveness: 0,
				Speechiness: 0,
				Valence: 0,
			}
		}
	}

	async componentDidMount() {

		const limit = 50;
		let currentOffset = 0;
		let fetchedAllTracks = false;

		while (!fetchedAllTracks) {

			const trackData = await this._trackService.getTracksWithAudioFeatures(currentOffset, limit);
			if (trackData.length === 0){
				fetchedAllTracks = true;
			}
			currentOffset += limit;

			this.setState({
				trackData: this.state.trackData.concat(trackData),
				sliderValues: this.state.sliderValues
			});
		}
	}

	sliderOnChange(event) {
		const value = event.target.value;
		const sliderName = event.target.name;

		const updatedSliderValues = this.state.sliderValues;
		updatedSliderValues[sliderName] = value;

		this.setState({
			trackData: this.state.trackData,
			sliderValues: updatedSliderValues
		});
	}

	getSliderColumns() {

		return this._audioFeatures
			.map((feature) => {
				return (
					<Col key={feature}> 
						<div className="text-center">{feature}</div>
						<input name={feature} type="range" className="form-control-range" onChange={this.sliderOnChange}/>
					</Col>
				);
			});
	}

	getTrackColumns() {

		return this.state.trackData
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