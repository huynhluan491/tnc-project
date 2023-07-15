import { DTOResponse } from './DTOResponse';

export interface DTOProduct extends DTOResponse {
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
}
