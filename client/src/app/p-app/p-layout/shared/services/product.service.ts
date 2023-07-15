import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DTOProduct } from '../dto/DTOProduct';
import { DTOResponse } from '../dto/DTOResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {
    console.log('product service started');
  }

  getData(
    page: number,
    pageSize: number,
    filterStr: string
  ): Observable<DTOResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<DTOProduct>(`/api/v1/product/${filterStr}`, {
      params,
    });
  }

  getDataById(id: number): Observable<DTOResponse> {
    return this.http.get<DTOProduct>(`/api/v1/product/${id}`);
  }
}
