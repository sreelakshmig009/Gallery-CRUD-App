import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

 
class Edit extends Component {
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
      records: [],
    };
  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/record/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          name: response.data.name,
          describe: response.data.describe,
          url: response.data.url,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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
    const newEditedperson = {
      name: this.state.name,
      describe: this.state.describe,
      url: this.state.url,
    };
    console.log(newEditedperson);
 
    // This will send a post request to update the data in the database.
    axios
      .post(
        "http://localhost:5000/update/" + this.props.match.params.id,
        newEditedperson
      )
      .then((res) => console.log(res.data));
 
    this.props.history.push("/");
  }
 
  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div style={{ margin: 50}}>
        <h3 align="center">Update Record</h3>
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
          </div>
          <br />
 
          <div className="form-group">
            <input
              type="submit"
              value="Update Image"
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
 
// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.
 
export default withRouter(Edit);