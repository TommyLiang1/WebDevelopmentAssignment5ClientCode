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
  const { campus, deleteCampus, fetchStudent, editStudent } = props;
  // temp variable to check student enrollment
  let temp;
  // to set user image
  let image;

  // if there is no campus or incorrect id
  if (campus === null) {
    return (
      <div>You entered an incorrect ID or this campus does not exist.</div>
    )
  }

  //checking student enrollment
  if (campus.students.length === 0) {
    temp = "No students are at this campus.";
  }
  else {
    temp = "Students at this campus:";
  }

  //checks if there is a campus img, if none then displays squidward community college
  if (!campus.imageUrl) {
    image = "https://onuniverse-assets.imgix.net/00643229-A4BC-4907-B4E1-881B190EAF30.jpg?w=750"
  }
  else {
    image = campus.imageUrl;
  }

  async function addStudent(id) {
    let studentCall = fetchStudent(id)
    let student;
    studentCall.then(res => {
      student += res.data;
      console.log(student)
      editStudent(student)
      window.location.reload(true)
    })
  }

  async function removeStudent(id) {
    let studentCall = fetchStudent(id)
    let student;
    studentCall.then(res => {
      student = res.data;
      console.log(student)
      student.campusId = 1;
      editStudent(student)
      window.location.reload(true)
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
      {campus.students.map(student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>
            <button onClick={() => addStudent(student.id)}>Add Student</button>
            <button onClick={() => removeStudent(student.id)}>Remove Student</button>
          </div>
        );
      })}
      <br />
      <Link to={`/campuses`}>
        <button onClick={() => deleteCampus(campus.id)}>Delete Campus</button>
      </Link>
    </div>
  );
};


export default CampusView;