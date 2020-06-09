import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { loginAdmin } from "../../redux/actions/authAction";
import { connect } from "react-redux";
import { useEffect } from "react";

function Login({ isLoginLoading, isAdminAuthenticated, login, adminDetails }) {
  useEffect(() => {}, [isLoginLoading]);
  const useStyles = makeStyles({
    heading: {
      fontSize: "2rem",
    },
    container: {
      marginTop: useMediaQuery("(min-width: 700px)") ? "2rem" : "4rem",
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
  });

  const classes = useStyles();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }

  return (
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
  );
}

const mapStateToProps = (state) => ({
  isLoginLoading: state.auth.loginLoading,
  isAdminAuthenticated: state.auth.isAdminAuthenticated,
  adminDetails: state.auth.adminDetails,
});

const mapDispatchToProps = {
  login: loginAdmin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
