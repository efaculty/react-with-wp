import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export class Category extends Component {
  state = {
    categories: [],
    isLoaded: false,
  };
  componentDidMount() {
    axios
      .get("/wp-json/wp/v2/categories?per_page=100&hide_empty=1")
      .then((res) =>
        this.setState({
          categories: res.data,
          isLoaded: true,
        })
      )
      .catch((err) => console.log(err));
  }

  render() {
    const { categories, isLoaded } = this.state;
    if (isLoaded) {
      return (
        <div class="list-group">
          {categories.map((category) => (
            <Link
              to={`/category/${category.id}`}
              className="list-group-item list-group-item-action"
              key={category.id}
            >
              {category.name}- {category.count}
            </Link>
          ))}
        </div>
      );
    }
    return <>Loading</>;
  }
}

export default Category;
