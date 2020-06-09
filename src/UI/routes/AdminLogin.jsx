import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { loginAdmin, clearAlertAuth } from "../../redux/actions/authAction";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert"
import AlertTitle from "@material-ui/lab/AlertTitle"
import { useEffect } from "react";
import Grow from '@material-ui/core/Grow';
import { useHistory } from "react-router-dom";

function Login({ isLoginLoading, isAdminAuthenticated, login, adminDetails, alert, clearAlert }) {
  const history = useHistory()

  useEffect(() => {
    if(isAdminAuthenticated){
      history.push("/dashboard")
    }
  }, [isAdminAuthenticated])
  useEffect(() => {
    console.log("heyy")
    if(alert && alert.type !== ""){
      console.log(alert);
      showAlert(alert)
      setIsAlertOpen(true)
      setTimeout(
        () => {
          clearAlert()
          setIsAlertOpen(false)
        }, 2000
      )


    }
    return () => {
      showAlert({
        type: "",
        message: ""
      })
      
    }
  }, [alert]);
  const useStyles = makeStyles({
    heading: {
      fontSize: "2rem",
    },
    container: {
      marginTop: useMediaQuery("(min-width: 700px)") ? "2rem" : "5rem",
    },
    form: {
      maxWidth: useMediaQuery("(min-width: 700px)") && "500px",
    },
    input: {
      display: "block",
      margin: "1rem auto",
    },
    submit: {
      padding: "0.7rem 2rem",
      marginTop: "1rem",
    },
    submitWrapper: {
      position: "relative",
    },
    buttonProgress: {
      position: "absolute",
      right: "50%",
      top: "50%",
    },
    alert: {
      width: "80%",
      maxWidth: "400px",
      position: "absolute",
      bottom: "4rem",
      marginLeft: "1rem"
    },
    alertTitle: {
      textTransform: "capitalize"
    }
  });

  const classes = useStyles();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [currentAlert, showAlert] = useState({
    type: "",
    message:""
  })

  const [isAlertOpen, setIsAlertOpen] = useState(false)

  function handleChange(e) {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  

  return (
    <>
    <Container maxWidth="sm" className={classes.container}>
      <Typography align="center" variant="h1" className={classes.heading}>
        Log In
      </Typography>
      <form className={classes.form}>
        <TextField
          type="email"
          name="email"
          onChange={handleChange}
          className={classes.input}
          fullWidth={true}
          required={true}
          id="standard-basic"
          label="Email"
        />
        <TextField
          type="password"
          name="password"
          onChange={handleChange}
          className={classes.input}
          fullWidth={true}
          required={true}
          id="standard-basic"
          label="Password"
        />

        <div className={classes.submitWrapper}>
          <Button
            className={classes.submit}
            disabled={isLoginLoading}
            fullWidth={true}
            variant="contained"
            color="primary"
            onClick={() => {
              login(credentials);
            }}
          >
            Log in
          </Button>
          {isLoginLoading && (
            <CircularProgress
              size={24}
              className={classes.buttonProgress}
              color="secondary"
            />
          )}
        </div>
      </form>
    </Container>
  <Grow timeout = {100} in = {isAlertOpen}>
    <Alert severity={currentAlert.type} className = {classes.alert}>
          <AlertTitle className = {classes.alertTitle}>{currentAlert.type}</AlertTitle>
            {currentAlert.message}
    </Alert>
    </Grow>
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoginLoading: state.auth.loginLoading,
  isAdminAuthenticated: state.auth.isAdminAuthenticated,
  alert: state.auth.alert
});

const mapDispatchToProps = {
  login: loginAdmin,
  clearAlert: clearAlertAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
