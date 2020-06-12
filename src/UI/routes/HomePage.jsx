import React from "react"
import Scaffold, { DrawerContext } from "../components/Scaffold"
import { useContext } from "react"

const HomePage = () => {
    const setIsDrawerOpen = useContext(DrawerContext)
    return (
        <>
            <h1>heyyy</h1>
            <button onClick = {
                ()=>{
                    setIsDrawerOpen(true)
                }
            }>click</button>
        </>
    )
}

export default HomePage;