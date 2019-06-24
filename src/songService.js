class SongService {

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
		const result = await this._spotify.getMySavedTracks(paginationOptions);

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
	 * @param {Array<Number>} songIds 
	 */
	async getAudioFeaturesForTracks(songIds) {

		const result = await this._spotify.getAudioFeaturesForTracks(songIds);
		return result.body.audio_features
			.map((item) => {
				return {
					id: item.id,
					danceability: item.danceability,
					energy: item.energy,
					loudness: item.loudness,
					speechiness: item.speechiness,
					acousticness: item.acousticness,
					instrumentalness: item.instrumentalness,
					liveness: item.liveness,
					valence: item.valence
				}
			});
	}
}

export default SongService;