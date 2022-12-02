import React, {Component} from 'react';
import NodeInput from "./NodeInput";
import NodeDisplay from "./NodeDisplay";


/**
 * NodeManager allows users to manage nodes.
 *
 * A "node" contains following props:
 *  - hostname
 *  - whether it's the main node
 *  - alias (optional)
 *  - a list of tags (optional)
 *
 * Users can
 *  - add/remove nodes
 *  - change props of nodes
 *
 *  NodeManager manages the list of nodes and props of nodes
 *  in following way:
 *   - the information can be stored (in Redux??) and
 *      fetched by other components.
 *   - other components can subscribe the change of the information.
 *   - the information can be persisted to "ALLUXIO_MANAGER_CONF"
 *      env var, which points to a directory.
 */


class NodeManager extends Component {
    constructor(props) {
        super(props);
        this.state = {nodes: []};
        this.onAddNode = this.onAddNode.bind(this);
        this.onRemoveNode = this.onRemoveNode.bind(this);
    }

    onAddNode(node) {
        const nodes = this.state.nodes;
        nodes.push(node);
        this.setState({nodes});
    }

    onRemoveNode(node) {
        const nodes = this.state.nodes;
        const index = nodes.indexOf(node);
        if (index > -1) {
            nodes.splice(index, 1);
        }
        this.setState({nodes})
    }

    render() {
        return (
            <React.Fragment>
                <NodeInput onAddNode={this.onAddNode}/>
                <NodeDisplay nodes={this.state.nodes}
                             onRemoveNode={this.onRemoveNode}/>
            </React.Fragment>
        );
    }
}

export default NodeManager;