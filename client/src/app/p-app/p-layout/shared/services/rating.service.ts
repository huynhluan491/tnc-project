import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DTOPayment } from '../dto/DTOPayment';
import { DTORating } from '../dto/DTORating';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {
    console.log('rating service started');
  }

  getData(
    page: number,
    pageSize: number,
    filterStr: string
  ): Observable<DTORating> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http
      .get<DTORating>(`/api/v1/rating/${filterStr}`, {
        params,
      })
      .pipe(catchError(this.handleError));
  }

  getDataById(id: number): Observable<DTORating> {
    return this.http
      .get<DTORating>(`/api/v1/rating/${id}`)
      .pipe(catchError(this.handleError));
  }

  createData(rating: DTOPayment): Observable<DTORating> {
    return this.http
      .post<DTORating>('/api/v1/rating', rating)
      .pipe(catchError(this.handleError));
  }

  updateData(id: number, rating: DTOPayment): Observable<DTORating> {
    return this.http
      .patch<DTORating>(`/api/v1/rating/${id}`, rating)
      .pipe(catchError(this.handleError));
  }

  deleteDataById(id: number): Observable<DTORating> {
    return this.http
      .delete<DTORating>(`/api/v1/rating/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Something went wrong. Please try again later.')
    );
  }
}
