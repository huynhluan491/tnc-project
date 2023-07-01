import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { DTORespone } from 'src/app/p-app/p-layout/shared/dto/DTORespone';

@Injectable({
  providedIn: 'root',
})
export class ProductAPIService {
  brandFilter = [
    {
      type: 'checkbox',
      inputValue: 'field value',
      field: 'query field',
      labelName: 'label1',
    },
    {
      type: 'checkbox',
      inputValue: 'field value',
      field: 'query field',
      labelName: 'label2',
    },
    {
      type: 'checkbox',
      inputValue: 'field value',
      field: 'query field',
      labelName: 'label3',
    },
  ];

  CategoryFilter = [
    {
      type: 'checkbox',
      inputValue: 'field value1',
      field: 'query field1',
      labelName: 'label4',
    },
    {
      type: 'checkbox',
      inputValue: 'field value2',
      field: 'query field2',
      labelName: 'label5',
    },
    {
      type: 'checkbox',
      inputValue: 'field value3',
      field: 'query field3',
      labelName: 'label6',
    },
  ];
  productURL = 'http://localhost:3001/api/v1/product/';
  testDetailProduct = 'https://api.npoint.io/09883bf2746395a86b36';
  arrlabelFilter: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  removeItem: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  constructor(private http: HttpClient) {}

  getBrandFilter(): Observable<any[]> {
    return of(this.brandFilter);
  }
  getCateFilter(): Observable<any[]> {
    return of(this.CategoryFilter);
  }
  getArrlabelFilter(): Observable<any[]> {
    return this.arrlabelFilter.asObservable();
  }

  setArrlabelFilter(arr: any[]) {
    this.arrlabelFilter.next(arr);
  }

  getRemoveItem(): Observable<string[]> {
    return this.removeItem.asObservable();
  }

  setRemoveItem(arr: string[]) {
    this.removeItem.next(arr);
  }

  GetProducts(queryString: string) {
    return new Observable<any>((obs) => {
      this.http.get<any>(`${this.productURL}${queryString}`).subscribe(
        (res) => {
          obs.next(res);
          obs.complete();
        },
        (err) => {
          obs.error(err);
          obs.complete();
        }
      );
    });
  }

  GetProductDetail() {
    return new Observable<DTORespone>((obs) => {
      this.http.get<any>(this.testDetailProduct).subscribe(
        (res) => {
          obs.next(res);
          obs.complete();
        },
        (err) => {
          obs.error(err);
          obs.complete();
        }
      );
    });
  }
}
