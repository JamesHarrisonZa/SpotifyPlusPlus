import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SpotifyWebApi from 'spotify-web-api-node';
import queryString from 'query-string';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login';

class Index extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			accessToken: null,
			refreshToken: null
		};
	}

	componentDidMount(){
		const parsed = queryString.parse(window.location.search);
		const accessToken = parsed.access_token;
		const refreshToken = parsed.refresh_token;
		console.log(`accessToken: ${accessToken}`);
		console.log(`refreshToken: ${refreshToken}`);
		
		if (accessToken) {

			this.setState({
				accessToken: accessToken,
				refreshToken: refreshToken,
			});
		}
	}

	render() {
		return (
			<Login />
		);
	}
}

// ========================================

ReactDOM.render(
	<Index />,
	document.getElementById('root')
);
