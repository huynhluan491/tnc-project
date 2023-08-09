import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DTOProduct } from '../dto/DTOProduct';
import { DTOResponse } from '../dto/DTOResponse';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/app/environments/environments';
import { DTOProductFilter } from '../dto/DTOProductFilter.dto';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
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

  getProduct(filter: DTOProductFilter): Observable<DTOResponse> {
    return this.http.post<DTOResponse>(`${environment.apiUrl}/product/search`, filter);
  }

  getDetaiProductByName(Name: string): Observable<DTOResponse> {
    const encodedName = encodeURI(Name);
    const headers = new HttpHeaders ({
      'Name': encodedName
    })
    console.log('header', headers);
    
    return this.http.get<DTOResponse>(`${environment.apiUrl}/product`, {headers}).pipe(catchError(this.handleError));
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



  getProductImage(imageName: string): Observable<any> {
    return this.http
      .get(`/api/v1/product/image/${imageName}`)
      .pipe(
        map((res: any) => {
          const byteCharacters = atob(res.Data.base64);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'image/png' });
          const url = URL.createObjectURL(blob);
          return this.sanitizer.bypassSecurityTrustResourceUrl(url);
        })
      )
      .pipe(catchError(this.handleError));
  }

  updateProductRating() {
    
  }


  
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Something went wrong. Please try again later.')
    );
  }
}
