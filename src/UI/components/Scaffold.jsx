import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";
import { makeStyles, ListItemText } from "@material-ui/core";
import { useState } from "react";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useHistory, useRouteMatch} from "react-router-dom"

let DrawerContext;
const useStyles = makeStyles({
  appBar: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem 1.5rem",
  },

  subButton: {
    marginRight: "1.5rem"
  }
});

function Scaffold({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const {url} = useRouteMatch();
  console.log(url)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  DrawerContext = React.createContext(setIsDrawerOpen);
  return (
    <>
    {
      useMediaQuery('(max-width: 600px)') &&
      <aside>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
        >
          <List>
            <ListItem>
              <Button variant="contained" color="primary">
                Subscribe to Muso
              </Button>
            </ListItem>
            <ListItem>
              <Button color="secondary" onClick = {() => {history.push("/login")}}>Log in as Admin</Button>
            </ListItem>
          </List>
        </Drawer>
      </aside>}

     { useMediaQuery('(min-width:600px)') &&
      <nav>
        <Box className = {classes.appBar}>
          <Button variant="contained" color="primary"  disableElevation = {true} className = {classes.subButton}>
            Subscribe to Muso
          </Button>
          <Button color="secondary" onClick = {() => {history.push(`/login`)}}>Log in as Admin</Button>
        </Box>
      </nav>}
      <DrawerContext.Provider value={setIsDrawerOpen}>
        <main>{children}</main>
      </DrawerContext.Provider>
    </>
  );
}

export { DrawerContext };

export default Scaffold;
