import React, { Component } from "react";
import http from "./services/httpService";
import config from "./config.json";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    // promise -> fulfilled (success) OR rejected (failure)
    const { data: posts } = await http.get(config.apiEndPoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndPoint, obj);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    const originalPosts = this.state.posts;

    post.title = "UPDATED";

    const posts = [...this.state.posts]; // Clone the array
    const index = posts.indexOf(post);
    posts[index] = { title: post.title, ...post };
    this.setState({ posts });

    try {
      await http.put(config.apiEndPoint + `/${post.id}`, post);
    } catch (ex) {
      toast.error("Something went wrong while updating a post!");
      this.setState({ posts: originalPosts });
    }
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete('s' + config.apiEndPoint + `/${post.id}`);
    } catch (ex) {
      console.log("HANDLE DELETE CATCH BLOCK", ex);

      if (ex.response && ex.response.status === 404)
        toast.error("This post is already been deleted or not found!");
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <div className="container">
        <ToastContainer />
        <div className="row">
          <div className="col my-3">
            <button className="btn btn-primary" onClick={this.handleAdd}>
              Add
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => this.handleUpdate(post)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.handleDelete(post)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
