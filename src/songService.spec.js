import SongService from './songService';

describe('SongService', () => {

	describe('getSavedTracks()', () => {
	
		it('should return saved tracks', async () => {

			const sut = createSut();

			const actual = await sut.getSavedTracks(0, 0);
			const expected = [{ 
				"albumImages": [
					{ "height": 640, "url": "https://i.scdn.co/image/1", "width": 640 }, 
					{ "height": 300, "url": "https://i.scdn.co/image/2", "width": 300 }, 
					{ "height": 64, "url": "https://i.scdn.co/image/3", "width": 64 }
				], 
				"artists": ["Artist name"], 
				"id": "42", 
				"name": "Song Name", 
				"uri": "spotify:track:42" 
			}];
			expect(actual).toEqual(expected);
		});
	});
});

function createSut(){
	const data = {
		body: {
			"href": "https://api.spotify.com/v1/me/tracks?offset=0&limit=50",
			"items": [{
				"added_at": "2019-06-18T13:16:25Z",
				"track": {
					"album": {
						"album_type": "album",
						"artists": [{
							"external_urls": {
								"spotify": "https://open.spotify.com/artist/42"
							},
							"href": "https://api.spotify.com/v1/artists/42",
							"id": "42",
							"name": "Test Name",
							"type": "artist",
							"uri": "spotify:artist:42"
						}
						],
						"available_markets": ["NZ", "ZA"],
						"external_urls": {
							"spotify": "https://open.spotify.com/album/42"
						},
						"href": "https://api.spotify.com/v1/albums/42",
						"id": "42",
						"images": [{
							"height": 640,
							"url": "https://i.scdn.co/image/1",
							"width": 640
						}, {
							"height": 300,
							"url": "https://i.scdn.co/image/2",
							"width": 300
						}, {
							"height": 64,
							"url": "https://i.scdn.co/image/3",
							"width": 64
						}
						],
						"name": "SongName",
						"release_date": "2042-01-01",
						"release_date_precision": "day",
						"total_tracks": 42,
						"type": "album",
						"uri": "spotify:album:42"
					},
					"artists": [{
						"external_urls": {
							"spotify": "https://open.spotify.com/artist/42"
						},
						"href": "https://api.spotify.com/v1/artists/42",
						"id": "42",
						"name": "Artist name",
						"type": "artist",
						"uri": "spotify:artist:42"
					}
					],
					"available_markets": ["NZ", "ZA"],
					"disc_number": 1,
					"duration_ms": 420000,
					"explicit": false,
					"external_ids": {
						"isrc": "42"
					},
					"external_urls": {
						"spotify": "https://open.spotify.com/track/42"
					},
					"href": "https://api.spotify.com/v1/tracks/42",
					"id": "42",
					"is_local": false,
					"name": "Song Name",
					"popularity": 10,
					"preview_url": "https://p.scdn.co/mp3-preview/42?cid=42",
					"track_number": 1,
					"type": "track",
					"uri": "spotify:track:42"
				}
			}]
		}
	};
	const getMySavedTracksMock = jest.fn(x => Promise.resolve(data));
	const spotifyMock = {
		getMySavedTracks: getMySavedTracksMock
	};
	return new SongService(spotifyMock);
}