import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    filterStr: string = ''
  ): Observable<DTOResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http
      .get<DTOResponse>(`/api/v1/product/${filterStr}`, {
        params,
      })
      .pipe(catchError(this.handleError));
  }

  getDataById(id: number): Observable<DTOResponse> {
    return this.http
      .get<DTOResponse>(`/api/v1/product/${id}`)
      .pipe(catchError(this.handleError));
  }

  createData(product: DTOProduct): Observable<DTOResponse> {
    return this.http
      .post<DTOResponse>('/api/v1/product', product)
      .pipe(catchError(this.handleError));
  }

  updateData(id: number, product: DTOProduct): Observable<DTOResponse> {
    return this.http
      .patch<DTOResponse>(`/api/v1/product/${id}`, product)
      .pipe(catchError(this.handleError));
  }

  deleteDataById(id: number): Observable<DTOResponse> {
    return this.http
      .delete<DTOResponse>(`/api/v1/product/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Something went wrong. Please try again later.')
    );
  }
}
