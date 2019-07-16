import React from 'react';
import Login from "./Login.js";
import history from "../history.js";

export default class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.owner = true;
    this.songList = [
      {
        name: 'End of The Road',
        artist: 'Juice Wrld',
        rating: 4
      },
      {
        name: '2MUCH',
        artist: 'Alter.',
        rating: 2
      },
      {
        name: 'You Reposted in the Wrong Neighborhood',
        artist: 'Shokk',
        rating: 5
      },
      {
        name: 'Send Me on My Way',
        artist: 'Rusted Root',
        rating: 2
      },{
        name: 'Bangarang',
        artist: 'Skrillex',
        rating: 3
      },
      {
        name: 'Tijuana Sunrise',
        artist: 'Goldfinger',
        rating: 5
      },{
        name: 'Feels Like Summer',
        artist: 'Weezer',
        rating: 5
      },
      {
        name: 'Happy Hour',
        artist: 'Weezer',
        rating: 5
      },
    ];
    this.total = 0;
  }

  componentDidMount = () => {
      if (Login.auth === undefined)
      {
          // history.push("/");
      }
      console.log(Login.info.auth);
      console.log(Login.info.playlists);
      // this.songList = axios.post("http://localhost:5000/api/v1/spotify/getSongs/", {
      //     spotifyToken: Login.auth,
      //     playlistId: ,
      //     spotifyId:
      // });
  };

  getTotal() {
    this.songList.forEach(item => {
      this.total = this.total + item.rating;
    });
    return this.total;
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="d-flex container col-1 justify-content-center">
            <h1 className="playlist-header mr-2">Playlist</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-0-xs col-0-sm col-3">

          </div>
          <div className="col-6">
            <table className="p-table table table-sm table-striped table-bordered">
              <thead>
                <tr className="d-flex flex-row">
                  <th scope="col" className="table-sub d-flex container justify-content-center">Song</th>
                  <th scope="col" className="table-sub d-flex container justify-content-center">Artist</th>
                  <th scope="col" className="table-sub d-flex container justify-content-center">Rating</th>
                </tr>
              </thead>
              <tbody>
              {this.songList.map((val, index) => (
                <tr key={index} className="d-flex flex-row">
                  <td className="song-list-item d-flex container justify-content-center">
                    <p>{val.name}</p>
                  </td>
                  <td className="song-list-item d-flex container justify-content-center">
                    <p>{val.artist}</p>
                  </td>
                  <td className="song-list-item d-flex container justify-content-center">
                    <p>{val.rating}</p>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <div className="row">
              <div className="col-6 rating-text d-flex container justify-content-center">
                <div className="d-flex container justify-content-start">
                  <button className="add-button rounded-pill fa fa-plus mb-1 mt-1 mr-2"/>
                  <p> Song Count: {this.songList.length} </p>
                </div>
              </div>
              <div className="col-6 rating-text d-flex container justify-content-center">
                <div className="d-flex container justify-content-end">
                  <p className="mr-2">Total Rating: {this.getTotal()}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-0-xs col-0-sm col-3">

          </div>
        </div>
      </div>
    );
  }
}
