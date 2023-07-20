export class DTOProduct {
  ProductID: number;
  Stock: number;
  Name: string;
  Favorite: number;
  CategoryID: number;
  Price: number;
  BrandID: number;
  Image: string;
  Sale: number;
  Description: string;
  StatusID: number;
  createdAt: string;
  ImageSrc?: string;

  constructor(
    productID: number,
    stock: number,
    name: string,
    favorite: number,
    categoryID: number,
    price: number,
    brandID: number,
    image: string,
    sale: number,
    description: string,
    statusID: number,
    createdAt: string
  ) {
    this.ProductID = productID;
    this.Stock = stock;
    this.Name = name;
    this.Favorite = favorite;
    this.CategoryID = categoryID;
    this.Price = price;
    this.BrandID = brandID;
    this.Image = image;
    this.Sale = sale;
    this.Description = description;
    this.StatusID = statusID;
    this.createdAt = createdAt;
  }
}
