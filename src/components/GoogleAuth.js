import React, { Component } from "react";

class GoogleAuth extends Component {
  state = {
    isSignedIn: null
  };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      // async network request
      // init returns a Promise
      window.gapi.client
        .init({
          clientId:
            "797401886567-9cumct9mrt3v2va409rasa7fa6fq02hh.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          //code executed when the Google library is loaded
          // sets auth equal to Google Auth object
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.handleAuthChange);
        });
    });
  }

  handleAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  handleSignIn = () => {
    this.auth.signIn();
  };

  handleSignOut = () => {
    this.auth.signOut();
  };

  renderAuthBtn() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.handleSignOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.handleSignIn} className="ui red google button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthBtn()}</div>;
  }
}

export default GoogleAuth;
