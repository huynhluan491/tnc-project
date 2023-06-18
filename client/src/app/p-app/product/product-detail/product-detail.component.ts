import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, filter, map, of, pluck, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productName: string = '';

  breadCrumbList: string[] = [];

  //subscriptions
  getProductDetail_sst: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      tap(params =>
        this.breadCrumbList = [params['categoryname'], params['productname']]),
      switchMap(params => {
        console.log(this.breadCrumbList);
        return of(params)
      }), filter(product => !product)
    ).subscribe(value => console.log(this.breadCrumbList))

  }


}
