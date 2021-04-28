import React, { Component } from "react";
import Frack from "./../Frack";
import "./Login.css";

class Login extends Component {
  state = { isLogdin: false, loginFail: false, accessestext: ""};
  accessestext = "Login Complete"

  clickHndeler = event => {
    event.preventDefault();
    this.setState({ loginFail: false });
    Frack.Login(event.target.username.value.toLowerCase(), event.target.password.value)
      .then(res => {
        sessionStorage.authToken = res.data.token;
        if (Frack.HasToken()) {
          this.props.login()
          if (this.props.location.url) {
            this.accessGranted(this.props.location.url);
          } else {
            this.accessGranted("/");
          }
        }
        return Frack.UpdateCurrentUser();
      })
      .catch(error => {
        this.setState({ loginFail: true });
      });
  };

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  accessGranted = async url => {
    this.setState({ isLogdin: true });
    for (let i = 0; i < this.accessestext.length +1; i++){
      this.setState({accessestext: this.accessestext.substr(0,i)})
      await this.sleep(50);
    }
    await this.sleep(500);
    this.props.history.push(url);
  };

  createContent = () => {
    if (this.state.isLogdin === false) {
      return (
        <form className='login-box-form' onSubmit={this.clickHndeler}>
          <h1>Mottagningen</h1>
          <label>
            ANVÄNDARNAMN:
            <br />
          </label>
          <input name='username' type='text' autoComplete='off' /> <br />
          <label>
            LÖSENORD:
            <br />
          </label>
          <input name='password' type='password' />
          <br />
          <input type='submit' value='Login' />
          <br />

          {this.state.loginFail ? (
            <h2 className='login-fail'>Login Failed</h2>
          ) : null}
          <br />
        </form>
      );
    }
    return <h3 className='accesses-granted'>{this.state.accessestext}</h3>;
  };

  render() {
    return (
      <div className='login-bg'>
        <div className='login-box'>{this.createContent()}</div>
      </div>
    );
  }
}

export default Login;
