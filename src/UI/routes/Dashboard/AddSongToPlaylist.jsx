import React from "react";
import { connect } from "react-redux";
import { addMusicToPlaylist } from "../../../redux/actions/adminActions";
import {Formik, Form, FieldArray} from "formik"
import AddSongCard from "../../components/AddSongCard";
import {Container, Typography, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1.5rem",
    margin: "1rem 0"
  }
}));
function AddSongToPlaylist({playlist,addSongToPlaylist}) {
  const classes = useStyles();
  

  return (
    <Container>
      <Typography variant = "h3" align = "center" className = {classes.title}>Add new songs to this playlist</Typography>
      <Container>
      <Formik
        initialValues={{
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
            console.log(values)
            addSongToPlaylist(playlist.id, values)
          }
        } 
        render={(formik) => (
          <Form>
            {
              <FieldArray
                name="songs"
                render={(arrayhelpers) => (
                  <>
                  <div className = {classes.addSongsContainer}>
                  {formik.values.songs.map((song, idx) => {
                      return (
                        <AddSongCard formik = {formik} idx = {idx} songArrayHelpers = {arrayhelpers} />
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
      </Container>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  adminAlert: state.admin.alert,
});

const mapDispatchToProps = {
  addSongToPlaylist: addMusicToPlaylist,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSongToPlaylist);
