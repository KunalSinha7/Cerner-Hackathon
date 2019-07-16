import React, { Component } from "react";
import { spotifyWebApiURL } from "../constants";
import axios from "axios";
import history from '../history';

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
      axios
        .post("http://localhost:5000/api/v1/spotify/getUser", {
          spotifyToken: authToken
        })
        .then(userInfo => {
          history.push("/userProfile/" + userInfo.data.spotifyId + "/" + authToken);
        }).catch(err => {
          console.log(
            "Something went wrong :( ... Failed to get user data",
            err
          );
        });
      
    }
  };

  handleClick = event => {
    event.preventDefault();
    if (this.state.authorized) {
      const { authToken } = this.state;
      axios
        .post("http://localhost:5000/api/v1/spotify/getUser", {
          spotifyToken: authToken
        })
        .then(userInfo => {
          history.push("/userProfile/" + userInfo.data.spotifyId + "/" + authToken);
        }).catch(err => {
          console.log(
            "Something went wrong :( ... Failed to get user data",
            err
          );
        });
    } else {
      window.location.assign(spotifyWebApiURL);
    }
  };

  render() {
    return this.state.authorized ? (
      <div>Hello</div>
    ) : (
      <div className="col-12">
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="d-flex container col-12 justify-content-center">
            <h1 className="login-header font-weight-bold">
              {" "}
              Collaborative Playlist Ranker{" "}
            </h1>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="d-flex container col-6 justify-content-center">
            <i className="login-img fa fa-spotify" />
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="d-flex container col-6">
            <button
              className="login-button btn btn-success btn-lg btn-block rounded-pill center-block"
              onClick={this.handleClick}
            >
              Login With Spotify
            </button>
          </div>
        </div>
      </div>
    );
  }
}
