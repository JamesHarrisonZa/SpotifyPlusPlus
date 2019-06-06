import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login';
import SongGrid from './songGrid';

class Index extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			accessToken: null,
			refreshToken: null
		};
	}

	componentDidMount() {
		const parsed = queryString.parse(window.location.search);
		const accessToken = parsed.access_token;
		const refreshToken = parsed.refresh_token;
		console.log(`accessToken: ${accessToken}`);
		console.log(`refreshToken: ${refreshToken}`);

		if (this.state.accessToken || accessToken) {

			this.setState({
				accessToken: accessToken,
				refreshToken: refreshToken,
			});
		}
	}

	render() {

		if (this.state.accessToken) {
			return (
				<SongGrid 
					accessToken={this.state.accessToken}
					refreshToken={this.state.refreshToken}
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
