import React, {Component} from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from "./components/Login";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <BrowserRouter>
        <Route exact={false} path="/" component={Login} />
        {/* <Route exact={false} path="/userProfile/:userId" component={} />
        <Route exact={false} path="/playlist/:playlistId" component={} />
        <Route exact={false} path="/search/:playlistId/:userId" component={} /> */}
      </BrowserRouter>
    );
  }
  
}
