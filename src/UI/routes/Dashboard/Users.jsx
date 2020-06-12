import React, { useEffect } from "react";
import {
  clearAlertAdmin,
  createPlaylist,
  addMusicToPlaylist,
  getAllUsers,
} from "./../../../redux/actions/adminActions";
import { Container, makeStyles } from "@material-ui/core";
import { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography";

function Users({ getUsers, clearAlert, users, usersLoading, usersLoaded }) {
  const useStyles = makeStyles((theme) => ({
    progressIndicator: {
      position: "absolute",
      top: "50%",
      right: "50%",
    },
    tableContainer: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        margin: "3rem auto"
    },
    tablePaper: {
        width: "80%",
        maxWidth: "600px"
    },
    table: {
    }
  }));
  const classes = useStyles();

  useEffect(() => {
    getUsers();
  }, []);

  return usersLoading ? (
    <CircularProgress color="secondary" className={classes.progressIndicator} />
  ) : (
    <>
      <Toolbar />
      {usersLoaded && (
          <div className = {classes.tableContainer}>
        <Paper className = {classes.tablePaper}><Table>
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter((user) => !user.is_admin && user.email != "")
              .map((user, idx) => (
                <TableRow>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table></Paper>
        </div>
      )}
    </>
  );
}

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
  getUsers: getAllUsers,
  clearAlert: clearAlertAdmin,
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);
