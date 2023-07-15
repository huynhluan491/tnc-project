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

  constructor(
    name: string,
    sale: string,
    image: string,
    price: number,
    stock: number,
    brandID: number,
    favorite: number,
    productID: number,
    categoryID: number,
    description: string
  ) {
    this.name = name;
    this.sale = sale;
    this.image = image;
    this.price = price;
    this.stock = stock;
    this.brandID = brandID;
    this.favorite = favorite;
    this.productID = productID;
    this.categoryID = categoryID;
    this.description = description;
  }
}
