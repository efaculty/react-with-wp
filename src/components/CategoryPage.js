import React, { Component } from "react";
import axios from "axios";
import CategoryItem from "./CategoryItem";
import { Link } from "react-router-dom";
export class CategoryPage extends Component {
  state = {
    posts: [],
    categories: [],
    isLoaded: false,
    catSlug: "",
  };
  componentDidMount() {
    axios
      .get(`/wp-json/wp/v2/posts?categories=${this.props.match.params.slug}`)
      .then((res) =>
        this.setState({
          posts: res.data,
          isLoaded: true,
          catSlug: this.props.match.params.slug,
        })
      )
      .catch((err) => console.log(err));
    axios
      .get("/wp-json/wp/v2/categories?per_page=100&hide_empty=1")
      .then((res) =>
        this.setState({
          categories: res.data,
          isLoaded: true,
        })
      )
      .catch((err) => console.log(err));
    console.log("Component DID MOUNT!");
  }
  componentWillMount() {
    console.log("Component WILL MOUNT!");
  }
  componentWillReceiveProps(newProps) {
    console.log("Component WILL RECIEVE PROPS!");
  }
  shouldComponentUpdate(newProps, newState) {
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      axios
        .get(`/wp-json/wp/v2/posts?categories=${nextProps.match.params.slug}`)
        .then((res) =>
          this.setState({
            posts: res.data,
            isLoaded: true,
            catSlug: this.props.match.params.slug,
          })
        )
        .catch((err) => console.log(err));
      console.log("Component WILL UPDATE!");
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("Component DID UPDATE!");
  }
  componentWillUnmount() {
    console.log("Component WILL UNMOUNT!");
  }

  render() {
    const { posts, categories, isLoaded } = this.state;
    if (isLoaded) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="list-group">
                {categories.map((category) => (
                  <Link
                    to={`/category/${category.id}`}
                    className="list-group-item list-group-item-action"
                    key={category.id}
                    onClick={this.clickHandler}
                  >
                    {category.name}- {category.count}
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                <ul class="list-unstyled">
                  {posts.map((post) => (
                    <CategoryItem post={post} key={post.id}></CategoryItem>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <>Loading</>;
  }
}

export default CategoryPage;
