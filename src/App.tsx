import React, { FC } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import MyDay from './pages/MyDay';
import Important from './pages/Important';
import Planned from './pages/Planned';
import { Sidebar } from './components/Sidebar';

const Wrapper = styled.div`
    display: flex;
    flex: 1 1 0px;
    will-change: width;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
`;
  

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 1rem;
        height: 100%;
    }

    #root {
        height: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }
`;

const App: FC = (props) => {
    return (
        <>
            <GlobalStyle />
            <Wrapper>
                <Router>
                    <Sidebar />

                    <Switch>
                        <Route exact path="/">
                            <MyDay />
                        </Route>
                        <Route exact path="/myday">
                            <MyDay />
                        </Route>
                        <Route path="/important">
                            <Important />
                        </Route>
                        <Route path="/planned">
                            <Planned />
                        </Route>
                    </Switch>
                </Router>
            </Wrapper>
        </>
    );
}

export default App;
