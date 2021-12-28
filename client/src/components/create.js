import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { NavLink } from "react-router-dom";

 
export default class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescribe = this.onChangeDescribe.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
 
    this.state = {
      name: "",
      describe: "",
      url: "",
    };
  }
 
  // These methods will update the state properties.
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
 
  onChangeDescribe(e) {
    this.setState({
      describe: e.target.value,
    });
  }
 
  onChangeUrl(e) {
    this.setState({
      url: e.target.value,
    });
  }
 
// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
 
    // When post request is sent to the create url, axios will add a new record(newimage) to the database.
    const newimage = {
      name: this.state.name,
      describe: this.state.describe,
      url: this.state.url,
    };
 
    axios
      .post("http://localhost:5000/record/add", newimage)
      .then((res) => console.log(res.data));
 
    // We will empty the state after posting the data to the database
    this.setState({
      name: "",
      describe: "",
      url: "",
    });
  }
 
  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ margin: 50 }}>
        <h3 align="center">Add New Image</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name of the Image: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          <br />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.describe}
              onChange={this.onChangeDescribe}
            />
          <br />
          </div>
          <div className="form-group">
            <label>URL of the Image: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.url}
              onChange={this.onChangeUrl}
            />
          <br />
          </div>
          <div className="form-group" style={{ marginTop: 20 }}>
            <input
              type="submit"
              value="Add Image"
              className="btn btn-primary"
            />
            <NavLink className="navbar-brand" to="/" style={{ marginLeft: 20 }}>
              <button type="button" class="btn btn-danger btn-md">Back</button>
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}