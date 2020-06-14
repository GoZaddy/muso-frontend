import React from "react";

import {
  Typography,
  makeStyles,
  TextField,
  Button,
  Select,
  TextareaAutosize,
  MenuItem,
} from "@material-ui/core";

import {
    YOUTUBE_MUSIC,
    AMAZON_MUSIC,
    APPLE_MUSIC,
    DEEZER,
    AUDIOMACK,
    SPOTIFY,
  } from "../../utils/constants";

const useStyles = makeStyles({
    cardContainer: {
        padding: "1rem 0.8rem",
        border: "1px solid #afafaf",
        marginTop: "0.8rem",
        marginRight: "0.8rem",
        borderRadius: "10px",
        maxWidth: "300px"        
    },

    songName: {

    },
    artistes: {

    },
    select: {
        width: "100%",
        marginRight: "1rem"
    },
    link: {

    },
    linkText: {

    },
    notes: {
        display: "block",
        width: "100%"
    },
    subTitle: {
        fontWeight: 500,
        margin: "1rem 0",
        fontSize: "1rem"
    },
    newSongLink: {
        display: "flex",
        flexDirection: "column",
        padding: "1rem 0.8rem",
        border: "1px solid #afafaf",
        marginTop: "0.8rem",
        borderRadius: "10px",
    }
})

function AddSongCard({ formik, idx, song }) {
    const classes = useStyles();
  return (
    <div className = {classes.cardContainer}>
      <TextField
        label="Name of Song"
        id="standard-basic"
        fullWidth
        name={`songs[${idx}].name`}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.songs[idx].name}
      />
      <TextField
        label="Artistes"
        fullWidth
        id="standard-basic"
        name={`songs[${idx}].artistes`}
        type="text"
        onChange={formik.handleChange}
        value={formik.values.songs[idx].artistes}
      />
      <Typography variant="h6" className = {classes.subTitle}>Additional notes:</Typography>
      <TextareaAutosize
        aria-label="Additional Notes"
        name={`songs[${idx}].note`}
        rowsMin = {3}
        className = {classes.notes}
        value={formik.values.songs[idx].note}
        onChange={formik.handleChange}
        placeholder="Empty"
      />
      <div>
        <Typography variant="h6" align="left" className={classes.subTitle}>
          Song Links:
        </Typography>
        <div className={classes.newSongLink}>
          <Select
            name={`songs[${idx}].links[0].streaming_service`}
            value={formik.values.songs[idx].links[0].streaming_service}
            onChange={formik.handleChange}
            className = {classes.select}
          >
            <MenuItem value={YOUTUBE_MUSIC}>Youtube Music</MenuItem>
            <MenuItem value={AMAZON_MUSIC}>Amazon Music</MenuItem>
            <MenuItem value={APPLE_MUSIC}>Apple Music</MenuItem>
            <MenuItem value={DEEZER}>Deezer</MenuItem>
            <MenuItem value={AUDIOMACK}>Audiomack</MenuItem>
            <MenuItem value={SPOTIFY}>Spotify</MenuItem>
          </Select>

          <TextField
          className = {classes.linkText}
            label="Link"
            id="standard-basic"
            name={`songs[${idx}].links[0].link`}
            type="text"
            onChange={formik.handleChange}
            value={formik.values.songs[idx].links[0].link}
          />
        </div>
      </div>
      
      <Button disabled color="primary">
        Add link
      </Button>
    </div>
  );
}

export default AddSongCard;
