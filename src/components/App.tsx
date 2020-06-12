import * as React from 'react';
import { hot } from 'react-hot-loader';
import MenuAppBar from './MenuAppBar/MenuAppBar';
import { HashRouter as Router } from "react-router-dom";
import AppContainer from './AppContainer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SnackbarComponent from './SnackbarComponent';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Router>
                <MenuAppBar></MenuAppBar>
                <AppContainer></AppContainer>
                <SnackbarComponent></SnackbarComponent>
            </Router>
        </MuiThemeProvider>
    )
}

export default hot(module)(App);