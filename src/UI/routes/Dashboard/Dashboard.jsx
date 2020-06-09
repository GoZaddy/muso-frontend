import React, {useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Hidden from "@material-ui/core/Hidden";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { v4 as uuidv4 } from "uuid";
import AlbumIcon from "@material-ui/icons/Album";
import PersonIcon from "@material-ui/icons/Person";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import {
  clearAlertAdmin,
  createPlaylist,
  addMusicToPlaylist,
  getAllUsers,
} from "./../../../redux/actions/adminActions";

import { logoutAdmin } from "./../../../redux/actions/authAction";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const drawerWidth = 240;

const Dashboard = ({ isAdminAuthenticated, logOut }) => {
  const history = useHistory();
  useEffect(() => {
    if (!isAdminAuthenticated) {
      //show alert

      history.push("/login");
    }
  }, [isAdminAuthenticated]);
  const useStyles = makeStyles((theme) => ({
    appBar: {
      width: "100vw",
      zIndex: theme.zIndex.drawer + 1,
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      height: "100vh",
      zIndex: 0,
    },
    drawerContainer: {
      overflow: "auto",
    },
    logOut: {
      marginLeft: "auto",
    },
    selectedNavItem: {
      color: theme.palette.primary,
    },
  }));
  const classes = useStyles();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.AppBar}>
        <Toolbar>
          <Hidden mdUp implementation="css">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick = {() => {
                  setIsMobileDrawerOpen(!isMobileDrawerOpen)
              }}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <Button
            color="inherit"
            className={classes.logOut}
            onClick={() => {
              logOut();
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <aside>
        <Hidden smDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <List>
                <ListItem button key={uuidv4()}>
                  <ListItemIcon>
                    <AlbumIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Playlists"} />
                </ListItem>
                <ListItem
                  button
                  key={uuidv4()}
                  classes={classes.selectedNavItem}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Users"} />
                </ListItem>
              </List>
            </div>
          </Drawer>
        </Hidden>
        <Hidden mdUp>
          <SwipeableDrawer className={classes.drawer} disableBackdropTransition={!iOS} disableDiscovery={iOS} anchor = "left" open={isMobileDrawerOpen} onClose = {() => {setIsMobileDrawerOpen(false)}} variant="temporary" classes={{
              paper: classes.drawerPaper,
          }}>
            <Toolbar />
            <div className={classes.drawerContainer}>
              <List>
                <ListItem button key={uuidv4()}>
                  <ListItemIcon>
                    <AlbumIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Playlists"} />
                </ListItem>
                <ListItem
                  button
                  key={uuidv4()}
                  classes={classes.selectedNavItem}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Users"} />
                </ListItem>
              </List>
            </div>
          </SwipeableDrawer>
        </Hidden>
      </aside>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAdminAuthenticated: state.auth.isAdminAuthenticated,
  adminAlert: state.admin.alert,
  users: state.admin.users,
  usersLoading: state.admin.usersLoading,
  usersLoaded: state.admin.usersLoaded,
  playlistsLoading: state.visitor.isPlaylistsLoading,
  playlistsLoaded: state.visitor.isPlaylistsLoaded,
  visitorAlert: state.visitor.alert,
  playlists: state.visitor.playlists,
});

const mapDispatchToProps = {
  logOut: logoutAdmin,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
