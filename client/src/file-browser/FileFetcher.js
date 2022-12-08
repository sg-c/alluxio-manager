import React, {Component} from 'react';
import {TextField} from "@mui/material";
import axios from "axios";

const fileFetchReqPath = '/file';

class FileFetcher extends Component {
    constructor(props) {
        super(props);
        this.onFileLocInputKeyDown = this.onFileLocInputKeyDown.bind(this);
        this.onFileLocChanged = this.onFileLocChanged.bind(this);
    }

    fetchFiles(idx, nodes, loc, fileHandler) {
        for (const node of nodes) {
            const hn = node.hostname;
            axios.create({baseURL: `http://${hn}`})
                .get(fileFetchReqPath, {params: {loc}})
                .then((resp) => fileHandler(idx, loc, node, resp.data))
                .catch((err) => fileHandler(idx, loc, node, err.message));
        }
    }

    onFileLocChanged(e) {
        this.props.onFileLocChanged(e.target.value);
    }

    onFileLocInputKeyDown(e) {
        if (e.key === 'Enter' && this.props.fileLoc) {
            const idx = this.props.fetchIndex + 1;
            const nodes = this.props.nodes;
            const fileLoc = this.props.fileLoc;
            const fileHandler = this.props.onFileFetched;

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
            value={this.props.fileLoc}
            onKeyDown={this.onFileLocInputKeyDown}
            onChange={this.onFileLocChanged}/>);
    }
}

export default FileFetcher;