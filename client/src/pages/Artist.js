import { Header } from "../components"
import Playlist from '../components/Playlist';
import { useLocation } from 'react-router-dom'
import { useEffect } from "react";


const Artist = (props) => {
    const { state } = useLocation();

    console.log(state);
    
    return (
        <>
            <Header />
            {/* <Playlist artists={songs} /> */}
        </>
    )
}

export default Artist