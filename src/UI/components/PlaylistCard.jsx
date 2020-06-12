import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Typography, makeStyles } from "@material-ui/core";

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
    console.log(playlist)
    //console.log(playlist.pl)
    const {name, startdate, end_date} = playlist
    
    
    const classes = useStyles();
  return (
    <Card className = {classes.card}>
      <CardActionArea>
        <CardMedia className = {classes.image} image="/assets/headphones.jpg" />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {name}
          </Typography>
          <Typography variant="body2">{`${new Date(startdate).toDateString()} - ${new Date(end_date).toDateString()}`}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary">Open</Button>
      </CardActions>
    </Card>
  );
}

export default PlaylistCard;
