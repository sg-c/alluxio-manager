import React, {Component} from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Button, TextField} from "@mui/material";

class NodePropInput extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        return (<Grid2 xs={this.props.size}>
            <TextField
                label={this.props.label}
                value={this.props.value}
                onChange={this.onChange}
            />
        </Grid2>);
    }
}

class NodePropAddButton extends Component {
    constructor(props) {
        super(props);
        this.onClicked = this.onClicked.bind(this);
    }

    onClicked() {
        this.props.onAddNode();
    }

    render() {
        return (<Grid2 xs={this.props.size} size="medium">
            <Button variant="outlined" onClick={this.onClicked}>
                Add Node
            </Button>
        </Grid2>)
    }
}

export default class NodeInput extends Component {
    DEFAULT_NODE_PROPS = {hostname: '', isMain: '', tags: '', alias: ''};

    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.DEFAULT_NODE_PROPS);
        this.onAddNode = this.onAddNode.bind(this);
        this.onHostnameChanged = this.onHostnameChanged.bind(this);
        this.onIsMainChanged = this.onIsMainChanged.bind(this);
        this.onTagsChanged = this.onTagsChanged.bind(this);
        this.onAliasChanged = this.onAliasChanged.bind(this);
    }

    onAddNode() {
        if (this.state.hostname) {
            this.props.onAddNode({
                hostname: this.state.hostname,
                isMain: this.state.isMain === 'true',
                tags: this.state.tags.split(','),
                alias: this.state.alias,
            });
            this.setState(Object.assign({}, this.DEFAULT_NODE_PROPS));
        }
    }

    onHostnameChanged(hostname) {
        this.setState({hostname});
    }

    onIsMainChanged(isMain) {
        this.setState({isMain});
    }

    onTagsChanged(tags) {
        this.setState({tags});
    }

    onAliasChanged(alias) {
        this.setState({alias});
    }

    render() {
        return (<Grid2 container spacing={1} alignItems={'center'}>
            <NodePropInput size={2} label={"hostname"} value={this.state.hostname}
                           onChange={this.onHostnameChanged}/>
            <NodePropInput size={2} label={"alias"} value={this.state.alias}
                           onChange={this.onAliasChanged}/>
            <NodePropInput size={2} label={"isMain"} value={this.state.isMain}
                           onChange={this.onIsMainChanged}/>
            <NodePropInput size={2} label={"tags"} value={this.state.tags}
                           onChange={this.onTagsChanged}/>
            <NodePropAddButton size={2} onAddNode={this.onAddNode}/>
        </Grid2>);
    }
}