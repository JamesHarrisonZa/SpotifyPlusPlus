import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import SpotifyWebApi from 'spotify-web-api-node';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login';
import SongGrid from './songGrid';

class Index extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			spotify: null
		};
	}

	componentDidMount() {

		document.body.className = "bg-dark text-light";

		const parsed = queryString.parse(window.location.search);
		const accessToken = parsed.access_token;
		const refreshToken = parsed.refresh_token;

		if (this.state.spotify || accessToken) {

			const spotify = new SpotifyWebApi({
				clientId: '599acb0ea60443bd94be56f2ff0d500a',
			});
			spotify.setAccessToken(accessToken);
			spotify.setRefreshToken(refreshToken);

			this.setState({
				spotify: spotify
			});
		}
	}

	render() {

		if (this.state.spotify) {
			return (
				<SongGrid 
					spotify={this.state.spotify}
				/>
			);
		}
		return <Login />;
	}
}

// ========================================

ReactDOM.render(
	<Index />,
	document.getElementById('root')
);
