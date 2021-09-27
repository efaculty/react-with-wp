import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

export class BookItem extends Component {
  state = {
    imageUrl: "",
    author: "",
    isLoaded: false,
  };
  static propType = {
    book: PropTypes.object.isRequired,
  };
  componentDidMount() {
    const { featured_media, author } = this.props.book;
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
    const { slug, title, excerpt } = this.props.book;
    //const { imageUrl, author, isLoaded } = this.state;

    return (
      <div className="col-3">
        <div className="card">
          <img
            src={this.state.imageUrl}
            className="card-img-top"
            alt={title.rendered}
          />
          <div className="card-body">
            <h5 className="card-title">{title.rendered}</h5>
            <p
              className="card-text"
              dangerouslySetInnerHTML={{ __html: excerpt.rendered }}
            />
            <p>Created by {this.state.author}</p>
            <Link className="btn btn-primary" to={`/book/${slug}`}>
              Read Book
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BookItem;
