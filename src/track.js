class Track {

	constructor(id, name, uri, artists, albumImages, danceability, energy, speechiness, acousticness, instrumentalness, liveness, valence){

		this.id = id;
		this.name = name;
		this.uri = uri;
		this.artists = artists;
		this.albumImages = albumImages;

		this.danceability = danceability;
		this.energy = energy;
		this.speechiness = speechiness;
		this.acousticness = acousticness;
		this.instrumentalness = instrumentalness;
		this.liveness = liveness;
		this.valence = valence;
	}
}

export default Track;