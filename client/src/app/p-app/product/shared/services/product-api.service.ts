import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from "@angular/common/http";
import { DTORespone } from "src/app/p-app/p-layout/shared/dto/DTORespone";

@Injectable({
    providedIn: 'root'
})

export class ProductAPIService {
    constructor(private http: HttpClient) { }
    productURL = "http://localhost:3001/api/v1/product/";
    testDetailProduct = "https://api.npoint.io/09883bf2746395a86b36";

    GetProducts(queryString: string) {

        return new Observable<any>((obs) => {
            this.http.get<any>(`${this.productURL}${queryString}`).subscribe((res) => {
                obs.next(res);
                obs.complete();
            }, (err) => {
                obs.error(err);
                obs.complete();
            })
        })
    }

    GetProductDetail() {
        return new Observable<DTORespone>((obs) => {
            this.http.get<any>(this.testDetailProduct).subscribe((res) => {
                obs.next(res);
                obs.complete();
            }, (err) => {
                obs.error(err);
                obs.complete();
            })
        })
    }
}
