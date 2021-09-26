import axios from "axios";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import Header from "./Header";

export class PostPage extends Component {
  state = {
    post: {},
    isLoaded: false,
  };
  componentDidMount() {
    axios
      .get(`/wp-json/wp/v2/posts/?slug=${this.props.match.params.slug}`)
      .then((res) =>
        this.setState({
          post: res.data[0],
          isLoaded: true,
        })
      );
  }

  render() {
    const { post, isLoaded } = this.state;
    if (isLoaded) {
      console.log();
      return (
        <Fragment>
          <Header />
          <Link to="/post">Go Back</Link>
          <h1>{post.title.rendered}</h1>
          {parse(post.content.rendered)}
        </Fragment>
      );
    }
    return <h3>Loading...</h3>;
  }
}

export default PostPage;
