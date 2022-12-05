import React, {Component} from 'react';
import {TextField} from "@mui/material";
import axios from "axios";

const fileFetchReqPath = '/file';

class FileFetcher extends Component {
    constructor(props) {
        super(props);
        this.state = {fileLoc: ''};
        this.fetchIndex = 0;
        this.onFilePathKeyDown = this.onFilePathKeyDown.bind(this);
        this.onFilePathValueChanged = this.onFilePathValueChanged.bind(this);
    }

    fetchFiles(idx, nodes, loc, fileHandler) {
        for (const node of nodes) {
            const hn = node.hostname;
            axios.create({baseURL: `http://${hn}`})
                .get(fileFetchReqPath, {params: {loc}})
                .then((resp) => fileHandler(idx, node, resp.data))
                .catch((err) => fileHandler(idx, node, err.message));
        }
    }

    onFilePathValueChanged(e) {
        const fileLoc = e.target.value;
        this.setState({fileLoc});
    }

    onFilePathKeyDown(e) {
        if (e.key === 'Enter') {
            const idx = ++this.fetchIndex,
                nodes = this.props.nodes,
                fileLoc = this.state.fileLoc,
                fileHandler = this.props.onFileFetched;
            this.fetchFiles(idx, nodes, fileLoc, fileHandler);
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