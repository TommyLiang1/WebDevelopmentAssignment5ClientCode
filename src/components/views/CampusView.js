/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
// implemented useState to be used as real-time error handling
import { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( () => ({
  button:{
    marginLeft: "5px",
    marginRight: "5px",
  },
  existingStudentsContainer:{
    backgroundColor:"#f7f7e6",
    width: "90%",
    border:"solid 2px black",
    alignSelf:"center",
    margin: "auto",
    borderRadius: "20px",
    paddingBottom:"20px",
    marginBottom:"20px"
  }
}));
// Take in props data to construct the component
const CampusView = (props) => {
  const classes = useStyles();
  const { campus, deleteCampus, fetchStudent, editStudent, fetchAllStudents} = props;
  // temp variable to check student enrollment
  let temp;
  // to set user image
  let image;
  const [showStudents, setShowStudents] = useState(false);
  const [students, setStudents] = useState([]);
  // let addingStudent = false;
  // if there is no campus or incorrect id
  if (campus === null || campus.id === 1)
    return (
      <h1>This campus does not exist.</h1>
    )

  //checking student enrollment
  if (campus.students.length === 0) temp = "No students are at this campus.";
  else temp = "Students at this campus:";

  //checks if there is a campus img, if none then displays squidward community college
  if (!campus.imageUrl) image = "https://onuniverse-assets.imgix.net/00643229-A4BC-4907-B4E1-881B190EAF30.jpg?w=750"
  else image = campus.imageUrl; 

  async function showExistingStudents() {
    setStudents([]);
    setShowStudents(true);
    let studentsCall = fetchAllStudents();
    studentsCall.then(res => {
      res.forEach(student => {
        if(student.campusId !== campus.id && student.campusId === 1)
          setStudents(prevStudents => [...prevStudents, student]);
      })
    })
  }
  
  async function addExistingStudent(id) {
    let studentCall = fetchStudent(id)
    let student;
    studentCall.then(res => {
      student = res.data;
      //console.log(student);
      student.campusId = campus.id;
      editStudent(student);
      window.location.reload(true);
    })
  }

  async function removeStudent(id) {
    let studentCall = fetchStudent(id)
    let student;
    studentCall.then(res => {
      student = res.data;
      //console.log(student);
      student.campusId = 1;
      editStudent(student);
      window.location.reload(true);
    })
  }

  // Render a single Campus view with list of its students (temp will check for students)
  return (
    <div>
      <h1>{campus.name}</h1>
      <img src={image} alt="" height={180} width={250} />
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <div>{temp}</div>
      {
        campus.students.map(student => {
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{student.firstname} {student.lastname}</h2>
              </Link>
              <button onClick={() => removeStudent(student.id)}>Remove Student</button>
              <hr/>
            </div>
          );
        })
      }
      <br />
      <div hidden={!showStudents} className={classes.existingStudentsContainer}>
        <h4>Choose a student to add:</h4>
        {
          students.length === 0 ? <h1>No students to add</h1> :
          students.map((student) => {
            let name = student.firstname + " " + student.lastname;
            return (
              <div key={student.id}>
                 <hr/>
                <Link to={`/student/${student.id}`}>
                  <h2>{name}</h2>
                </Link>
                <button onClick={() => addExistingStudent(student.id)}>Add Student</button>
              </div>
            );
          })
        }
      </div>
      <Link to={`/newstudent/${campus.id}`}>
        <button className={classes.button}>Add New Student</button>
      </Link>
      <button className={classes.button} onClick={() => showExistingStudents()}>Add Existing Student</button>
      <Link to={`/campuses`}>
        <button className={classes.button} onClick={() => deleteCampus(campus.id)}>Delete Campus</button>
      </Link>

    </div>
  );
};


export default CampusView;