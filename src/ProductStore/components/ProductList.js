import React from 'react';
import ProductCrudHelper from "../db/util/helper";
import ProductItem from './ProductItem';
import {Link} from 'react-router-dom';
import ProductCreateModal from "./ProductCreateModal";
import {FormControl, Grid, Select} from "@material-ui/core";
import AreYouSureDialog from "./AreYouSureDialog";


const SORT_BY = Object.freeze({
    DATE: "DATE",
    NAME: "NAME",
    QUANTITY: "QUANTITY"
});

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.productCrudHelper = new ProductCrudHelper();
        this.state = {
            products: this.productCrudHelper.getAll(),
            modalOpen: false,
            confirmDeleteOpen: false,
            productToDelete: undefined,
            sorting: SORT_BY.DATE
        };

        this.handleListUpdate = this.handleListUpdate.bind(this);
        this.addRealProd = this.addRealProd.bind(this);
        this.resort = this.resort.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.discardDelete = this.discardDelete.bind(this);
        this.openDeleteConfirm = this.openDeleteConfirm.bind(this);
    }

    componentDidMount() {
        this.productCrudHelper.addProductListener(this.handleListUpdate);
    }

    handleListUpdate(product) {
        this.setState({sorting: SORT_BY.DATE});
        this.setState({products: this.productCrudHelper.getAll()});
        console.log(this.state.modalOpen);
    }

    handleModalClose() {
        this.setState({modalOpen: false})
    }

    openDeleteConfirm(productId) {
        console.log(productId);
        this.setState({productToDelete: productId, confirmDeleteOpen: true})
    }

    deleteProduct() {
        if(this.state.productToDelete) {
            this.productCrudHelper.delete(this.state.productToDelete);
            this.discardDelete();
        }
    }

    discardDelete() {
        this.setState({productToDelete: undefined, confirmDeleteOpen: false})
    }

    addRealProd(product) {
        this.setState({modalOpen: false});
        this.productCrudHelper.create(product);
    }


    resort(e) {
        this.setState({sorting: e.target.value});
        if(e.target.value=== SORT_BY.DATE) {
            this.state.products.sort((first, second) => first?._id.localeCompare(second?._id));
        } else if (e.target.value === SORT_BY.NAME) {
            this.state.products.sort((first, second) => first?.name?.toLowerCase().localeCompare(second?.name?.toLowerCase()));
        } else if (e.target.value === SORT_BY.QUANTITY) {
            this.state.products.sort((first, second) => first?.count - second?.count);
        }
    }


    render() {
        return (
            <div>
                <Grid container xs={12}>
                    <Grid item xs={3}>
                        <FormControl variant="outlined">
                            <Select native value={this.state.sorting} onChange={this.resort}>
                                <option value={SORT_BY.DATE}>Date</option>
                                <option value={SORT_BY.NAME}>Name</option>
                                <option value={SORT_BY.QUANTITY}>Quantity</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        {
                            this.state.products.map(product => {
                                return (
                                    <div>
                                        <ProductItem {...{product: product, deleteProduct: this.openDeleteConfirm}}/>
                                        <Link to={`/products/${product._id}`}>{product.name}</Link>
                                    </div>
                                );
                            })}
                    </Grid>
                    <Grid item xs={3}>
                        <button onClick={(e) => this.setState({modalOpen: true})}>Click me</button>
                    </Grid>
                </Grid>
                <ProductCreateModal {...{open: this.state.modalOpen, onCreate: this.addRealProd}}/>
                <AreYouSureDialog {...{
                    open: this.state.confirmDeleteOpen,
                    onDelete: this.deleteProduct,
                    onDiscard: this.discardDelete
                }}/>
            </div>
        )
    }
}

export default ProductList;
