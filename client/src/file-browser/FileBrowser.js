import React from "react";
import {TextField} from "@mui/material";
import FileList from "./FileList";

export default class FileBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.nodes = props.nodes;
        this.state = {loc: ''};
        this.onFilePathKeyDown = this.onFilePathKeyDown.bind(this);
        this.onFilePathValueChanged = this.onFilePathValueChanged.bind(this);
    }

    onFilePathValueChanged(e) {
        const value = e.target.value;
        this.setState({loc: value})
    }

    onFilePathKeyDown(e) {
        if (e.key === 'Enter') {
            console.log(`TODO: rest.js /api/file/${this.nodes}/${this.state.loc}`);
            this.setState({files: this.getFiles()})
        }
    }

    getFiles() {
        return [
            {node: "01.all.io", content: "abc"},
            {node: "02.all.io", content: "def"},
        ]
    }

    render() {
        return (
            <div>
                <TextField
                    id="file-path"
                    label="File Path"
                    variant="outlined"
                    value={this.state.loc}
                    onKeyDown={this.onFilePathKeyDown}
                    onChange={this.onFilePathValueChanged}/>
                <FileList files={this.state.files} selected={0}/>
            </div>
        );
    }
}