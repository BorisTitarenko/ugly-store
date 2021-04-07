import React from 'react';
import {
    Button,
    Dialog,
    FormControl,
    TextField,
    withStyles
} from "@material-ui/core";

const style = (theme) => ({
    modal: {
        //display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        border: '2px solid #000',
        padding: theme.spacing(2, 4, 3)
    },
    input: {
        margin: theme.spacing(1, 3, 1, 3)
    }
});

class ProductCreateModal extends React.Component {
    constructor({props}) {
        super({props});
        this.handleClose = this.handleClose.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.state = {open: this.props.open, newProduct: undefined};
    }

    handleCreate(e) {
        e.preventDefault();
        this.setState({open: false});
        this.props.onCreate(this.state.newProduct);
    }

    handleClose(e) {
        this.setState({open: false});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({open: nextProps.open});
        if(nextProps.product) {
            this.setState({newProduct: {
            imageUrl: nextProps.product.imageUrl,
            name: nextProps.product.name,
            count: nextProps.product.count,
            size: nextProps.product.size,
            weight: nextProps.product.weight
        }})
        }
    }



    render() {
        return (
            <Dialog
                variant="outlined"
                className={this.props.classes.paper}
                open={this.state.open}
                onClose={this.props.onClose}
            >
                <div>
                    <form onSubmit={this.handleCreate} className={this.props.classes.modal}>
                        <FormControl className={this.props.classes.input}>
                            <TextField
                                ref="nameInput"
                                defaultValue={this.state.newProduct?.name}
                                label="Product Name"
                                variant="outlined"
                                aria-describedby="Input name"
                                onChange={(e) =>
                                this.setState({newProduct: {...this.state.newProduct, name: e.target.value}})}/>
                        </FormControl>
                        <br/>
                        <FormControl className={this.props.classes.input}>
                            <TextField
                                id="image-url-input"
                                defaultValue={this.state.newProduct?.imageUrl}
                                label="Product Image Url"
                                variant="outlined"
                                aria-describedby="Input url"
                                onChange={(e) => this.setState({newProduct: {...this.state.newProduct, imageUrl: e.target.value}})}/>
                        </FormControl>
                        <br/>

                        <FormControl className={this.props.classes.input}>
                            <TextField
                                id="count-input"
                                defaultValue={this.state.newProduct?.count}
                                label="Product Count"
                                type="number"
                                variant="outlined"
                                aria-describedby="Input count"
                                onChange={(e) => this.setState({newProduct: {...this.state.newProduct, count: e.target.value}})}/>
                        </FormControl>
                        <br/>

                        <FormControl className={this.props.classes.input}>
                            <TextField
                                id="width-input"
                                defaultValue={this.state.newProduct?.size?.width}
                                type="number"
                                label="Product Width, mm"
                                variant="outlined"
                                aria-describedby="Input width"
                                onChange={(e) => this.setState({newProduct: {...this.state.newProduct, size: {...this.state.newProduct.size, width: e.target.value}}})}/>
                        </FormControl>
                        <br/>

                        <FormControl className={this.props.classes.input}>
                            <TextField
                                id="height-input"
                                defaultValue={this.state.newProduct?.size?.height}
                                type="number"
                                label="Product Height, mm"
                                variant="outlined"
                                aria-describedby="Input height"
                                onChange={(e) => this.setState({newProduct: {...this.state.newProduct, size: {...this.state.newProduct.size, height: e.target.value}}})}/>
                        </FormControl>
                        <br/>

                        <FormControl className={this.props.classes.input}>
                            <TextField
                                id="weight-input"
                                defaultValue={this.state.newProduct?.weight}
                                type="number"
                                label="Product Weight, kg"
                                variant="outlined"
                                aria-describedby="Input weight"
                                onChange={(e) => this.setState({newProduct: {...this.state.newProduct, weight: e.target.value}})}/>
                        </FormControl>
                        <br/>
                        <FormControl className={this.props.classes.input}>
                            <Button type="submit" variant="contained" color="primary" >Submit</Button>
                        </FormControl>
                        <FormControl className={this.props.classes.input}>
                            <Button variant="contained" onClick={(e) => this.setState({open: false})}>Close</Button>
                        </FormControl>
                    </form>
                </div>
            </Dialog>
        )
    }
}

export default withStyles(style)(ProductCreateModal)