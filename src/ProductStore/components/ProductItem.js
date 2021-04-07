import React from 'react';
import {Button, Card} from "@material-ui/core";

class ProductItem extends React.Component {

    render() {
        console.log(this.props);
        return (
            <Card variant="outlined" elevation={1} >
                <p>{this.props.product.name}</p>
                <p>{this.props.product.count}</p>
                <Button variant="contained" color="secondary" onClick={() => this.props.deleteProduct(this.props.product._id)}>Delete</Button>

            </Card>
        )
    }
}

export default ProductItem;
