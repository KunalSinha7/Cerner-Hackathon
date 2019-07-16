import React, { Component } from "react";
import {spotifyWebApiURL} from "../constants";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: "",
      authorized: false,
      profile: []
    };
  }

  componentDidMount = () => {
    let url = window.location.href;
    if (url.indexOf("token=") > -1) {
      let authToken = url
        .split("token=")[1]
        .split("&")[0]
        .trim();
      let authorized = true;
      this.setState({ authToken, authorized });
      console.log(authToken);
    }
  };

  handleClick = event => {
      event.preventDefault();
      if(this.state.authorized) {
        const { authToken } = this.state;
        console.log("Authorized", authToken);
        // GET USER PROFILE
      } else {
        console.log("Spotify Web Api URL", spotifyWebApiURL);
        window.location.assign(spotifyWebApiURL);
      }
  };

  render() {
    return this.state.authorized ? <div>Hello</div> : <button onClick={this.handleClick}>Login</button>;
  }
}
