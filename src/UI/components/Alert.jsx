import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Grow } from "@material-ui/core";
import AlertBox from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

const useStyles = makeStyles({
  alert: {
    width: "80%",
    maxWidth: "400px",
    position: "absolute",
    zIndex: "4000",
    bottom: "4rem",
    marginLeft: "1rem",
  },
  alertTitle: {
    textTransform: "capitalize",
  },
});

function Alert({ alert, variant }) {
  const classes = useStyles();
  return (
    <Grow timeout={100} in={true}>
      <AlertBox severity={alert.type} className={variant = "single"  && classes.alert}>
        <AlertTitle className={classes.alertTitle}>{alert.type}</AlertTitle>
        {alert.message}
      </AlertBox>
    </Grow>
  );
}

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
  variant: PropTypes.string
};
Alert.defaultProps = {
  variant: "default"
}

export default Alert;
