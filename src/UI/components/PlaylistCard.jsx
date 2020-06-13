import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Typography, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    card:{
        width: "300px",
        margin: "2rem auto"
    },
    image: {
        //marginTop: "1.5rem",
        height: "170px",
        backgroundSize: "cover"
    }
})
function PlaylistCard({playlist}) {
    const history = useHistory();
    const {name, date} = playlist
    
    
    const classes = useStyles();
  return (
    <Card className = {classes.card} onClick = {() => history.push({
      pathname : 'dashboard/playlists/'+playlist.id,
      state: {
        playlist: playlist
      }
    })}>
      <CardActionArea>
        <CardMedia className = {classes.image} image="/assets/headphones.jpg" />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {name}
          </Typography>
          <Typography variant="body2">{`${new Date(date).toDateString()}`}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary">Open</Button>
      </CardActions>
    </Card>
  );
}

export default PlaylistCard;
