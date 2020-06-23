import React, {useState} from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddSongToPlaylist from "./Dashboard/AddSongToPlaylist"
import {
  Toolbar,
  Container,
  Typography,
  List,
  ListItem,
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Link,
  Avatar,
  Button,
  Modal,
} from "@material-ui/core";

import {
  DEEZER,
  YOUTUBE_MUSIC,
  SPOTIFY,
  AMAZON_MUSIC,
  APPLE_MUSIC,
  AUDIOMACK,
} from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  red: {
    color: "red",
  },
  container: {
    padding: "1.5rem",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  likes: {
    fontWeight: 500,
  },
  artistes: {
    fontWeight: 500,
    marginBottom: "1rem",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: "80%",
    margin: "auto",
    maxWidth: "600px",
  },
  card: {
    width: "100%",
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
    borderRadius: "10px",
    padding: theme.spacing(2, 4, 3),
  },
}));

function mapStreamingServiceToImage(link) {
  switch (link) {
    case YOUTUBE_MUSIC:
      return "/assets/youtube.svg";
    case APPLE_MUSIC:
      return "/assets/itunes.svg";
    case AMAZON_MUSIC:
      return "/assets/amazon.svg";
    case SPOTIFY:
      return "/assets/spotify.svg";
    case DEEZER:
      return "/assets/deezer.svg";
    case AUDIOMACK:
      return "/assets/mark-orange.png";
  }
}

function PlaylistDetails({
  location: {
    state: { playlist },
  },
}) {
  console.log(playlist);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Toolbar />
      <Container className={classes.container}>
        <div>
          <Button
            variant="contained"
            color = "primary"
            onClick = {
             handleOpen
            }
            classes={{
              containedPrimary: classes.customContainedPrimary,
            }}
          >
            Add Song
          </Button>
        </div>
        <div>
          <Typography variant="h1" align="center" className={classes.title}>
            {playlist.name}
          </Typography>
          <Typography
            align="center"
            variant="body2"
            className={classes.date}
            gutterBottom
          >
            {new Date(playlist.date).toDateString()}
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FavoriteIcon
              style={{ marginRight: "0.5rem" }}
              color="primary"
              classes={{ colorPrimary: classes.red }}
            />
            <Typography
              align="center"
              variant="body2"
              className={classes.likes}
            >{`${playlist.likes} likes`}</Typography>
          </div>
        </div>
        <div className={classes.listContainer}>
          <List
            style={{
              width: "100%",
            }}
          >
            {playlist.songs.map((song) => (
              <ListItem className={classes.cardContainer}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5">
                        {song.name}
                      </Typography>
                      <Typography variant="body2" className={classes.artistes}>
                        {song.artistes}
                      </Typography>
                      <Typography variant="body2">{song.note}</Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {song.song_links.map((link) => (
                      <Link href={link.link}>
                        <Avatar
                          src={mapStreamingServiceToImage(
                            link.streaming_service
                          )}
                        />
                      </Link>
                    ))}
                  </CardActions>
                </Card>
              </ListItem>
            ))}
          </List>
        </div>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modalPaper}>
          <AddSongToPlaylist playlist = {playlist}/>
        </div>
      </Modal>
    </>
  );
}

export default PlaylistDetails;
