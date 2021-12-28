import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";
import { Typography, Box, Card, CardActions, CardContent, CardMedia, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const Record = (props) => (
            <Card sx={{ maxWidth: 345, minWidth: 50 }}>
                <CardMedia
                    component="img"
                    alt={props.record.name}
                    height= "200"
                    objectFit= "cover"
                    image={props.record.url}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {props.record.name}
                    </Typography>
                    <Box maxWidth="300px">
                        <Typography variant="body2" color="text-secondary">
                        {props.record.describe}
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions>
                    <div style={{marginRight: "10px"}}>
                    <Button size="small" class="btn btn-outline-primary " marginLeft="10px" >
                        <Link to={"/edit/" + props.record._id}>Edit</Link>
                    </Button>
                    </div>
                    <Button size="small" class="btn btn-outline-danger" >
                        <a
                            href="/"
                            className="link-danger"
                            onClick={() => {
                            props.deleteRecord(props.record._id);
                            }}
                            >
                            Delete
                        </a>
                    </Button>
                </CardActions>
            </Card>

    /*<div className="card h-100">
        <img src={props.record.url} class="card-img-top" alt={props.record.name}/>
        <div className="card-body">
            <h5 className="card-title">{props.record.name}</h5>
            <p className="card-text">{props.record.describe}</p>
            <Link to={"/edit/" + props.record._id}>Edit</Link> |
            <a
              href="/"
              onClick={() => {
              props.deleteRecord(props.record._id);
              }}
            >
              Delete
            </a>
        </div>
    </div>*/
);

export default class RecordList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.state = { records: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/record/")
      .then((response) => {
        this.setState({ records: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a record based on the method
  deleteRecord(id) {
    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      record: this.state.records.filter((el) => el._id !== id),
    });
  }

  // This method will map out the users on the table
  recordList() {
    return this.state.records.map((currentrecord) => {
      return (
        <Box m={6} style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center'
        }}>
          <Box style={{
              flex: '1 0 33%',
              marginTop: "20px"
          }}>
        <Record
          record={currentrecord}
          deleteRecord={this.deleteRecord}
          key={currentrecord._id}
        />
        </Box>
        </Box>
      );
    });
  }

  // This following section will display the table with the records of individuals.
  render() {
    return (
    <div>
      <div className="p-3 d-flex flex-column align-items-center">
            
            <Link to={"/create"}>
              <AddCircleOutlineIcon fontSize="large" marginTop="30px"/>
            </Link>
            <p>Add New Image</p>
      </div>
      <div className="d-flex flex-wrap justify-content-center   ">
            {this.recordList()}
        </div>
    </div>
    );
  }
}