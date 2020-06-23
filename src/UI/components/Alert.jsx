import React from "react";
import PropTypes from 'prop-types';
import { makeStyles, Grow } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

const useStyles = makeStyles({
  alert: {
    width: "80%",
    maxWidth: "400px",
    position: "absolute",
    bottom: "4rem",
    marginLeft: "1rem",
  },
  alertTitle: {
    textTransform: "capitalize",
  },
});

function Alert({alert}) {
  const classes = useStyles();
  return (
    <Grow timeout={100} in={true}>
      <Alert severity={alert.type} className={classes.alert}>
        <AlertTitle className={classes.alertTitle}>
          {alert.type}
        </AlertTitle>
        {alert.message}
      </Alert>
    </Grow>
  );
}

Alert.propTypes = {
    alert: PropTypes.object.isRequired
}

export default Alert;
