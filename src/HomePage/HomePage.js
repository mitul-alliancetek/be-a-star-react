import React from 'react';
import { connect } from 'react-redux';
import { getProfile, logout } from './../api/auth/actions';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			mainRadio: true,
			Radio: true,
			items: [],
			showDeleteModel: false,
			deleteIndex: 0,
			openModel: false,
			imageIndex: 0,
			src: null,
			crop: {
				unit: "px",
				width: 200,
				minWidth: 150,
				aspect: 1 / 1
			},
			croppedImageUrl: null,
		}
	}
	componentDidMount(){
		this.props.getProfile();
	}
	logout = () => {
		this.props.logout({});
	}

	render() {
		if(this.props.profileLoading){
			return (
				<div className="container">
					<div className="row vh-100 align-items-center justify-content-center">
						<div className="col-8 text-center">
							Loading
						</div>
					</div>
				</div>
			);
		}else if(this.props.isLoggedIn){
			return (
				<div className="container">
					<div className="row vh-100 align-items-center justify-content-center">
						<div className="col-8 text-center">
							<div className="mb-5">
							Hello, {this.props.userProfile.username}! 
							</div>
							<div className="">
								<div className="row align-items-center justify-content-center">
									<div className="col-8 text-center">
										<div className="row justify-content-between">
										<Link to="/register" className="btn btn-primary">Register</Link>
										<Link to="/login" className="btn btn-primary">Login</Link>
										<button onClick={this.logout} className="btn btn-primary">Logout</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}else {
			return (
				<div className="container">
					<div className="row vh-100 align-items-center justify-content-center">
						<div className="col-8 text-center">
							Hello, guest! Please <Link to="/register">register</Link> or <Link to="/login">log in!</Link>
						</div>
					</div>
				</div>
			);
		}
		
	}
}



const mapStateToProps = (state) => {

	const {
		profileLoading,
		profileLoadingSuccess,
		userProfile,
		isLoggedIn,
		isLoggedOutProcess
	} = state.authUser;
	return {
		profileLoading,
		profileLoadingSuccess,
		userProfile,
		isLoggedIn,
		isLoggedOutProcess
	}

}

export default connect(
	mapStateToProps,
	{
		getProfile,
		logout
	}
)(HomePage);

