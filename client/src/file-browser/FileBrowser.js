import React from "react";
import {Container, Grid} from "@mui/material";
import FileList from "./FileList";
import FileFetcher from "./FileFetcher";
import {AppContext} from "../AppContext";

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

    onFileFetched(fetchIndex, node, contentOrErr) {
        let files = this.state.fetchedFiles,
            index = this.state.fetchIndex;

        if (this.state.fetchIndex < fetchIndex) {
            // a batch of files that are newly fetched is received
            // clear the list of files to show
            files = [];
            index = fetchIndex;
        }

        const hostname = node.alias ? node.alias : node.hostname;

        files.push({hostname, content: contentOrErr});
        files.sort((l, r) => l.hostname.localeCompare(r.hostname));

        this.setState({fetchedFiles: files, fetchIndex: index});
    }

    render() {
        return (<Container>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <FileFetcher onFileFetched={this.onFileFetched}
                                 nodes={this.context.nodes}
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