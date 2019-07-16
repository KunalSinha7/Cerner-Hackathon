import React from 'react';
import axios from 'axios';
import history from "../history";

export default class PlaylistList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spotifyToken: props.match.params.authToken,
      spotifyId: props.match.params.userId,
      ownerList: [],
      contributorList: []
    }
  }

  componentDidMount() {
    axios
      .post("http://localhost:5000/api/v1/spotify/getPlaylists", {
        spotifyToken: this.props.match.params.authToken,
        spotifyId: this.props.match.params.userId
      }).then((playlistInfo) => {
        console.log(playlistInfo.data);
        console.log(playlistInfo.data.collaborative);
        this.setState({ ownerList: playlistInfo.data.owned, contributorList: playlistInfo.data.collaborative })
      });
  }

  handlePlaylistClick = (playlistId) => {
    history.push("/playlist/" + playlistId + "/" + this.state.spotifyId + "/" + this.state.spotifyToken);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="d-flex container col-1 justify-content-center">
            <h1 className="playlist-header">PlayLists</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-1">

          </div>
          <div className="col-4">
            <table className="p-table table table-sm table-striped table-bordered">
              <thead className="">
                <tr>
                  <th scope="col" className="table-sub d-flex container justify-content-center">Owner Playlists</th>
                </tr>
              </thead>
              <tbody>
                {this.state.ownerList.map((val, index) => (
                  <tr key={index}>
                    <td className="d-flex container justify-content-center">
                      <button className="playlist-button btn btn-link" onClick={() => this.handlePlaylistClick(val.id)}>{val.name}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-2">

          </div>
          <div className="col-4">
            <table className="p-table table table-sm table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col" className="table-sub d-flex container justify-content-center">Contributor Playlists</th>
                </tr>
              </thead>
              <tbody>
                {this.state.contributorList.map((val, index) => (
                  <tr key={index}>
                    <td className="d-flex container justify-content-center">
                      <button className="playlist-button btn btn-link" onClick={() => this.handlePlaylistClick(val.id)}>{val.name}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-1">

          </div>
        </div>
      </div>
    );
  }
}
