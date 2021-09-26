import React, { Component, Fragment } from "react";
import Books from "./components/Books";
import BookPage from "./components/BookPage";
import Posts from "./components/Posts";
import PostPage from "./components/PostPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";

export class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/book" component={Header} />
          <Route exact path="/book" component={Books} />
          <Route exact path="/book/:slug" component={BookPage} />
        </Fragment>
        <Fragment>
          <Route exact path="/post" component={Header} />
          <Route exact path="/post" component={Posts} />
          <Route exact path="/post/:slug" component={PostPage} />
        </Fragment>
        <Fragment>
          <Route exact path="/" component={Header} />
          <Route exact path="/" component={Home} />
        </Fragment>
        <Route exact path="/login" component={Login} />
      </Router>
    );
  }
}

export default App;
