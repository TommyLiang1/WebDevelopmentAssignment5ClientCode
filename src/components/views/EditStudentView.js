/*==================================================
EditStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

// Create styling for the input form
const useStyles = makeStyles( () => ({
  formContainer:{  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  customizeAppBar:{
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
}));

const EditStudentView = (props) => {
  const {handleChange, handleSubmit, student} = props;
  const classes = useStyles();
  const [CheckFirstName, setCheckFirstName] = useState("")
  const [CheckLastName, setCheckLastName] = useState("")
  const [CheckEmail, setCheckEmail] = useState("")
  const [edit, setEdit] = useState("")
  
  function formValidation(e){
    // prevent page from reloading
    e.preventDefault();

    // if all fields of the form are valid
    if (e.target[1].value && e.target[2].value && e.target[3].value){
      handleSubmit(e);
    }

    // checks if first name is valid
    if (!e.target[1].value){
      setCheckFirstName("There is no first name.");
    }
    else{ 
      setCheckFirstName("");
    }

    //checks if last name is valid
    if (!e.target[2].value){
      setCheckLastName("There is no last name.");
    }
    else{
      setCheckLastName("");
    }
    
    //checks if email is valid
    if (!e.target[3].value){
      setCheckEmail("There is no email.");
    }
    else{
      setCheckEmail("");
    }

  }
  function formSubmission(e){
    e.preventDefault();
    formValidation(e);
    setEdit("Successfully edited student information.")
  }

  // Render a Edit Student view with an input form
  return (
    <div>
      <h1>Edit Student {student.firstname} {student.lastname}</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              Edit a Student
            </Typography>
          </div>
          <form style={{textAlign: 'center'}} onSubmit={(e) => formSubmission(e)}>
            <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus Id: </label>
            <input type="text" name="campusId" placeholder={student.campusId} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
            <input type="text" name="firstname" placeholder={student.firstname} onChange ={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
            <input type="text" name="lastname" placeholder={student.lastname} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Email: </label>
            <input type="text" name="email" placeholder={student.email} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>ImageURL: </label>
            <input type="text" name="imageUrl" placeholder={student.imageUrl} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>GPA: </label>
            <input type="text" name="gpa" placeholder={student.gpa} onChange={(e) => handleChange(e)} />
            <br/>
            <br/>

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <br/>
            <br/>
          </form>
          </div>
          {CheckFirstName}
          {CheckLastName} 
          {CheckEmail}
          {edit}
      </div>
    </div>    
  )
}

export default EditStudentView;