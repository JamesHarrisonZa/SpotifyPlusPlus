import TrackService from './trackService';

describe('TrackService', () => {

	describe('getSavedTracks()', () => {

		it('should return saved tracks', async () => {

			const sut = createSut();

			const actual = await sut.getSavedTracks(0, 0);
			const expected = [{
				"albumImages": [{
					"height": 640,
					"url": "https://i.scdn.co/image/e9c5fd63935b08ed27a7a5b0e65b2c6bf600fc4a",
					"width": 640
				}, {
					"height": 300,
					"url": "https://i.scdn.co/image/416b6589d9e2d91147ff5072d640d0041b04cb41",
					"width": 300
				}, {
					"height": 64,
					"url": "https://i.scdn.co/image/4bb6b451b8edde5881a5fcbe1a54bc8538f407ec",
					"width": 64
				}
				],
				"artists": ["Squirrel Nut Zippers"],
				"id": "2jpDioAB9tlYXMdXDK3BGl",
				"name": "Good Enough For Granddad",
				"uri": "spotify:track:2jpDioAB9tlYXMdXDK3BGl"
			}
			];
			expect(actual).toEqual(expected);
		});
	});

	describe('getAudioFeaturesForTracks()', () => {

		it('should return audio features', async () => {

			const sut = createSut();

			const actual = await sut.getAudioFeaturesForTracks([]);
			const expected = [{
				"acousticness": 0.00187,
				"danceability": 0.808,
				"energy": 0.626,
				"id": "2jpDioAB9tlYXMdXDK3BGl",
				"instrumentalness": 0.159,
				"liveness": 0.376,
				"speechiness": 0.168,
				"valence": 0.369
			}];

			expect(actual).toEqual(expected);
		});
	});

	describe('getTracksWithAudioFeatures', () => {
	
		it('should return tracks with audio features', async () => {
			
			const sut = createSut();
			const actual = await sut.getTracksWithAudioFeatures(0,0);
			const expected = [{
				id: '2jpDioAB9tlYXMdXDK3BGl',
				name: 'Good Enough For Granddad',
				uri: 'spotify:track:2jpDioAB9tlYXMdXDK3BGl',
				artists: ['Squirrel Nut Zippers'],
				albumImages:
					[{
						height: 640,
						url:
							'https://i.scdn.co/image/e9c5fd63935b08ed27a7a5b0e65b2c6bf600fc4a',
						width: 640
					},
					{
						height: 300,
						url:
							'https://i.scdn.co/image/416b6589d9e2d91147ff5072d640d0041b04cb41',
						width: 300
					},
					{
						height: 64,
						url:
							'https://i.scdn.co/image/4bb6b451b8edde5881a5fcbe1a54bc8538f407ec',
						width: 64
					}],
				danceability: 0.808,
				energy: 0.626,
				speechiness: 0.168,
				acousticness: 0.00187,
				instrumentalness: 0.159,
				liveness: 0.376,
				valence: 0.369
			}];

			expect(actual).toEqual(expected);
		});
	});
});

function createSut() {
	//Data from: https://developer.spotify.com/documentation/web-api/reference/
	const savedTracksData = {
		body: {
			"href": "https://api.spotify.com/v1/me/tracks?offset=0&limit=20",
			"items": [{
				"added_at": "2016-10-24T15:03:07Z",
				"track": {
					"album": {
						"album_type": "album",
						"artists": [{
							"external_urls": {
								"spotify": "https://open.spotify.com/artist/0LIll5i3kwo5A3IDpipgkS"
							},
							"href": "https://api.spotify.com/v1/artists/0LIll5i3kwo5A3IDpipgkS",
							"id": "0LIll5i3kwo5A3IDpipgkS",
							"name": "Squirrel Nut Zippers",
							"type": "artist",
							"uri": "spotify:artist:0LIll5i3kwo5A3IDpipgkS"
						}],
						"available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TR", "TW", "UY"],
						"external_urls": {
							"spotify": "https://open.spotify.com/album/63GBbuUNBel2ovJjUrfh5r"
						},
						"href": "https://api.spotify.com/v1/albums/63GBbuUNBel2ovJjUrfh5r",
						"id": "63GBbuUNBel2ovJjUrfh5r",
						"images": [{
							"height": 640,
							"url": "https://i.scdn.co/image/e9c5fd63935b08ed27a7a5b0e65b2c6bf600fc4a",
							"width": 640
						}, {
							"height": 300,
							"url": "https://i.scdn.co/image/416b6589d9e2d91147ff5072d640d0041b04cb41",
							"width": 300
						}, {
							"height": 64,
							"url": "https://i.scdn.co/image/4bb6b451b8edde5881a5fcbe1a54bc8538f407ec",
							"width": 64
						}],
						"name": "The Best of Squirrel Nut Zippers",
						"type": "album",
						"uri": "spotify:album:63GBbuUNBel2ovJjUrfh5r"
					},
					"artists": [{
						"external_urls": {
							"spotify": "https://open.spotify.com/artist/0LIll5i3kwo5A3IDpipgkS"
						},
						"href": "https://api.spotify.com/v1/artists/0LIll5i3kwo5A3IDpipgkS",
						"id": "0LIll5i3kwo5A3IDpipgkS",
						"name": "Squirrel Nut Zippers",
						"type": "artist",
						"uri": "spotify:artist:0LIll5i3kwo5A3IDpipgkS"
					}],
					"available_markets": ["AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TR", "TW", "UY"],
					"disc_number": 1,
					"duration_ms": 137040,
					"explicit": false,
					"external_ids": {
						"isrc": "USMA20215185"
					},
					"external_urls": {
						"spotify": "https://open.spotify.com/track/2jpDioAB9tlYXMdXDK3BGl"
					},
					"href": "https://api.spotify.com/v1/tracks/2jpDioAB9tlYXMdXDK3BGl",
					"id": "2jpDioAB9tlYXMdXDK3BGl",
					"name": "Good Enough For Granddad",
					"popularity": 19,
					"preview_url": "https://p.scdn.co/mp3-preview/32cc6f7a3fca362dfcde753f0339f42539f15c9a",
					"track_number": 1,
					"type": "track",
					"uri": "spotify:track:2jpDioAB9tlYXMdXDK3BGl"
				}
			}
			],
			"limit": 20,
			"next": "https://api.spotify.com/v1/me/tracks?offset=20&limit=20",
			"offset": 0,
			"previous": null,
			"total": 53
		}
	};
	const audioFeaturesData = {
		body: {
			"audio_features":
				[{
					"id": "2jpDioAB9tlYXMdXDK3BGl",
					"danceability": 0.808,
					"energy": 0.626,
					"key": 7,
					"loudness": -12.733,
					"mode": 1,
					"speechiness": 0.168,
					"acousticness": 0.00187,
					"instrumentalness": 0.159,
					"liveness": 0.376,
					"valence": 0.369,
					"tempo": 123.99,
					"type": "audio_features",
					"uri": "spotify:track:2jpDioAB9tlYXMdXDK3BGl",
					"track_href": "https://api.spotify.com/v1/tracks/2jpDioAB9tlYXMdXDK3BGl",
					"analysis_url": "http://echonest-analysis.s3.amazonaws.com/TR/WhpYUARk1kNJ_qP0AdKGcDDFKOQTTgsOoINrqyPQjkUnbteuuBiyj_u94iFCSGzdxGiwqQ6d77f4QLL_8=/3/full.json?AWSAccessKeyId=AKIAJRDFEY23UEVW42BQ&Expires=1458063189&Signature=JRE8SDZStpNOdUsPN/PoS49FMtQ%3D",
					"duration_ms": 535223,
					"time_signature": 4
				}]
		}
	};
	const getMySavedTracksMock = jest.fn(x => Promise.resolve(savedTracksData));
	const getAudioFeaturesForTracks = jest.fn(x => Promise.resolve(audioFeaturesData));
	const spotifyMock = {
		getMySavedTracks: getMySavedTracksMock,
		getAudioFeaturesForTracks: getAudioFeaturesForTracks
	};
	return new TrackService(spotifyMock);
}