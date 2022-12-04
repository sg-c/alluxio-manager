import React from "react";
import {Container, Grid} from "@mui/material";
import FileList from "./FileList";
import FileFetcher from "./FileFetcher";

/**
 * FileBrowser does following things:
 *  - reads a list of nodes (from Redux??) that are selected by the user
 *  - allows the user specify the location of a particular file w.r.t each node
 *  - fetch and display that particular file from each node from specified location
 */

export default class FileBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fetchedFiles: [], fetchIndex: 0};
        this.onFileFetched = this.onFileFetched.bind(this);
    }

    onFileFetched(fetchIndex, hostname, contentOrErr) {
        if (this.state.fetchIndex < fetchIndex) {
            // a batch of files that are newly fetched is received
            // clear the list of files to show
            this.state.fetchedFiles = [];
            this.state.fetchIndex = fetchIndex;
        }

        const files = this.state.fetchedFiles;
        files.push({hostname: hostname, content: contentOrErr});
        files.sort((l, r) => l.hostname.localeCompare(r.hostname));
        this.setState(files);
    }

    render() {
        return (<Container>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <FileFetcher onFileFetched={this.onFileFetched}
                                 nodes={[{
                                     hostname: 'localhost:8080'
                                 }]}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FileList files={this.state.fetchedFiles} selected={0}/>
                </Grid>
            </Grid>
        </Container>);
    }
}