import React from 'react';
import RatingDropdown from './RatingDropdown';
import Modal from './Modals';
import Login from "./Login.js";
import history from "../history.js";

const modalHeader = (
  <h5>Find a Song</h5>
);

const modalBody = (
  <div className="form-group">
    <input className="form-control" placeholder="Enter Song Title"/>
  </div>
);

export default class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: true,
      songList: [
        {
          name: 'End of The Road',
          artist: 'Juice Wrld',
          rating: 0
        },
        {
          name: '2MUCH',
          artist: 'Alter.',
          rating: 0
        },
        {
          name: 'You Reposted in the Wrong Neighborhood',
          artist: 'Shokk',
          rating: 0
        },
        {
          name: 'Send Me on My Way',
          artist: 'Rusted Root',
          rating: 0
        }, {
          name: 'Bangarang',
          artist: 'Skrillex',
          rating: 0
        },
        {
          name: 'Tijuana Sunrise',
          artist: 'Goldfinger',
          rating: 0
        }, {
          name: 'Feels Like Summer',
          artist: 'Weezer',
          rating: 0
        },
        {
          name: 'Happy Hour',
          artist: 'Weezer',
          rating: 0
        },
      ],
      total: 0
    }
  }

  componentDidMount = () => {
      // if (Login.auth === undefined)
      // {
      //     history.push("/");
      // }
      // console.log(Login.info.auth);
      // console.log(Login.info.playlists);
      // axios.post("http://localhost:5000/api/v1/spotify/getSongs/", {
      //     spotifyToken: Login.auth,
      //     playlistId: ,
      //     spotifyId:
      // });
  };

  getTotal() {
    let total = 0;
    this.state.songList.forEach(item => {
      total = total + item.rating;
    });
    this.setState({'total': total});
  }

  getRating(id) {
    let rating;
    if (this.state.owner) {
      rating = <RatingDropdown id={id} update={this.updateRating}/>;
    } else {
      rating = 5;
    }
    return rating;
  }

  // handleClick = () => {
  //   this.state.songList;
  // }

  updateRating = (index,val) => {
    let songList2 = this.state.songList;
    songList2[index].rating = parseInt(val);
    this.setState({songList:songList2});
    console.log(this.state.songList);
    this.getTotal();
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-2">

          </div>
          <div className="col-3 rating-text d-flex container justify-content-center">
            <div className="d-flex container justify-content-start">
              <p className="mt-5 mb-5 ml-5 mr-2"> Song Count: {this.state.songList.length} </p>
              <button className="table-button rounded-pill fa fa-plus mt-5 mb-5" data-toggle="modal" data-target="#searchModal"/>
            </div>
          </div>
          <div className="d-flex container col-2 justify-content-center">
            <h1 className="playlist-header mr-2">Playlist</h1>
          </div>
          <div className="col-3 rating-text d-flex container justify-content-center">
            <div className="d-flex container justify-content-end">
              <p className="mt-5 mb-5 mr-2">Total Rating: {this.state.total}</p>
              <button type="submit" className="table-button rounded-pill fa fa-paper-plane mt-5 mb-5 mr-5"/>
            </div>
          </div>
          <div className="col-2">

          </div>
        </div>
        <div className="row">
          <div className="col-0-xs col-0-sm col-3">

          </div>
          <div className="col-6">
            <div className="card table-card">
              <table className="p-table table table-sm table-striped">
                <thead>
                  <tr className="d-flex flex-row">
                    <th scope="col" className="table-sub d-flex container justify-content-center">Song</th>
                    <th scope="col" className="table-sub d-flex container justify-content-center">Artist</th>
                    <th scope="col" className="table-sub d-flex container justify-content-center">Rating</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.songList.map((val, index) => (
                  <tr key={index} className="d-flex flex-row">
                    <td className="song-list-item d-flex container justify-content-center pl-3">
                      <p>{val.name}</p>
                    </td>
                    <td className="song-list-item d-flex container justify-content-center">
                      <p>{val.artist}</p>
                    </td>
                    <td className="song-list-item d-flex container justify-content-center">
                      <p>{this.getRating(index)}</p>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-0-xs col-0-sm col-3">

          </div>
        </div>
        <Modal id="searchModal" header={modalHeader} body={modalBody} />
      </div>
    );
  }
}
