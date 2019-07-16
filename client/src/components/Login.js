import React, { Component } from "react";
import { spotifyWebApiURL } from "../constants";
import { Route, BrowserRouter, Link } from 'react-router-dom';
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: "",
      authorized: false,
      profile: []
    };

    Login.info = {
        auth: "unspecified",
        playlists: "none",
    };
  }

  componentDidMount = () => {
    let url = window.location.href;
    if (url.indexOf("token=") > -1) {
      let authToken = url
        .split("token=")[1]
        .split("&")[0]
        .trim();
      console.log('pre-(assigning Login.)auth', authToken);
      Login.info.auth = authToken;
      let authorized = true;
      this.setState({ authToken, authorized });
      console.log("Auth Token", authToken);
      axios
        .post("http://localhost:5000/api/v1/spotify/getUser", {
          spotifyToken: authToken
        })
        .then(userInfo => {
          console.log(userInfo);
          axios
            .post("http://localhost:5000/api/v1/spotify/getPlaylists", {
              spotifyToken: authToken,
              spotifyId: userInfo.data.spotifyId
            })
            .then(playlistInfo => {
              console.log(playlistInfo);
              Login.info.playlists = playlistInfo;
              axios
                .post("http://localhost:5000/api/v1/spotify/getSongs", {
                  spotifyToken: authToken,
                  spotifyId: userInfo.data.spotifyId,
                  playlistId: playlistInfo.data.owned[0].id
                })
                .then(tracks => {
                  console.log(tracks.data);
                  axios
                    .post("http://localhost:5000/api/v1/spotify/search", {
                      spotifyToken: authToken,
                      query: "Old Town Road"
                    })
                    .then(searchRes => {
                      console.log(searchRes);
                      axios
                        .post(
                          "http://localhost:5000/api/v1/spotify/addToPlaylist",
                          {
                            spotifyToken: authToken,
                            spotifyId: userInfo.data.spotifyId,
                            playlistId: playlistInfo.data.owned[0].id,
                            songId: "55oSiAj3wUVgghv0mxOQ97"
                          }
                        )
                        .then(res => {
                          console.log(res);
                          axios
                            .post(
                              "http://localhost:5000/api/v1/spotify/removeFromPlaylist",
                              {
                                spotifyToken: authToken,
                                playlistId: playlistInfo.data.owned[0].id,
                                songId: "55oSiAj3wUVgghv0mxOQ97"
                              }
                            )
                            .then(res => {
                              console.log(res);
                            })
                            .catch(err => {
                              console.log(
                                "Something went wrong :( ... Failed to remove song from playlist",
                                err
                              );
                            });
                        })
                        .catch(err => {
                          console.log(
                            "Something went wrong :( ... Failed to add song to playlist",
                            err
                          );
                        });
                    })
                    .catch(err => {
                      console.log(
                        "Something went wrong :( ... Failed to retrieve search results",
                        err
                      );
                    });
                })
                .catch(err => {
                  console.log(
                    "Something went wrong :( ... Failed to retrieve songs",
                    err
                  );
                });
            })
            .catch(err => {
              console.log(
                "Something went wrong :( ... Failed to get playlist data",
                err
              );
            });
        })
        .catch(err => {
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
      console.log("Authorized", authToken);
    } else {
      console.log("Spotify Web Api URL", spotifyWebApiURL);
      window.location.assign(spotifyWebApiURL);
    }
  };

  render() {
    return this.state.authorized ? (
      <div>
        <Link to="/SongList" className="btn btn-primary">view songs</Link>
      </div>

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
