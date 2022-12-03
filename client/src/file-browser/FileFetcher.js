import React, {Component} from 'react';
import {TextField} from "@mui/material";
import axios from "axios";

const fileFetchReqPath = '/files';

class FileFetcher extends Component {
    constructor(props) {
        super(props);
        this.state = {fileLoc: ''};
        this.onFilePathKeyDown = this.onFilePathKeyDown.bind(this);
        this.onFilePathValueChanged = this.onFilePathValueChanged.bind(this);
    }

    fetchFiles(nodes, fileLoc, fileHandler) {
        const hostnames = nodes.map((n) => n.hostname);
        for (const hn of hostnames) {
            const baseURL = `http://${hn}`;
            axios.create({baseURL})
                .get(fileFetchReqPath, {params: {loc: fileLoc}})
                .then((resp) => fileHandler(hn, resp.data))
                .catch((err) => fileHandler(hn, err.message));
        }
    }

    onFilePathValueChanged(e) {
        const fileLoc = e.target.value;
        this.setState({fileLoc});
    }

    onFilePathKeyDown(e) {
        if (e.key === 'Enter') {
            this.fetchFiles(this.props.nodes, this.state.fileLoc, this.props.onFileFetched);
        }
    }

    render() {
        return (<TextField
            fullWidth
            margin="normal"
            id="file-path"
            label="File Location"
            variant="outlined"
            value={this.state.fileLoc}
            onKeyDown={this.onFilePathKeyDown}
            onChange={this.onFilePathValueChanged}/>);
    }
}

export default FileFetcher;