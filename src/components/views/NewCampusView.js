/*==================================================
NewCampusView.js - taken from newstudentview.js
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

const NewCampusView = (props) => {

  const {handleChange, handleSubmit } = props;
  const [CheckName, setCheckName] = useState("");
  const [CheckAddress, setCheckAddress] = useState("");
  const [CheckDescription, setCheckDescription] = useState("");

  const classes = useStyles();
  //Function used to check form
  //Checks if the fields are empty if they are then it will tell the user. If all the required fields are filled out, then the form will submit.
  function CheckForm(event){
    // preventDefault stops page from reloading
    event.preventDefault();

    //first checks if the form is not empty
    if (event.target[0].value && event.target[1].value && event.target[2].value){
      handleSubmit(e)
    }
    
    //checks if campus name is empty
    if (!event.target[0].value){
      setCheckName("There is no campus name.")
    }
    else{
      setCheckName("")
    }

    //checks if campus address is empty
    if (!event.target[2].value){
      setCheckAddress("There is no campus address.")
    }
    else{
      setCheckAddress("")
    }

    //checks for a campus description
    if (!event.target[3].value){
      setCheckDescription("There is no campus description.")
    }
    else{
      setCheckDescription("")
    }
  }

  // Render a New Student view with an input form
  return (
    <div>
      <h1>New Campus</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              Add a Campus
            </Typography>
          </div>
          <form style={{textAlign: 'center'}} onSubmit={(e) => CheckForm(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Campus Name: </label>
            <input type="text" name="campusname" onChange ={(e) => handleChange(e)} required />
            <br/>
            <br/>
        
            <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus Address: </label>
            <input type="text" name="campusaddress" onChange={(e) => handleChange(e)} required />
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus Description: </label>
            <input type="text" name="campusdescription" onChange={(e) => handleChange(e)} required/>
            <br/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>ImageURL: </label>
            <input type="text" name="imageUrl" onChange={(e) => handleChange(e)}/>
            <br/>
            <br/>

            <Button variant="contained" color="primary" type="submit">

              {console.log(props)}
              Submit
            </Button>
            <br/>
            <br/>
          </form>
          </div>
          <p>{CheckName}</p>
          <p>{CheckAddress}</p>
          <p>{CheckDescription}</p>
      </div>
    </div>    
  )
}

export default NewCampusView;