import React from 'react';
import RatingDropdown from './RatingDropdown';
import Modal from './Modals';
import Login from "./Login.js";
import history from "../history.js";
import axios from 'axios';

const modalHeader = (
  <h5>Find a Song</h5>
);

const modalBody = (
  <div className="form-group">
    <input className="form-control" placeholder="Enter Song Title"/>
  </div>
);

const modalFooter = (
  <div>
    <button type="button" className="btn btn-primary">
      Search
    </button>
    <button type="button" className="btn btn-secondary ml-2" data-dismiss="modal">
      Close
    </button>
  </div>
);

export default class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: props.match.params.playlistName,
      owner: props.match.params.ownerId,
      spotifyToken: props.match.params.authToken,
      spotifyId: props.match.params.userId,
      playlistId: props.match.params.playlistId,
      songList: [],
      total: 0
    }
  }

  componentDidMount = () => {
      axios.post("http://localhost:5000/api/v1/spotify/getSongs/", {
          spotifyToken: this.state.spotifyToken,
          playlistId: this.state.playlistId,
          spotifyId: this.state.spotifyId
      }).then((res) => {
        res.data.forEach((element) => {
          console.log(element)
          let addedBy = element.added_by.href;
          if(addedBy) {
            axios.get(addedBy,{
              headers: {
                Authorization: "Bearer " + this.state.spotifyToken
              }
            }).then((resp) => {
              element["addedByDisplayName"] = resp.data.display_name;
              this.setState({songList: res.data});

            }).catch((err) => console.log("Err", err));
          }
        });
      });
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
    if (this.state.owner === this.state.spotifyId) {
      rating = <RatingDropdown id={id} update={this.updateRating}/>;
    } else {
      rating = 5;
    }
    return rating;
  }

  updateRating = (index,val) => {
    let songList2 = this.state.songList;
    songList2[index].rating = parseInt(val);
    console.log(songList2[index].rating);
    this.setState({songList:songList2});
    this.getTotal();
  };

  render() {
    console.log(this.state.playlistName);
    let arr = [];
    if (this.state.songList.length >= 0) {
      this.state.songList.map((val, index) => {
        arr.push(
          (
            <tr key={index} className="d-flex flex-row">
              <td className="song-list-item d-flex container justify-content-center">
                <p>{val.track.name}</p>
              </td>
              <td className="song-list-item d-flex container justify-content-center">
                <p>{val.track.artists[0].name}</p>
              </td>
              <td className="song-list-item d-flex container justify-content-center">
                <p>{val.addedByDisplayName}</p>
              </td>
              <td className="song-list-item d-flex container justify-content-center">
                <p>{this.getRating(index)}</p>
              </td>
            </tr>
          )
        )
      });
    }
    return (
      <div>
        <div className="row">
          <div className="col-2">

          </div>
          <div className="col-3 rating-text d-flex container justify-content-center">
            <div className="d-flex container justify-content-start">
              <p className="mt-5 mb-5 mr-2"> Song Count: {this.state.songList.length} </p>
              <button className="table-button rounded-pill fa fa-plus mt-5 mb-5" data-toggle="modal" data-target="#searchModal"/>
            </div>
          </div>
          <div className="d-flex container col-2 justify-content-center">
            <h1 className="playlist-header mr-2">{this.state.playlistName}</h1>
          </div>
          <div className="col-3 rating-text d-flex container justify-content-center">
            <div className="d-flex container justify-content-end">
              <p className="mt-5 mb-5 mr-2">Total Rating: {this.state.total}</p>
              <button type="submit" className="table-button rounded-pill fa fa-paper-plane mt-5 mb-5"/>
            </div>
          </div>
          <div className="col-2">

          </div>
        </div>
        <div className="row">
          <div className="col-0-xs col-0-sm col-3">

          </div>
          <div className="col-6">
            <table className="p-table table table-sm table-striped">
              <thead>
                <tr className="d-flex flex-row">
                  <th scope="col" className="table-sub d-flex container justify-content-center">Song</th>
                  <th scope="col" className="table-sub d-flex container justify-content-center">Artist</th>
                  <th scope="col" className="table-sub d-flex container justify-content-center">Added By</th>
                  <th scope="col" className="table-sub d-flex container justify-content-center">Rating</th>
                </tr>
              </thead>
              <tbody>
              {
                arr
              }
              </tbody>
            </table>
          </div>
          <div className="col-0-xs col-0-sm col-3">

          </div>
        </div>
        <Modal id="searchModal" />
      </div>
    );
  }
}
