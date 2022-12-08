import './App.css'
import FileBrowser from "./file-browser/FileBrowser";
import NodeManager from "./node-manager/NodeManager";
import {Box, Tab, Tabs} from "@mui/material";
import React, {Component} from "react";
import {AppContext, FILE_BROWSER_STATE, NODE_MANAGER_STATE} from "./AppContext";

class TabPanel extends Component {
    render() {
        const value = this.props.value, index = this.props.index, child = this.props.child;

        return (<Box
            role={'tabpanel'}
            hidden={value !== index}
            id={`main-tabpanel-${index}`}
        >
            {value === index && <Box sx={{p: 3}}>{child}</Box>}
        </Box>);
    }
}

class RootTabContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {selection: 0}
        this.onChange = this.onChange.bind(this);
    }

    onChange(_, selection) {
        this.setState({selection});
    }

    render() {
        const selection = this.state.selection;
        const children = this.props.children;
        const tabs = children.map((c, i) => (<Tab key={i} label={c.label}/>))
        const panels = children.map((c, i) => (<TabPanel key={i} value={selection} index={i} child={c.component}/>))
        return (<Box>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={selection} onChange={this.onChange}>
                    {tabs}
                </Tabs>
            </Box>
            {panels}
        </Box>)
    }
}

/**
 * The context of the app contains states of subcomponents.
 * In addition, it contains a callback which for subcomponent to update its
 * states in the context.
 */
class AppWithContext extends Component {
    constructor(props) {
        super(props);
        this.state = {
            [FILE_BROWSER_STATE]: {},
            [NODE_MANAGER_STATE]: {},
        };
        this.onContextChanged = this.onContextChanged.bind(this);
    }

    onContextChanged(k, v) {
        // because component states are NOT direct elements of "this.state",
        // we need to destruct the v and merge it before calling setState()
        const state = {...this.state[k], ...v};
        this.setState({[k]: state});
    }

    render() {
        return (<AppContext.Provider value={{
            onContextChanged: this.onContextChanged, ...this.state
        }}>
            <RootTabContainer
                children={[{
                    label: 'Nodes', component: <NodeManager/>
                }, {
                    label: 'Files', component: <FileBrowser/>
                }]}
            />
        </AppContext.Provider>);
    }
}

function App() {
    return (<AppWithContext/>);
}

export default App;
