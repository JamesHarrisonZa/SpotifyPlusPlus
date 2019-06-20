import SpotifyWebApi from 'spotify-web-api-node';

class SongService {

	constructor(accessToken, refreshToken) {

		this._spotify = new SpotifyWebApi({
			clientId: '599acb0ea60443bd94be56f2ff0d500a',
		});
		this._spotify.setAccessToken(accessToken);
		this._spotify.setRefreshToken(refreshToken);
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