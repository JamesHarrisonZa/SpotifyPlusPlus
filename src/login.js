import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {

	onClick() {
		window.location = 'http://localhost:42420/login';
	}

	render() {
		return (
			<Container>
				<Row className='d-flex justify-content-center'>
					<h1>Welcome</h1>
				</Row>
				<Row className='d-flex justify-content-center'>
					<div>
						<p>Filter your saved songs for a given mood you are going for</p>
					</div>
				</Row>
				<Row className='d-flex justify-content-center'>
					<Button
						variant='outline-success'
						onClick={() => this.onClick()}
					>
						Login to Spotify
					</Button>
				</Row>
			</Container>
		);
	}
}

export default Login;