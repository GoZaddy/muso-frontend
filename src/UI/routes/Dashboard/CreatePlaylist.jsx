import React from "react";
import { connect } from "react-redux";
import { useFormik, Form, FieldArray, Formik } from "formik";

import {
  clearAlertAdmin,
  createPlaylist,
} from "./../../../redux/actions/adminActions";
import {
  Typography,
  makeStyles,
  TextField,
  Button,
  Select,
  TextareaAutosize,
  MenuItem,
} from "@material-ui/core";
import { createRef } from "react";

import AddSongCard from "../../components/AddSongCard";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
  title: {
    fontSize: "1.5rem",
  },
  subTitle: {
    fontSize: "1rem",
  },
  addSongsContainer:{
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
        
        flexWrap: "wrap"
      },
  }
}));

function CreatePlaylist({ createPlaylist }) {
  const classes = useStyles();
  const formRef = createRef();

  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.title} align="center">
        Create a new playlist
      </Typography>
      <Formik
        initialValues={{
          name: "",
          songs: [
            {
              name: "",
              artistes: [],
              note: "",
              song_links: [
                {
                  streaming_service: "",
                  link: "",
                },
              ],
            },
          ],
        }}

        onSubmit = {
          (values) => {
            createPlaylist(values)
            console.log(values)
          }
        } 
        render={(formik) => (
          <Form>
            <TextField
              label="Name of Playlist"
              id="standard-basic"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {
              <FieldArray
                name="songs"
                render={(arrayhelpers) => (
                  <>
                  <div className = {classes.addSongsContainer}>
                  {formik.values.songs.map((song, idx) => {
                      return (
                        <AddSongCard formik = {formik} idx = {idx} />
                      );
                    })}
                  </div>
                    

                    <Button
                      color="primary"
                      onClick={() => {
                        console.log(formik.values);
                        arrayhelpers.push({
                          name: "",
                          artistes: [],
                          note: "",
                          song_links: [
                            {
                              streaming_service: "",
                              link: "",
                            },
                          ],
                        });
                      }}
                    >
                      Add Song
                    </Button>
                  </>
                )}
              />
            }
            <Button type = "submit">Submit</Button>
          </Form>
        )}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  adminAlert: state.admin.alert,
});

const mapDispatchToProps = {
  createPlaylist: createPlaylist,
  clearAlert: clearAlertAdmin,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist);
