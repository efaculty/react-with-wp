import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

export class CategoryItem extends Component {
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
    if (featured_media) {
      const getImageUrl = axios.get(`/wp-json/wp/v2/media/${featured_media}`);
      Promise.all([getImageUrl]).then((res) => {
        console.log(res);
        this.setState({
          imageUrl: res[0].data.media_details.sizes.full.source_url,
          isLoaded: true,
        });
      });
    }
    if (author) {
      const getAuthor = axios.get(`/wp-json/wp/v2/users/${author}`);
      Promise.all([getAuthor]).then((res) => {
        this.setState({
          author: res[0].data.name,
          isLoaded: true,
        });
      });
    }
  }
  render() {
    const { slug, title, excerpt } = this.props.post;
    const { imageUrl, author } = this.state;
    let imgtag;
    if (imageUrl !== "") {
      imgtag = (
        <img src={imageUrl} className="card-img-top" alt={title.rendered} />
      );
    } else {
      imgtag = "";
    }
    return (
      <li className="media bg-white mb-3 p-2">
        {imgtag}
        <div className="media-body">
          <h5 className="mt-0 mb-1">{title.rendered}</h5>
          <p
            className="card-text"
            dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
          />
          <p>Created by {author}</p>
          <Link className="btn btn-primary" to={`/post/${slug}`}>
            Read Book
          </Link>
        </div>
      </li>
    );
  }
}

export default CategoryItem;
