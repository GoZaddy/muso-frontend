import React, { useEffect } from "react";
import {
  clearAlertAdmin,
  createPlaylist,
  addMusicToPlaylist,
  getAllPlaylists,
} from "./../../../redux/actions/adminActions";
import { loadCurrentPlaylist } from "./../../../redux/actions/playlistVisitor";
import { Container, makeStyles } from "@material-ui/core";
import { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import PlaylistCard from "./../../components/PlaylistCard";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  progressIndicator: {
    position: "absolute",
    top: "50%",
    right: "50%",
  },
  justifyEnd: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1.5rem 2rem",
  },
  customContainedPrimary: {
    backgroundColor: "#5cb85c",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#5cb85c",
    },
  },
  fab: {
    position: "fixed",
    zIndex: 1200,
    right: "10%",
    bottom: "10%",
  },
});

function Playlists({
  clearAlert,
  playlists,
  playlistsLoading,
  playlistsLoaded,
  getPlaylists,
}) {
  const classes = useStyles();
  useEffect(() => {
    getPlaylists();
  }, []);

  if (playlistsLoading) {
    return (
      <CircularProgress
        className={classes.progressIndicator}
        color="secondary"
      />
    );
  }
  console.log(playlists);
  return (
    <>
      <Toolbar />

      {playlistsLoaded && (
        <>
          <Hidden smUp>
            <Fab
              color="primary"
              aria-label="add"
              classes={{
                primary: classes.customContainedPrimary,
              }}
              className={classes.fab}
            >
              <AddIcon />
            </Fab>
          </Hidden>

          <Grid container>
            <Hidden xsDown>
              <Grid item xs={12}>
                <div className={classes.justifyEnd}>
                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={<AddIcon />}
                    classes={{
                      containedPrimary: classes.customContainedPrimary,
                    }}
                  >
                    Create PLaylist
                  </Button>
                </div>
              </Grid>
            </Hidden>

            {playlists.map((playlist) => (
              <Grid
                item
                zeroMinWidth
                justify="center"
                alignItems="center"
                xs={12}
                sm={6}
                lg={4}
              >
                <PlaylistCard playlist={playlist} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  adminAlert: state.admin.alert,
  currentPlaylistLoading: state.visitor.isPlaylistLoading,
  currentPlaylistLoaded: state.visitor.isPlaylistLoaded,
  playlistsLoading: state.admin.playlistsLoading,
  playlistsLoaded: state.admin.playlistsLoaded,
  visitorAlert: state.visitor.alert,
  playlists: state.admin.playlists,
  currentPlaylist: state.visitor.currentPlaylist,
});

const mapDispatchToProps = {
  createPlaylist: createPlaylist,
  addMusicToPlaylist: addMusicToPlaylist,
  getPlaylists: getAllPlaylists,
  getCurrentPlaylist: loadCurrentPlaylist,
  clearAlert: clearAlertAdmin,
};
export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
