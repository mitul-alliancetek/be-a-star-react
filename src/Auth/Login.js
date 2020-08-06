import React from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import { doLogin } from './../api/auth/actions';
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);


const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rememberMe: false,
      email: null,
      password: null,
      errors: {
        email: '',
        password: '',
        non_field_errors: ""
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.loading != prevProps.loading && !this.props.loading) {
      if (this.props.loginSuccess) {
        this.props.history.push('/');
      } else if (this.props.loginFail) {
        var errors = {
          email: '',
          password: '',
          non_field_errors: ""
        };
        var errKey = Object.keys(this.props.loginErrorMessage);
        for (var i = 0; i < errKey.length; i++) {
          errors[errKey[i]] = this.props.loginErrorMessage[errKey[i]][0];
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
      case 'email':
        errors.email =
        value
            ? ''
            : 'Please enter valid email address!';
        break;
      case 'password':
        errors.password =
          value.length < 8
            ? 'Password must be at least 8 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  formSubmit = () => {
    var errors = this.state.errors;
    errors.non_field_errors = "";
    if (this.state.email == "") {
      errors.email = "Please enter email"
    }
    if (this.state.password == "") {
      errors.password = "Please enter password"
    }
    this.setState({ errors }, () => {
      if (validateForm(this.state.errors)) {
        var data = {
          username: this.state.email,
          password: this.state.password
        }
        this.props.doLogin(data);
      }
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-8">
            <form className="login-form" onSubmit={this.handleSubmit} noValidate>
              <h2 className="text-center mb-5">Login</h2>
              <div className='mb-3'>
                <input id="email" name='email' className="form-control" onChange={this.handleChange} noValidate placeholder="Email" />
                {errors.email.length > 0 &&
                  <span className='error'>{errors.email}</span>
                }
              </div>

              <div className='mb-3'>
                <input id="password" name='password' className="form-control" type="password" onChange={this.handleChange} noValidate placeholder="Password" />
                {errors.password.length > 0 &&
                  <span className='error'>{errors.password}</span>}
              </div>
              {errors.non_field_errors != "" && 
              <span className='error'>{errors.non_field_errors}</span>}
              <div className='mb-3'>
                <button type='button' disabled={this.props.loading} className="btn btn-primary" onClick={this.formSubmit} >Log in</button>
              </div>
            </form>
            <div className="dont-account">
              <Link to="/register">Don’t have an account?</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}




const mapStateToProps = (state) => {

  const { user,
    loading,
    loginSuccess,
    loginFail,
    loginErrorMessage } = state.authUser;
  return {
    user,
    loading,
    loginSuccess,
    loginFail,
    loginErrorMessage
  }

}

export default connect(
  mapStateToProps,
  {
    doLogin
  }
)(Login);
