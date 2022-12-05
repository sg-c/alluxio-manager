import './App.css'
import FileBrowser from "./file-browser/FileBrowser";
import NodeManager from "./node-manager/NodeManager";
import {Box, Divider} from "@mui/material";
import React, {Component} from "react";
import {AppContext} from "./AppContext";

class AppWithContext extends Component {
    constructor(props) {
        super(props);
        this.state = {nodes: []};
        this.onContextChanged = this.onContextChanged.bind(this);
    }

    onContextChanged(k, v) {
        this.setState({[k]: v});
    }

    render() {
        return (<AppContext.Provider value={{
                onContextChanged: this.onContextChanged, ...this.state
            }}>
                <Box>
                    <NodeManager></NodeManager>
                    <Divider/>
                    <FileBrowser></FileBrowser>
                </Box>
            </AppContext.Provider>);
    }
}

function App() {
    return (<AppWithContext/>);
}

export default App;
