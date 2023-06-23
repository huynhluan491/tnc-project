import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { DTORespone } from '../dto/DTORespone';

@Injectable({
  providedIn: 'root',
})
export class LayoutAPIService {
  constructor(private http: HttpClient) {}
  brandURL = 'https://api.npoint.io/a988b55c50ff8b1eebd1';
  categoryURL = 'https://api.npoint.io/87d82e14eac1dfbd0360';
  productURL = 'https://api.npoint.io/20b043a1de7e8325bdd4';
  filterProductURL = 'http://localhost:3001/api/v1/product/?';
  //Chưa chỉnh lại res từ api nên chưa gán DTO được

  GetProducts() {
    return this.http.get<any>(this.productURL);
  }

  GetFilterProducts(filterProductURL: string) {
    return new Observable<any>((obs) => {
      this.http.get<any>(filterProductURL).subscribe(
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
  GetBrands() {
    return new Observable<DTORespone>((obs) => {
      this.http.get<DTORespone>(this.brandURL).subscribe(
        (res) => {
          3;
        },
        (err) => {
          obs.error(err);
          obs.complete();
        }
      );
    });
  }

  GetCategories() {
    return new Observable<DTORespone>((obs) => {
      this.http.get<DTORespone>(this.categoryURL).subscribe(
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
