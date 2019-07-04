import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import TrackService from './trackService';

//ToDo: Consider new name as its doing more now
class TrackGrid extends React.Component {

	constructor(props) {
		super(props);

		this._trackService = new TrackService(props.spotify);
		this._audioFeatures = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechiness', 'valence'];
		this.sliderOnChange = this.sliderOnChange.bind(this);

		this.state = {
			trackData: [],
			filteredTrackData: [],
			sliderValues: {
				acousticness: 0,
				danceability: 0,
				energy: 0,
				instrumentalness: 0,
				liveness: 0,
				speechiness: 0,
				valence: 0,
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

			const updatedTrackData = this.state.trackData.concat(trackData);

			this.setState({
				trackData: updatedTrackData,
				filteredTrackData: updatedTrackData,
				sliderValues: this.state.sliderValues
			});
		}
	}

	sliderOnChange(event) {
		const sliderName = event.target.name;
		const sliderValue = event.target.value;

		const updatedSliderValues = this.state.sliderValues;
		updatedSliderValues[sliderName] = sliderValue;

		const updatedFilteredTrackData = this.getUpdatedFilteredTrackData();
		console.log('updatedFilteredTrackData', updatedFilteredTrackData.length)

		this.setState({
			trackData: this.state.trackData,
			filteredTrackData: updatedFilteredTrackData,
			sliderValues: updatedSliderValues
		});
	}

	getUpdatedFilteredTrackData() {

		const variance = 0.1;

		const isCloseToSliderValue = (trackValue, sliderValue, variance) => {

			return (
				(Number(trackValue) >= Number(sliderValue) - variance) &&
				(Number(trackValue) <= Number(sliderValue) + variance)
			);
		}

		return this._audioFeatures
			.reduce((trackData, audioFeature) => {

				return trackData
					.filter((track) => {
						const trackValue = track[audioFeature];
						const sliderValue = this.state.sliderValues[audioFeature];

						if(sliderValue === 0) {
							return true;
						}
						return isCloseToSliderValue(trackValue, sliderValue, variance)
				});
			}, this.state.trackData);
	}

	getSliderColumns() {

		return this._audioFeatures
			.map((feature) => {
				return (
					<Col key={feature}> 
						<div className="text-center">{feature}</div>
						<input name={feature} type="range" className="form-control-range" onChange={this.sliderOnChange} min="0.0" max="1.0" step="0.1"/>
					</Col>
				);
			});
	}

	getTrackColumns() {

		return this.state.filteredTrackData
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

	listenOnClick() {

		const trackUris = this.state.filteredTrackData
			.map((track) => track.uri);
		console.log('trackIds', trackUris);

		this._trackService.playTracksOnActiveSpotifyClient(trackUris);
	}

	render() {

		const sliderColumns = this.getSliderColumns();
		const trackColumns = this.getTrackColumns();

		return (
			<Container>
				<h1 className="text-center">
					Saved Tracks
				</h1>
				<Row className="mb-4">{sliderColumns}</Row>
				<Row className='justify-content-center mb-4'>
					<Button
						variant='outline-success'
						onClick={() => this.listenOnClick()}
					>
						Listen
					</Button>
				</Row>
				<Row>{trackColumns}</Row>
			</Container>
		);
	}
}

export default TrackGrid;