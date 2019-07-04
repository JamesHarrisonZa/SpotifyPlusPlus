import Track from "./track";

class TrackService {

	constructor(spotify) {

		this._spotify = spotify;
	}

	/**
	 * @param {Number} offset 
	 * @param {Number} limit
	 */
	async getSavedTracks(offset, limit) {

		const paginationOptions = {
			offset: offset,
			limit: limit
		};
		const result = await this._spotify.getMySavedTracks(paginationOptions); //https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-tracks/

		return result.body.items
			.map((item) => {
				return {
					id: item.track.id,
					uri: item.track.uri,
					name: item.track.name,
					artists: item.track.artists
						.map((artist) => artist.name),
					albumImages: item.track.album.images
				};
			});
	}

	/**
	 * @param {Array<Number>} trackIds 
	 */
	async getAudioFeaturesForTracks(trackIds) {

		const result = await this._spotify.getAudioFeaturesForTracks(trackIds); //https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/
		
		return result.body.audio_features
			.map((item) => {
				return {
					id: item.id,
					danceability: item.danceability,
					energy: item.energy,
					speechiness: item.speechiness,
					acousticness: item.acousticness,
					instrumentalness: item.instrumentalness,
					liveness: item.liveness,
					valence: item.valence
				}
			});
	}

	/**
	 * @param {Number} offset
	 * @param {Number} limit
	 */
	async getTracksWithAudioFeatures(offset, limit){

		const savedTracks = await this.getSavedTracks(offset, limit);
		if (savedTracks.length === 0){
			return [];
		}
		const trackIds = savedTracks.map(x => x.id);
		const audioFeaturesForTracks = await this.getAudioFeaturesForTracks(trackIds);

		return savedTracks
			.map(track => {

				const trackFeatures = audioFeaturesForTracks
					.filter(x => x.id === track.id)[0];

				return new Track(
					track.id, 
					track.name, 
					track.uri, 
					track.artists, 
					track.albumImages,
					trackFeatures.danceability,
					trackFeatures.energy,
					trackFeatures.speechiness,
					trackFeatures.acousticness,
					trackFeatures.instrumentalness,
					trackFeatures.liveness,
					trackFeatures.valence
				)
			});
	}

	/**
	 * @param {Array<Number>} trackIds 
	 */
	playTracksOnActiveSpotifyClient(trackIds){

		this._spotify.play({uris: trackIds});
	}
}

export default TrackService;