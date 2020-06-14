import React, { useEffect, useState } from "react";
import {
  clearAlertAdmin,
  createPlaylist,
  addMusicToPlaylist,
  getAllPlaylists,
} from "./../../../redux/actions/adminActions";
import { Container, makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import PlaylistCard from "./../../components/PlaylistCard";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal"
import CreatePlaylist from "./CreatePlaylist";

const useStyles = makeStyles((theme) => ({
  progressIndicator: {
    position: "absolute",
    top: "50%",
    right: "50%",
  },
  justifyEnd: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem 2rem 0 0",
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
  modalPaper: {
  margin: "3rem auto 0 auto",
  overflow: "scroll",
    width: "80vw",
    height: "80vh",
    
    backgroundColor: "white",
    //backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    
    padding: theme.spacing(2, 4, 3),
  },
}));

function Playlists({
  clearAlert,
  playlists,
  playlistsLoading,
  playlistsLoaded,
  getPlaylists,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
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

  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Toolbar />

      {playlistsLoaded && (
        <>
          <Hidden smUp>
            <Fab
              onClick = {handleOpen}
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
                    onClick = {handleOpen}
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modalPaper}>
          <CreatePlaylist />
        </div>
      </Modal>
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
  clearAlert: clearAlertAdmin,
};
export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
