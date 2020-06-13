import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import { v4 as uuidv4 } from "uuid";
import AlbumIcon from "@material-ui/icons/Album";
import PersonIcon from "@material-ui/icons/Person";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Users from "./Users";
import Playlists from "./Playlists";

import { logoutAdmin } from "./../../../redux/actions/authAction";
import {
  useHistory,
  Route,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import DashboardItem from "./../../components/DashboardItem";
import PlaylistDetails from "../PlaylistDetails";
const drawerWidth = 240;
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

  main: {
    width: "calc(100% - 245px)",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    }, // or 100% for smaller screens
  },
}));

const Dashboard = ({ isAdminAuthenticated, logOut }) => {
  const history = useHistory();

  const classes = useStyles();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const location = useLocation();
  const { url } = useRouteMatch();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.AppBar}>
        <Toolbar>
          <Hidden mdUp implementation="css">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                setIsMobileDrawerOpen(!isMobileDrawerOpen);
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
                <DashboardItem
                  key={uuidv4()}
                  onClick={() => {
                    history.push("/dashboard");
                  }}
                  itemLocation="/dashboard"
                  text="Playlists"
                >
                  <AlbumIcon
                    color={location.pathname == "/dashboard" ? "primary" : ""}
                  />
                </DashboardItem>
                <DashboardItem
                  key={uuidv4()}
                  onClick={() => {
                    history.push(url + "/users");
                  }}
                  itemLocation="/dashboard/users"
                  text="Users"
                >
                  <PersonIcon
                    color={
                      location.pathname == "/dashboard/users" ? "primary" : ""
                    }
                  />
                </DashboardItem>
              </List>
            </div>
          </Drawer>
        </Hidden>
        <Hidden mdUp>
          <SwipeableDrawer
            className={classes.drawer}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            anchor="left"
            open={isMobileDrawerOpen}
            onClose={() => {
              setIsMobileDrawerOpen(false);
            }}
            variant="temporary"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <List>
                <DashboardItem
                  key={uuidv4()}
                  onClick={() => {
                    history.push("/dashboard");
                  }}
                  itemLocation="/dashboard"
                  text="Playlists"
                >
                  <AlbumIcon
                    color={location.pathname == "/dashboard" ? "primary" : ""}
                  />
                </DashboardItem>
                <DashboardItem
                  key={uuidv4()}
                  onClick={() => {
                    history.push(url + "/users");
                  }}
                  itemLocation="/dashboard/users"
                  text="Users"
                >
                  <PersonIcon
                    color={
                      location.pathname == "/dashboard/users" ? "primary" : ""
                    }
                  />
                </DashboardItem>
              </List>
            </div>
          </SwipeableDrawer>
        </Hidden>
      </aside>
      <main className={classes.main}>
        <Switch>
          <Route path="/dashboard/playlists/:id" component={PlaylistDetails} />
          <Route path={`/dashboard/users`} component={Users} />
          <Route path={`/`} component={Playlists} />
        </Switch>
      </main>
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
