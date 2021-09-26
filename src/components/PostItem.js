import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

export class PostItem extends Component {
  state = {
    imageUrl: "",
    author: "",
    isLoaded: false,
  };
  static propType = {
    post: PropTypes.object.isRequired,
  };
  componentDidMount() {
    const { featured_media, author } = this.props.post;
    //const getImageUrl = axios.get(`/wp-json/wp/v2/media/${featured_media}`);
    //const getAuthor = axios.get(`/wp-json/wp/v2/users/${author}`);
    /*Promise.all([getImageUrl, getAuthor]).then((res) => {
      console.log(res[0].data.media_details.sizes.full.source_url);
      this.setState({
        imageUrl: res[0].data.media_details.sizes.full.source_url,
        author: res[1].data.name,
        isLoaded: true,
      });
    });*/
  }
  render() {
    const { id, slug, title, excerpt } = this.props.post;
    const { imageUrl, author, isLoaded } = this.state;
    console.log(this.state);
    if (localStorage.getItem("token")) {
      return (
        <div>
          <h2>{title.rendered}</h2>
          <small>Created by {this.state.author}</small>
          <img
            style={{ marginBottom: "0" }}
            src={this.state.imageUrl}
            alt={title.rendered}
          />
          <p dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
          <Link to={`/post/${slug}`}>Read Post</Link>
        </div>
      );
    }
    return <>Login first</>;
  }
}

export default PostItem;
