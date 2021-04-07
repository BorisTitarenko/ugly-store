import React from 'react';
import {withRouter} from 'react-router-dom'
import ProductCrudHelper from "../db/util/helper";
import {Button, Grid, TextField} from "@material-ui/core";
import Image from 'material-ui-image';
import ProductCreateModal from "./ProductCreateModal";
import Comment from "./Comment";

class ProductDetails extends React.Component {
    constructor(props) {
        super(props);
        this.productCrudHelper = new ProductCrudHelper();
        this.state = {productId: this.props.match.params.productId, modalOpen: false, product: undefined, commentText: ""};

        this.commentAddListener = this.commentAddListener.bind(this);
        this.updateProd = this.updateProd.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    componentWillMount() {
        this.setState({product: this.productCrudHelper.getProduct(this.state.productId)})
    }

    componentDidMount() {
        this.productCrudHelper.addProductUpdateListener(() => this.setState({product: this.productCrudHelper.getProduct(this.state.productId)}))
        // this.productCrudHelper.addCommentListener(this.state.productId, this.commentAddListener)
    }

    commentAddListener(comment) {
        this.setState({product: {...this.state.product, comments: this.productCrudHelper.getComments(this.state.productId)}});
    }

    updateProd(product) {
        this.setState({modalOpen: false})
        this.productCrudHelper.update(this.state.productId, product);
    }

    addComment() {
        if(this.state.commentText && this.state.commentText.length > 0){
            let comment = {description: this.state.commentText, date: new Date().toLocaleString()}
            this.productCrudHelper.addComment(this.state.productId, comment);
        }

    }

    render() {
        return (
            <Grid container xs={12}>
                <Grid item xs={5} >
                    <TextField
                        multiline
                        rows={4}
                        variant="outlined"
                        label="Write something"
                        onChange={(e) => this.setState({commentText: e.target.value})}
                    />
                    <Button variant="contained" color="primary" onClick={() => this.addComment()}>
                        Comment
                    </Button>
                    {this.state.product?.comments?.map(comment => <Comment {...{comment}}/>)}
                </Grid>
                <Grid item xs={7}>

                    <Image
                        onClick={() => console.log('onClick')}
                        src={this.state.product.imageUrl}
                        aspectRatio={(16/9)}
                    />
                    <Button variant="contained" onClick={(e) => {this.setState({modalOpen: true})}}>Click me</Button>
                    <ProductCreateModal {...{open: this.state.modalOpen, onCreate: this.updateProd, product: this.state.product}}/>
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(ProductDetails);