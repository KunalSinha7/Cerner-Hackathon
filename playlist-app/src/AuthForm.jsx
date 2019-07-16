import React from 'react';

export default class AuthForm extends React.Component {

  handleClick = () => {console.log('This Works')};

  render() {
    return (
      <div className="col-12">
        <br/><br/><br/><br/>
        <div className="row">
          <div className="d-flex container col-6 justify-content-center">
            <h1 className="login-header font-weight-bold"> Collaborative Playlist Ranker </h1>
          </div>
        </div>
        <br/><br/><br/><br/>
        <div className="row">
          <div className="d-flex container col-6 justify-content-center">
            <i className="login-img fa fa-spotify"/>
          </div>
        </div>
        <br/><br/>
        <div className="row">
          <div className="d-flex container col-6">
            <button className="login-button btn btn-success btn-lg btn-block rounded-pill center-block" onClick = {this.handleClick}>Login With Spotify</button>
          </div>
        </div>
      </div>
    )
  }
}
