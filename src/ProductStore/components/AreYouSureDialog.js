import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

class AreYouSureDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {open: this.props.open}
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({open: nextProps.open})
    }

    render() {
    return (

        <Dialog
            open={this.state.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"aaaa? mmmm?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.props.onDiscard} color="primary">
                    No
                </Button>
                <Button onClick={this.props.onDelete} color="primary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
    }
}

export default AreYouSureDialog;