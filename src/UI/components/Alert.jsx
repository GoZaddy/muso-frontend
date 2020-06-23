import React from "react";
import PropTypes from 'prop-types';
import { makeStyles, Grow } from "@material-ui/core";
import AlertBox from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

const useStyles = makeStyles({
  alert: {
    
  },
  alertTitle: {
    textTransform: "capitalize",
  },
});

function Alert({alert}) {
  const classes = useStyles();
  return (
    <Grow timeout={100} in={true}>
      <AlertBox severity={alert.type} className={classes.alert}>
        <AlertTitle className={classes.alertTitle}>
          {alert.type}
        </AlertTitle>
        {alert.message}
      </AlertBox>
    </Grow>
  );
}

Alert.propTypes = {
    alert: PropTypes.object.isRequired
}

export default Alert;
