import React, { Component } from "react";
import Books from "./components/Books";
import BookPage from "./components/BookPage";
import Posts from "./components/Posts";
import PostPage from "./components/PostPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Category from "./components/Category";
import CategoryPage from "./components/CategoryPage";

export class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/post">
              <Posts />
            </Route>
            <Route exact path="/book">
              <Books />
            </Route>
            <Route exact path="/category">
              <Category />
            </Route>
            <Route path="/post/:slug" component={PostPage} />
            <Route path="/book/:slug" component={BookPage} />
            <Route path="/category/:slug" component={CategoryPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
