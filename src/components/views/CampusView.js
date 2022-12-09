/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
// implemented useState to be used as real-time error handling
import { useState } from "react";
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus} = props;
  // two empty msgs for real time error handling
  const {campusdeletemsg, setcampusdeletemsg} = useState("");
  // temp variable to check student enrollment
  let temp;
  // to set user image
  let image;

  // if there is no campus or incorrect id
  if(campus === null){
    return(
      <div>You entered an incorrect ID or this campus does not exist.</div>
    )
  }

  //checking student enrollment
  if(campus.students.length === 0){
    temp = "No students are at this campus.";
  }
  else{
    temp = "Students at this campus:";
  }

  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>             
          </div>
        );
      })}
    </div>
  );
};

export default CampusView;