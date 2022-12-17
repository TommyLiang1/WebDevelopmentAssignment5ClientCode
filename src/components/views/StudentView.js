/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( () => ({
  button:{
    marginLeft: "5px",
    marginRight: "5px",
  },
}));

const StudentView = (props) => {
  const classes = useStyles();
  const { student, deleteStudent } = props;

  if (student === null)
    return (
      <h1>This student does not exist.</h1>
    );

  let img;
  if(student.imageUrl == null || student.imageUrl === "") { img = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" }
  else { img = student.imageUrl }

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <img src={img} alt="" width={150} />
      <div key={student.campusId}>
      {
        student.campus.id === 1 ?
          <p>Student not enrolled into any campuses listed!</p> :
          <Link to={`/campus/${student.campusId}`}>
            <h2>{student.campus.name}</h2>
          </Link>
      }        
      </div>
      <h2>Email: {student.email}</h2>
      <h2>GPA: {student.gpa? student.gpa : "N/A"}</h2>
      <br/>
      <Link to={`/editstudent/${student.id}`}>
        <button className={classes.button}>Edit Student</button>
      </Link>
      <Link to={`/students`}>
        <button className={classes.button} onClick={() => deleteStudent(student.id)}>Delete Student</button>
      </Link>
      
    </div>
  );
};

export default StudentView;