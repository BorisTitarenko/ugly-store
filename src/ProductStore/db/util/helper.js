import firebase from './firebase'
import Product from '../Product';

class ProductCrudHelper {
    constructor() {
        this.productsRef = firebase.database().ref('/products');
    }

    getAll() {
        let products = [];
        this.productsRef.on("value", (items) => {
            items.forEach(item => {
                let data = item.val();
                data.id = item.key;
                products.push(new Product(data));
            });
        });
        return products.reverse();
    }

    getProduct(productId) {
        let data = undefined;
        let productRef = this.productsRef.child(productId);
        productRef.on("value",(product) => {
            console.log(product.val());
            data = product.val();
            data.id = product.key;
            data.comments = product.val().comments ? Object.values(product.val().comments): [];
        });
        // productRef.child("comments").on("value", (comments) => {
        //     comments.forEach((comment) => data.comments.push(comment.val()));
        // });
        console.log(data);
        return new Product(data);
    }


    create(product) {
        this.productsRef.push(product);
    }

    update(productId, product) {
        console.log(product)
        this.productsRef.child(productId).update(product);
    }

    delete(productId) {
        this.productsRef.child(productId).remove();
    }

    addComment(productId, comment) {
        this.productsRef.child(productId).child('comments').push(comment);
    }

    addProductListener(callback) {
        this.productsRef.on('child_added', callback);
        this.productsRef.on('child_removed', callback);
    }

    addProductUpdateListener(callback) {
        this.productsRef.on('child_changed', callback);
    }

    addCommentListener(productId, callback) {
        this.productsRef.child(productId).child('comments').on('child_added', callback)
    }

    getComments(productId) {
        let c = [];
        this.productsRef.child(productId).child('comments').on("value", (comments) => {
            comments.forEach(comment => {
                c.push(comment.val())
            })
        });
        return c;
    }
}

export default ProductCrudHelper;