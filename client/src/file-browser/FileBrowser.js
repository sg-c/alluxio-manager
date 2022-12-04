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
        this.state = {files: []};
        this.onFileFetched = this.onFileFetched.bind(this);
    }

    onFileFetched(hostname, contentOrErr) {
        console.log(JSON.stringify(contentOrErr));
        const files = this.state.files;
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
                    <FileList files={this.state.files} selected={0}/>
                </Grid>
            </Grid>
        </Container>);
    }
}