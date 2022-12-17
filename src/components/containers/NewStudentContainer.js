/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk, fetchAllCampusesThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  // Initialize state
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
      redirectId: null,
      campuses: []
    };
  }

  componentDidMount() {
    this.props.fetchAllCampuses()
    this.props.allCampuses
      .forEach(campus => {
        if(campus.id !== 1)
          this.state.campuses.push(campus.id)
      })
    this.state.campuses.sort()
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

    let tmpId = this.state.campusId
    if(!this.state.campuses.includes(Number(tmpId)) || tmpId == null)
      tmpId = 1;

    console.log(tmpId)
    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        campusId: tmpId,
        email: this.state.email,
        imageUrl: this.state.imageUrl.match(/\.(jpeg|jpg|gif|png)$/) == null ? "" : this.state.imageUrl,
        gpa: this.state.gpa
    };
    
    // Add new student in back-end database
    let newStudent = await this.props.addStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "", 
      lastname: "", 
      campusId: null,
      email: "",
      imageUrl: "",
      gpa: null,
      redirect: true, 
      redirectId: newStudent.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null, campuses: []});
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
        <NewStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}
          campusList={this.state.campuses}     
        />
      </div>          
    );
  }
}

const mapState = (state) => {
  return {
    allCampuses: state.allCampuses,
  };
};

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
      addStudent: (student) => dispatch(addStudentThunk(student)),
      fetchAllCampuses: () => dispatch(fetchAllCampusesThunk())
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(NewStudentContainer);