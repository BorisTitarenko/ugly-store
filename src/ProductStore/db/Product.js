class Product {
    constructor({id, imageUrl, name, count, size = {}, weight, comments} = {}) {
        this._id = id
        this.imageUrl = imageUrl;
        this.name = name;
        this.count = count;
        this.size = size;
        this.weight = weight;
        this.comments = comments ? comments : [];
    }
}

export default Product;