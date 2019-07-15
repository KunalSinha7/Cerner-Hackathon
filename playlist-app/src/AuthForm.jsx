import React from 'react';

export default class AuthForm extends React.Component {

  handleClick = () => {console.log('This Works')}

  render() {
    return (
      <div>
        <button className="login-button btn btn-success" onClick = {this.handleClick}> Login With Spotify</button>
      </div>
    )
  }
}
