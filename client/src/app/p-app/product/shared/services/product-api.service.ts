import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class ProductAPIService {
    constructor(private http: HttpClient) { }
    productURL = "http://localhost:3001/api/v1/product";

    GetProducts(queryString: string) {
        const params = new HttpParams().set('paramName', queryString);
        return new Observable<any>((obs) => {
            this.http.get<any>(this.productURL, { params }).subscribe((res) => {
                obs.next(res);
                obs.complete();
            }, (err) => {
                obs.error(err);
                obs.complete();
            })
        })
    }
}