import React from "react";
import { makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
    selectedListText: {
        fontWeight: 500,
        color: theme.palette.primary.main
    },
}))
function DashboardItem({onClick, key, itemLocation, text, children}){
    const {pathname} = useLocation();
    const classes = useStyles();
    return (
        <ListItem
        button
        onClick = {onClick}
        key={key}
      >
        <ListItemIcon>
          {children}
        </ListItemIcon>
        <ListItemText primary={text} classes = {pathname === itemLocation && {
          primary: classes.selectedListText
        }}/>
      </ListItem>
    )
}

export default DashboardItem;