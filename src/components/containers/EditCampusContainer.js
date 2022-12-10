/*==================================================
EditCampusContainer.js - taken from newstudentcontainer.js

================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      campusname: "", 
      imageUrl: "",
      campusaddress: "", 
      campusdescription: "", 
      redirect: false, 
      redirectId: null
    };
  }

  componentDidMount(){
    this.props.fetchCampus(this.props.match.params.id)
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.
    console.log("Checking this state", this.state)
    console.log("Checking this props", this.props)

    let campus = {
        name: this.state.campusname === "" ? this.props.campus.campusname : this.state.campusname,
        address: this.state.campusaddress === "" ? this.props.campus.campusaddress : this.state.campusaddress,
        description: this.state.campusdescription === "" ? this.props.campus.campusdescription : this.state.campusdescription,
        imageUrl: this.state.imageUrl.match(/\.(jpeg|jpg|gif|png)$/) == null ? this.props.campus.imageUrl : this.state.imageUrl
    };
    
    console.log("Checking campus:", campus)
    // Edit student in back-end database
    let editCampus = await this.props.editCampus(campus);
    console.log("Printing: ", editCampus)
    // Update state, and trigger redirect to show the new campus
    this.setState({
      campusname: "", 
      imageUrl: "",
      campusaddress: "", 
      campusdescription:"",
      redirect: true, 
      redirectId: this.props.campus.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new campus's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit}
          campus={this.props.campus}    
        />
      </div>          
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
  };
};

// The following input argument is passed to the "connect" function used by "EditCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
        fetchCampus: (campusId) => dispatch(fetchCampusThunk(campusId)),
    })
}

// Export store-connected container by default
// EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);