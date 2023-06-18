import { LayoutAPIService } from './../../p-layout/shared/services/layout-api.service';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, pluck, tap } from "rxjs";
@Component({
  selector: "product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  //Data declarations
  productList: any[] = []
  categoryName: string = '';

  //Subscription declarations
  getListProduct_sst: Subscription

  //Grid declarations
  public pageSize = 5;
  public skip = 0;

  constructor(private layoutAPIService: LayoutAPIService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.pipe(
      pluck('categoryname'),
      tap(value => this.categoryName = value),
    )
    this.getProducts()
  }
  // -- test api c#
  // PostProducts() {
  //   this.getListProduct_sst = this.layoutAPIService
  //     .PostProducts()
  //     .subscribe((res) => {
  //       this.data ={
  //         filteredItems : [...res.filteredItems]
  //       };
  //       console.log(this.data);
  //     });
  //   }


  getProducts() {
    this.getListProduct_sst = this.layoutAPIService
      .GetProducts()
      .subscribe((res) => {
        this.productList = [...res]
      });

  }
}
