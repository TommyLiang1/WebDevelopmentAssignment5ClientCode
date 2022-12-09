/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchStudentThunk, editStudentThunk } from "../../store/thunks";

import EditStudentView from '../views/EditStudentView';

class EditStudentContainer extends Component {
  //Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      campusId: null,
      email: "",
      imageUrl: "",
      gpa: null,
      redirect: false,
      redirectId: null
    };
  }

  componentDidMount() {
    this.props.fetchStudentThunk(this.props.match.params.id)
      .then(student => {
        this.setState({
          firstname: student.firstname,
          lastname: student.lastname,
          campusId: student.campusId,
          email: student.email,
          imageUrl: student.imageUrl,
          gpa: student.gpa
        });
      })
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

    let student = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      campusId: this.state.campusId,
      email: this.state.email,
      imageUrl: this.state.imageUrl,
      gpa: this.state.gpa
    };
    
    // Add edit student in back-end database
    let editStudent = await this.props.editStudent(student);

    console.log("Student Editted - ", editStudent);
    console.log("Content of the prop", this.props);

    // Update state, and trigger redirect to show the edited student
    this.setState({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      campusId: this.state.campusId,
      email: this.state.email,
      imageUrl: this.state.imageUrl,
      gpa: this.state.gpa,
      redirect: true, 
      redirectId: student.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView 
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit}
          student={this.tmpstudent}
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(EditStudentContainer);