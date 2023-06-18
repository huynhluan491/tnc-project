import { LayoutAPIService } from './../../p-layout/shared/services/layout-api.service';
import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
@Component({
  selector : "product-list",
  templateUrl :"./product-list.component.html",
  styleUrls :["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit{
  constructor(private layoutAPIService: LayoutAPIService) {}
  getListProduct_sst : Subscription
  data :  any[]=[]
  public pageSize = 5;
  public skip = 0;
  ngOnInit(){
   //this.PostProducts(); -- test api c#
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
          this.data = [...res.filteredItems]
          console.log(this.data);
        });

      }
}
