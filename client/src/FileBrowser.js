import React from "react";
import {TextField} from "@mui/material";

export default class FileBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.nodes = props.nodes;
        this.state = {loc: undefined};
        this.onFilePathKeyDown = this.onFilePathKeyDown.bind(this);
    }


    onFilePathKeyDown(e) {
        if (e.key === 'Enter') {
            this.setState({loc: e.target.value})
        }
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
                />
            </div>
        );
    }
}