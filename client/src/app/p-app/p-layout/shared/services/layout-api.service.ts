import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from "@angular/common/http";
import { DTOBrand } from "../dto/DTOBrand";
import { DTOCategory } from "../dto/DTOCategories";

// const httpOptions = {
//     headers: new HttpHeaders({

//     })
// }

@Injectable({
    providedIn: 'root'
})

export class LayoutAPIService {
    constructor(private http: HttpClient) { }
    brandURL = "https://api.npoint.io/a988b55c50ff8b1eebd1";
    categoryURL = "https://api.npoint.io/87d82e14eac1dfbd0360";
    productURL = "https://api.npoint.io/9859e399349e166c5721";

    GetProducts() {
        return new Observable<any>((obs) => {
            this.http.get<any>(this.productURL).subscribe((res) => {
                obs.next(res);
                obs.complete();
            }, (err) => {
                obs.error(err);
                obs.complete();
            })
        })
    }

    GetBrands() {
        return new Observable<DTOBrand>((obs) => {
            this.http.get<DTOBrand>(this.brandURL).subscribe((res) => {
                obs.next(res);
                obs.complete();
            }, (err) => {
                obs.error(err);
                obs.complete();
            })
        })
    }

    GetCategories() {
        return new Observable<DTOCategory>((obs) => {
            this.http.get<DTOCategory>(this.categoryURL).subscribe((res) => {
                obs.next(res);
                obs.complete();
            }, (err) => {
                obs.error(err);
                obs.complete();
            })
        })
    }
}
