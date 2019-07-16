import React, { Component } from "react";
import { spotifyWebApiURL } from "../constants";
import axios from "axios";

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
                        .post("http://localhost:5000/api/v1/spotify/addToPlaylist", {
                          spotifyToken: authToken,
                          spotifyId: userInfo.data.spotifyId,
                          playlistId: playlistInfo.data.owned[0].id,
                          songId: "76cy1WJvNGJTj78UqeA5zr"
                        })
                        .then(res => {
                          console.log(res);
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
      <div>Hello</div>
    ) : (
      <button onClick={this.handleClick}>Login</button>
    );
  }
}
