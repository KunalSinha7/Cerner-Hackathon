import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import PlaylistList from "./components/PlaylistList";
import SongList from "./components/SongList";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact={true} path="/" component={Login} />
          <Route
            exact={false}
            path="/userProfile/:userId"
            component={PlaylistList}
          />
          <Route
            exact={false}
            path="/playlist/:playlistId"
            component={SongList}
          />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    );
  }
}
