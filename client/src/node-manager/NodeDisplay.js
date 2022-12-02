import React, {Component} from 'react';
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from "@mui/icons-material/Delete";

class NodeItem extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onRemoveNode(this.props.node);
    }

    render() {
        return (
            <ListItem secondaryAction={
                <IconButton edge="end" onClick={this.onClick}>
                    <DeleteIcon/>
                </IconButton>
            }>
                <ListItemIcon>
                    {this.props.isMain && <StarIcon/>}
                </ListItemIcon>
                <ListItemText primary={this.props.hostname}
                              secondary={this.props.alias}/>
                <ListItemText hidden={this.props.tags.length === 0}
                              secondary={this.props.tags.join(',')}/>
            </ListItem>
        );
    }
}

class NodeDisplay extends Component {
    constructor(props) {
        super(props);
        this.onRemoveNode = this.onRemoveNode.bind(this);
    }

    onRemoveNode(node) {
        this.props.onRemoveNode(node);
    }

    render() {
        const nodes = this.props.nodes;
        return (
            <Box>
                <List>
                    {nodes.map((n) =>
                        <NodeItem node={n}
                                  hostname={n.hostname}
                                  alias={n.alias}
                                  isMain={n.isMain}
                                  tags={n.tags}
                                  onRemoveNode={this.onRemoveNode}/>)}

                </List>
            </Box>
        );
    }
}

export default NodeDisplay;