import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {

	onClick() {

		console.log(42)
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
