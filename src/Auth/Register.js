import React from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux';

import { doRegister } from './../api/auth/actions'
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      validName: false,
      validEmail: false,
      rememberMe: false,
      email: "",
      password: "",
      confirm_password: "",
      username: "",
      errors: {
        email: '',
        username: "",
        password: '',
        confirm_password: '',
      }
    };
  }


  componentDidUpdate(prevProps) {
    if (this.props.registerInProcess != prevProps.registerInProcess && !this.props.registerInProcess) {
      if (this.props.registerInSucess) {
        this.props.history.push('/login');
      } else if (this.props.registerInFail) {
        var errors = this.state.errors;
        var errKey = Object.keys(this.props.registerErrorMessage);
        for (var i = 0; i < errKey.length; i++) {
          errors[errKey[i]] = this.props.registerErrorMessage[errKey[i]][0];
        }
        this.setState({
          errors
        })
      }
    }
  }


  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;



    switch (name) {
      case 'username':
        errors.username = value ? ''
          : 'Enter valid username!';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Please enter valid email address!';
        break;
      case 'password':
        errors.password =
          value.length < 8
            ? 'Password must be at least 8 characters long!'
            : '';
        break;
      case 'confirm_password':
        errors.confirm_password =
          value != this.state.password
            ? 'Confirm password not match!'
            : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  }


  formSubmit = () => {
    var errors = this.state.errors;
    if (this.state.username == "") {
      errors.username = "Please enter username"
    }
    if (this.state.email == "") {
      errors.email = "Please enter email"
    }
    if (this.state.password == "") {
      errors.password = "Please enter password"
    }
    if (this.state.confirm_password == "") {
      errors.confirm_password = "Please enter repeat password";
    }
    this.setState({ errors }, () => {
      if (validateForm(this.state.errors)) {
        var data = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          confirm_password: this.state.confirm_password,
        }
        this.props.doRegister(data);
      }
    })


  }
  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-8">
            <form className="login-form" onSubmit={this.handleSubmit} noValidate>
              <h2 className="text-center mb-5">Register</h2>

              <div className='mb-3'>
                <input
                  id="username"
                  className="form-control"
                  onChange={this.handleChange}
                  name='username'
                  placeholder="Username"
                />
                {errors.username.length > 0 &&
                  <span className='error'>{errors.username}</span>
                }
              </div>

              <div className='mb-3'>
                <input id="email" name='email'
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder="Email"
                  noValidate />
                {errors.email.length > 0 &&
                  <span className='error'>{errors.email}</span>
                }
              </div>

              <div className='mb-3'>
                <input placeholder="Password" type="password" className="form-control" id="password" name='password' onChange={this.handleChange} noValidate />
                {errors.password.length > 0 &&
                  <span className='error'>{errors.password}</span>}
              </div>
              <div className='mb-3'>
                <input placeholder="Confirm Password" type="password" className="form-control" id="confirm_password" name='confirm_password' onChange={this.handleChange} noValidate />
                {errors.confirm_password.length > 0 &&
                  <span className='error'>{errors.confirm_password}</span>
                }
              </div>
              <div className='mb-3'>
                <button value="Sign up" type="button" className="btn btn-primary" onClick={this.formSubmit} disabled={this.props.checkNameInProcess == true || this.props.registerInProcess == true}>Sign up</button>
              </div>
              <div className="dont-account">
                <Link to="/login">Already have an account?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {

  const {
    registerInProcess,
    registerInSucess,
    registerInFail,
    registerErrorMessage,
  } = state.authUser;

  return {
    registerInProcess,
    registerInSucess,
    registerInFail,
    registerErrorMessage,
  }

}

export default connect(
  mapStateToProps,
  {
    doRegister
  }
)(Register);

