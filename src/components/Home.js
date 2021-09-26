import React, { Component } from "react";
import axios from "axios";
import PostItem from "./PostItem";
export class Home extends Component {
  state = {
    posts: [],
    isLoaded: false,
  };
  componentDidMount() {
    axios
      .get("/wp-json/wp/v2/posts")
      .then((res) =>
        this.setState({
          posts: res.data,
          isLoaded: true,
        })
      )
      .catch((err) => console.log(err));
  }
  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        <div className="row">
          {posts.map((post) => (
            <PostItem post={post} key={post.id}></PostItem>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
