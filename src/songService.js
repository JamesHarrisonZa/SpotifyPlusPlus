class SongService {

	constructor(spotify) {

		this._spotify = spotify;
	}

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
}

export default SongService;