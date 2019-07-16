import React from 'react';
import AuthForm from './AuthForm';
// import PlaylistList from './components/PlaylistList';
// import SongList from './components/SongList';
import './App.css';

// const pageState = {
//   loginPage: 0,
//   playlistsPage: 1,
//   ownerPlaylistPage: 2,
//   contributorPlaylistPage: 3,
// };

export default class App extends React.Component {
  render() {
    return (
      <div>
        <AuthForm/>
        {/*<PlaylistList/>*/}
        {/*<SongList/>*/}

      </div>
    );
  }
}
