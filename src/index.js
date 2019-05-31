import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SpotifyWebApi from 'spotify-web-api-node';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {

	constructor(){
		super();
		//ToDo: DONT CHECK THIS IN
		this._scopes = ['user-library-read', 'user-modify-playback-state'];
		this._spotifyWebApi = new SpotifyWebApi({
			clientId: '599acb0ea60443bd94be56f2ff0d500a',
			clientSecret: '', //todo
			redirectUri: 'http://localhost:42420/callback'
		});
	}

	onClick() {

		this._spotifyWebApi.createAuthorizeURL(this._scopes, {})
	}

	render() {
		
		return (
			<Container>
				<Row className="justify-content-md-center">
					<h1>Welcome</h1>
				</Row>
				<Row className="justify-content-md-center">
					<div>
						<p>Filter your saved songs for a given mood you are going for</p>
					</div>
				</Row>
				<Row className="justify-content-md-center">
					<Button
						variant="outline-success"
						onClick={() => this.onClick()}
						>
							Login to Spotify
					</Button>
				</Row>
			</Container>
		);
	}
}

// ========================================

ReactDOM.render(
	<Login />,
	document.getElementById('root')
);
