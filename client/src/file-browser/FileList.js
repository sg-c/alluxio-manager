import React, {Component} from 'react';
import {Box, Tab, Tabs, TextField} from "@mui/material";

class TabPanel extends Component {
    render() {
        const {value, index, children, node} = this.props;
        return (
            <Box sx={{margin: 1, width: '100%'}}
                 hidden={value !== index}
                 id={`vertical-tabpanel-${index}`}>
                {value === index &&
                    <TextField fullWidth
                               multiline
                               size={"small"}
                               label={node}
                               value={children}/>}
            </Box>);


    }
}

class FileList extends Component {
    constructor(props) {
        super(props);
        this.state = {selected: this.props.selected};
        this.onChanged = this.onChanged.bind(this);
    }

    onChanged(_, selected) {
        this.setState({selected});
    }

    createTabs(files) {
        return !files ? [] : files.map((f, i) => (<Tab label={f.hostname} key={i} id={`file-tab-${i}`}/>));
    }

    createPanels(files, selected) {
        return !files ? [] : files.map((f, i) => (
            <TabPanel key={i} value={selected} index={i} node={f.hostname}>{f.content}</TabPanel>));
    }

    render() {
        const files = this.props.files;
        const selected = this.state.selected;

        return (<Box
            sx={{
                flexGrow: 1, bgcolor: 'background.paper', display: 'flex', borderColor: 'divider',
            }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={this.state.selected}
                onChange={this.onChanged}
                textColor="secondary"
                indicatorColor="secondary"
            >
                {this.createTabs(files)}
            </Tabs>
            {this.createPanels(files, selected)}
        </Box>);
    }
}

export default FileList;