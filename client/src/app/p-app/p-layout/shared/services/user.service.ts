import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DTOPayment } from '../dto/DTOPayment';
import { DTOUser } from '../dto/DTOUser';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {
    console.log('user service started');
  }

  getData(
    page: number,
    pageSize: number,
    filterStr: string
  ): Observable<DTOUser> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http
      .get<DTOUser>(`/api/v1/user/${filterStr}`, {
        params,
      })
      .pipe(catchError(this.handleError));
  }

  getDataById(id: number): Observable<DTOUser> {
    return this.http
      .get<DTOUser>(`/api/v1/user/${id}`)
      .pipe(catchError(this.handleError));
  }

  createData(user: DTOPayment): Observable<DTOUser> {
    return this.http
      .post<DTOUser>('/api/v1/user', user)
      .pipe(catchError(this.handleError));
  }

  updateData(id: number, user: DTOPayment): Observable<DTOUser> {
    return this.http
      .patch<DTOUser>(`/api/v1/user/${id}`, user)
      .pipe(catchError(this.handleError));
  }

  deleteDataById(id: number): Observable<DTOUser> {
    return this.http
      .delete<DTOUser>(`/api/v1/user/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Something went wrong. Please try again later.')
    );
  }
}
