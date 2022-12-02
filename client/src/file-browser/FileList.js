import React, {Component} from 'react';
import {Box, Container, Tab, Tabs, TextareaAutosize} from "@mui/material";

class TabPanel extends Component {
    render() {
        const {value, index, children, ...other} = this.props;
        return (<div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (<Container>
                <TextareaAutosize>{children}</TextareaAutosize>
            </Container>)}
        </div>);
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
        return !files ? [] : files.map((f, i) => (<Tab label={f.node} id={`file-tab-${i}`}/>));
    }

    createPanels(files, selected) {
        return !files ? [] : files.map((f, i) => (<TabPanel value={selected} index={i}>{f.content}</TabPanel>));
    }

    render() {
        const files = this.props.files;
        const selected = this.state.selected;

        return (<Box
            sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224}}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={this.state.selected}
                onChange={this.onChanged}
                sx={{borderRight: 1, borderColor: 'divider'}}
            >
                {this.createTabs(files)}
            </Tabs>
            {this.createPanels(files, selected)}
        </Box>);
    }
}

export default FileList;