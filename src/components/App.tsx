import * as React from 'react';
import { hot } from 'react-hot-loader';
import MenuAppBar from './MenuAppBar/MenuAppBar';
import { BrowserRouter as Router } from "react-router-dom";
import AppContainer from './AppContainer';

const App = () => {
    return (
        <>
            <Router>
                <MenuAppBar></MenuAppBar>
                <AppContainer></AppContainer>
            </Router>
        </>
    )
}

export default hot(module)(App);