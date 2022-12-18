/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( () => ({
  button:{
    marginLeft: "5px",
    marginRight: "5px",
  }
}));

const AllCampusesView = (props) => {
  // taken fron allstudentsview.js the const for props otherwise deletecampus would not be defined
  const {allCampuses, deleteCampus, fetchStudent, editStudent, fetchAllStudents} = props;
  const classes = useStyles();
  // If there is no campus, display a message.
  if (!allCampuses.length) {
    return (
      <div>
        <p>There are no campuses.</p>
        <Link to={`/newcampus`}>
          <button>Add New Campus</button>
        </Link>
      </div>
    );
  }

  async function removeStudent(id) {
    let studentCall = fetchStudent(id)
    let student;
    studentCall.then(res => {
      student = res.data;
      student.campusId = 1;
      editStudent(student);
      window.location.reload(true);
    })
  }

  async function removeCampus(id) {
    let studentList = fetchAllStudents();
    studentList.then(res => {
      res.forEach(student => {
        if(student.campusId === id) {
          removeStudent(student.id);
        }
      })
    })
    deleteCampus(id);
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>

      {allCampuses.map((campus) => {
        // this check removes null campus
        if(campus.id !== 1)
          return (
            <div key={campus.id}>
            <Link to={`/campus/${campus.id}`}>
              <h2>{campus.name}</h2>
            </Link>
            <h4>campus id: {campus.id}</h4>
            <img src={!campus.imageUrl ? "https://onuniverse-assets.imgix.net/00643229-A4BC-4907-B4E1-881B190EAF30.jpg?w=750" : campus.imageUrl} alt="" width={300}/>
            <p>{campus.address}</p>
            <Link to={`/editcampus/${campus.id}`}>
              <button className={classes.button}>Edit</button>
            </Link>
            <button className={classes.button} onClick={() => removeCampus(campus.id)}>Delete</button>
            <hr/>
          </div>
          )
        return (null);
      })}
      <br/>
      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>
      <br/><br/>
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;