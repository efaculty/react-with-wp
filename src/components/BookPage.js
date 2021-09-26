import axios from "axios";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export class BookPage extends Component {
  state = {
    book: {},
    isLoaded: false,
  };
  componentDidMount() {
    axios
      .get(`/wp-json/wp/v2/books/?slug=${this.props.match.params.slug}`)
      .then((res) =>
        this.setState({
          book: res.data[0],
          isLoaded: true,
        })
      );
  }

  render() {
    const { book, isLoaded } = this.state;
    if (isLoaded) {
      console.log();
      return (
        <Fragment>
          <Link to="/">Go Back</Link>
          <h1>{book.title.rendered}</h1>
          <p dangerouslySetInnerHTML={{ __html: book.content.rendered }} />
          <h2>{book.acf.publisher}</h2>
        </Fragment>
      );
    }
    return <h3>Loading...</h3>;
  }
}

export default BookPage;
