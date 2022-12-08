import React from "react";
import {Container, Grid} from "@mui/material";
import FileList from "./FileList";
import FileFetcher from "./FileFetcher";
import {AppContext, FILE_BROWSER_STATE, NODE_MANAGER_STATE} from "../AppContext";

/**
 * FileBrowser does following things:
 *  - reads a list of nodes (from Redux??) that are selected by the user
 *  - allows the user specify the location of a particular file w.r.t each node
 *  - fetch and display that particular file from each node from specified location
 */

export default class FileBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fetchedFiles: [], fetchIndex: 0, fileLoc: ''};
        this.onFileFetched = this.onFileFetched.bind(this);
        this.onFileLocChanged = this.onFileLocChanged.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        this.setState(this.context[FILE_BROWSER_STATE]);
    }

    updateState(state) {
        this.setState(state);
        this.context.onContextChanged(FILE_BROWSER_STATE, state);
    }

    onFileLocChanged(fileLoc) {
        this.updateState({fileLoc});
    }

    onFileFetched(fetchIndex, loc, node, contentOrErr) {
        let files = this.state.fetchedFiles,
            index = this.state.fetchIndex;

        if (index < fetchIndex) {
            // a batch of files that are newly fetched is just received,
            // clear the list of files to show
            files = [];
            index = fetchIndex;
        }

        const hostname = node.alias ? node.alias : node.hostname;
        const fileType = loc.substring(loc.lastIndexOf('.') + 1);

        files.push({hostname, content: contentOrErr, type: fileType});
        files.sort((l, r) => l.hostname.localeCompare(r.hostname));

        this.updateState({fetchedFiles: files, fetchIndex: index})
    }

    render() {
        return (<Container>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <FileFetcher
                        fetchIndex={this.state.fetchIndex}
                        fileLoc={this.state.fileLoc}
                        onFileLocChanged={this.onFileLocChanged}
                        onFileFetched={this.onFileFetched}
                        nodes={this.context[NODE_MANAGER_STATE].nodes}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FileList files={this.state.fetchedFiles} selected={0}/>
                </Grid>
            </Grid>
        </Container>);
    }
}

FileBrowser.contextType = AppContext;