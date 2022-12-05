import React, {Component} from 'react';
import {
    Box, IconButton, List, ListItem, ListItemIcon, ListItemText
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from "@mui/icons-material/Delete";

class NodeItem extends Component {
    render() {
        const iconBtn = (<IconButton edge="end"
                                     onClick={() => this.props.onRemoveNode(this.props.node)}>
            <DeleteIcon/>
        </IconButton>);

        return (<ListItem secondaryAction={iconBtn}>
            <ListItemIcon>
                {this.props.isMain && <StarIcon/>}
            </ListItemIcon>
            <ListItemText primary={this.props.hostname}
                          secondary={this.props.alias}/>
            <ListItemText hidden={this.props.tags.length === 0}
                          secondary={this.props.tags.join(',')}/>
        </ListItem>);
    }
}

class NodeDisplay extends Component {
    render() {
        const nodes = this.props.nodes;
        return (<Box>
            <List>
                {nodes.map((n, i) => <NodeItem key={i}
                                               node={n}
                                               hostname={n.hostname}
                                               alias={n.alias}
                                               isMain={n.isMain}
                                               tags={n.tags}
                                               onRemoveNode={this.props.onRemoveNode}/>)}

            </List>
        </Box>);
    }
}

export default NodeDisplay;