import React from 'react';

import {Route, Switch} from "react-router-dom";
import MainPage from "./containers/MainPage/MainPage";
import Albums from "./containers/Albums/Albums";
import Header from "./Componets/Header/Header";
import Tracks from "./containers/Tracks/Tracks";
import Login from "./containers/Login/Login";
import Register from "./containers/Registor/Register";
import TrackHistory from "./containers/TrackHistory/TrackHistory";
import AddArtist from "./containers/AddArtist/AddArtist";
import {Container} from "reactstrap";
import AddAlbums from "./containers/AddAlbums/AddAlbums";
import AddTrack from "./containers/AddTrack/AddTrack";

function App() {
    return (
        <div className="App">
            <Header/>
            <Container>

            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route exact path="/track_history" component={TrackHistory}/>
                <Route path="/add_artist" component={AddArtist}/>
                <Route path="/add_album" component={AddAlbums}/>
                <Route path="/add_track" exact component={AddTrack}/>
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login}/>
                <Route exact path="/albums/:id" component={Albums}/>
                <Route exact path="/tracks/:id" component={Tracks}/>
            </Switch>
            </Container>
        </div>
    );
}

export default App;
