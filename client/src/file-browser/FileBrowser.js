import React from "react";
import {Container, Grid, TextField} from "@mui/material";
import FileList from "./FileList";

/**
 * FileBrowser does following things:
 *  - reads a list of nodes (from Redux??) that are selected by the user
 *  - allows the user specify the location of a particular file w.r.t each node
 *  - fetch and display that particular file from each node from specified location
 */

const testContet = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. 
Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. 
Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. 
Vestibulum lacinia arcu eget nulla.  
`;

export default class FileBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.nodes = props.nodes;
        this.state = {fileLoc: ''};
        this.onFilePathKeyDown = this.onFilePathKeyDown.bind(this);
        this.onFilePathValueChanged = this.onFilePathValueChanged.bind(this);
    }

    onFilePathValueChanged(e) {
        const value = e.target.value;
        this.setState({fileLoc: value})
    }

    onFilePathKeyDown(e) {
        if (e.key === 'Enter') {
            console.log(`TODO: rest.js /api/file/${this.nodes}/${this.state.fileLoc}`);
            this.setState({files: this.getFiles()})
        }
    }

    getFiles() {
        return [{node: "01.all.io", content: testContet}, {node: "02.all.io", content: "def"},]
    }

    render() {
        return (<Container>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="file-path"
                        label="File Location"
                        variant="outlined"
                        value={this.state.fileLoc}
                        onKeyDown={this.onFilePathKeyDown}
                        onChange={this.onFilePathValueChanged}></TextField>
                </Grid>
                <Grid item xs={12}>
                    <FileList files={this.state.files} selected={0}/>
                </Grid>
            </Grid>
        </Container>);
    }
}