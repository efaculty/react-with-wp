import React, { Component } from "react";
import axios from "axios";
import BookItem from "./BookItem";
export class Books extends Component {
  state = {
    books: [],
    isLoaded: false,
  };
  componentDidMount() {
    axios
      .get("/wp-json/wp/v2/books")
      .then((res) =>
        this.setState({
          books: res.data,
          isLoaded: true,
        })
      )
      .catch((err) => console.log(err));
  }
  render() {
    const { books, isLoaded } = this.state;
    return (
      <div>
        {books.map((book) => (
          <BookItem book={book} key={book.id}></BookItem>
        ))}
      </div>
    );
  }
}

export default Books;
