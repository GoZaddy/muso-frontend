import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  Toolbar,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Link,
  Avatar
} from "@material-ui/core";

import {
    DEEZER,
    YOUTUBE_MUSIC,
    SPOTIFY,
    AMAZON_MUSIC,
    APPLE_MUSIC
} from "../../utils/constants"

const useStyles = makeStyles({
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
    marginBottom: "1rem"
  },
  listContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent:"center",
      alignContent: "center",
      alignItems: "center"
  },
  cardContainer: {
    width: "80%",
    margin: "auto",
    maxWidth: "600px"
  },
  card: {
   width: "100%"
  }
});


function mapStreamingServiceToImage(link){
    switch(link){
        case YOUTUBE_MUSIC:
            return "/assets/youtube.svg"
        case APPLE_MUSIC:
            return "/assets/itunes.svg"
        case AMAZON_MUSIC:
            return "/assets/amazon.svg"
        case SPOTIFY:
            return "/assets/spotify.svg"
        case DEEZER:
            return "/assets/deexer.svg"
    }
}

function PlaylistDetails({
  location: {
    state: { playlist },
  },
}) {
  console.log(playlist);
  const classes = useStyles();
  return (
    <>
      <Toolbar />
      <Container className={classes.container}>
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
        <div className= {classes.listContainer}>
        <List style = {{
            width:"100%"
        }}>
          {playlist.songs.map((song) => (
            <ListItem className = {classes.cardContainer}>
              <Card className = {classes.card}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {song.name}
                    </Typography>
                    <Typography variant="body2" className = {classes.artistes}>
                      {song.artistes.join(", ")}
                    </Typography>
                    <Typography variant="body2">
                      {song.note}
                    </Typography>

                  </CardContent>
                </CardActionArea>
                <CardActions>
                  {song.song_links.map((link) => (
                      <Link href={link.link}>
                         <Avatar src = {mapStreamingServiceToImage(link.streaming_service)} />
                      </Link>
                      
                  ))}
                </CardActions>
              </Card>
            </ListItem>
          ))}
        </List>
        </div>
        
      </Container>
    </>
  );
}

export default PlaylistDetails;

/**
 * 
 * <ListItemText>{song.name}</ListItemText>
              <ListItemText>{song.artistes.join(", ")}</ListItemText>
              <ListItemText>{song.note}</ListItemText>
              {song.song_links.map((link) => (
                <a href={link.link}>{link.streaming_service}</a>
              ))}
 */
