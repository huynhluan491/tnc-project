export class DTOProduct {
    name: string;
    sale: string;
    image: string;
    price: number;
    stock: number;
    brandID: number;
    favorite: number;
    productID: number;
    categoryID: number;
    description: string;

    constructor() {
        this.name = '';
        this.sale = '';
        this.image = '';
        this.price = 0;
        this.stock = 0;
        this.brandID = null;
        this.favorite = 0;
        this.productID = null;
        this.categoryID = null;
        this.description = '';
    }
}