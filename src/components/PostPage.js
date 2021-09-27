import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

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
      return (
        <div className="container">
          <div className="row">
            <Link to="/post">Go Back</Link>
            <h1>{post.title.rendered}</h1>
            {parse(post.content.rendered)}
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default PostPage;
