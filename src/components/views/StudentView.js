/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useState } from 'react';

const StudentView = (props) => {
  const { student, deleteStudent } = props;
  const [studentdeletemsg, setstudentdeletemsg] = useState("");

  let img;
  if(student.imageUrl == null || student.imageUrl === "") { img = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" }
  else { img = student.imageUrl }
  console.log(student, student.email)
  if(student.campusId == null) {
    return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <img src={student.imageUrl} alt="" width={150} />
      <p>Student not enrolled into any campuses listed!</p>
      <h2>Email: {student.email}</h2>
      <h2>GPA: {student.gpa? student.gpa : "N/A"}</h2>
    </div>
    );
  }

  // function to set student delete message and delete student
  const studentDelete=() =>{
    deleteStudent(student.id);
    setstudentdeletemsg("Deleted Student");
  }

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <img src={img} alt="" width={150} />
      <div key={student.campusId}>
        <Link to={`/campus/${student.campusId}`}>
          <h2>{student.campus.name}</h2>
        </Link>             
      </div>
      <h2>Email: {student.email}</h2>
      <h2>GPA: {student.gpa? student.gpa : "N/A"}</h2>
      <br/>
      <Link to={`/students`}>
        <button onClick={() => studentDelete(student.id)}>Delete Student</button>
        <p>{studentdeletemsg}</p>
      </Link>
    </div>
  );

};

export default StudentView;