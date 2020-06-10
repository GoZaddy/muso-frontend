import React, { useEffect } from "react";
import {
    clearAlertAdmin,
    createPlaylist,
    addMusicToPlaylist,
    getAllUsers,
  } from "./../../../redux/actions/adminActions";
import { Container } from "@material-ui/core";
import { useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from "@material-ui/core/Toolbar"
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography"


function Playlists({ clearAlert, usersLoading, usersLoaded}){
    useEffect(
        () => {
           
        },[]
    )

    useEffect(() => {
        if(usersLoading){

        }
    }, [usersLoading])

    if(usersLoading){
        return <CircularProgress color="secondary" />
    }
    return (
        <>
        <Toolbar />
       <Typography variant = "h1">Dashboard</Typography>
        </>
    )
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
    clearAlert: clearAlertAdmin
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
  