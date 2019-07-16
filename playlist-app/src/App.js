<<<<<<< HEAD
import React, { Component } from "react";
import * as $ from "jquery";
import hash from "./hash";
import Player from "./Player";
import "./App.css";

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "ffba0bee99234e33a3cd770365607776";
const redirectUri = "https://localhost:3000/";
const scopes =  [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms:0,
      },
      is_playing: "Paused",
      progress_ms: 0
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
    }
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        console.log("data", data);
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
        });
      }
    });
  }

  render() {
      return (
        <div className="App">
          <header>
            {!this.state.token && (
              <a
                className="btn btn--loginApp-link"
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                  "%20"
                )}&response_type=token&show_dialog=true`}
              >
                Login to Spotify
              </a>
            )}
            {this.state.token && (
              <Player
                item={this.state.item}
                is_playing={this.state.is_playing}
                progress_ms={this.progress_ms}
              />
            )}
          </header>
        </div>
      );
  }
}

// function Homepage() {
//     return (
//       <div className="App">
//         <header>
//           {!this.state.token && (
//             <a
//               className="btn btn--loginApp-link"
//               href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
//                 "%20"
//               )}&response_type=token&show_dialog=true`}
//             >
//               Login to Spotify
//             </a>
//           )}
//           {this.state.token && (
//             <Player
//               item={this.state.item}
//               is_playing={this.state.is_playing}
//               progress_ms={this.progress_ms}
//             />
//           )}
//         </header>
//       </div>
//     );
// }
//
// function Callback() {
//     return (<h2>Callback</h2>);
// }
//
// function AppRouter() {
//     <Router>
//       <div>
//           <nav>
//               <li>
//                   <Link to="/">Homepage</Link>
//               </li>
//               <li>
//                   <Link to="/callback/">Homepage</Link>
//               </li>
//           </nav>
//           <Route path="/" exact Component={Homepage} />
//           <Route path="/callback" Component={Callback} />
//       </div>
//     </Router>
//
// }

export default App;
=======
import React from 'react';
import AuthForm from './AuthForm';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <AuthForm/>
      </div>
    );
  }
}
>>>>>>> 3a090b8fa44b18035910b7b0d681d31f3ea8a068
