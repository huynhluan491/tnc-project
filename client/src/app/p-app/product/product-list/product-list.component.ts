import { LayoutAPIService } from './../../p-layout/shared/services/layout-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, pluck, tap } from 'rxjs';
import { DTOProduct } from '../shared/dto/DTOProduct.dto';
@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  //Data declarations
  productList: DTOProduct[] = [];
  categoryName: string = '';
  arrLableFilter: string[];
  dataDropdownItems: any[] = [
    [
      {
        type: 'checkbox',
        inputValue: 'field value',
        field: 'query field',
        lableName: 'lable',
      },
      {
        type: 'checkbox',
        inputValue: 'field value',
        field: 'query field',
        lableName: 'lable',
      },
      {
        type: 'checkbox',
        inputValue: 'field value',
        field: 'query field',
        lableName: 'lable',
      },
    ],
  ];
  //Subscription declarations
  getListProduct_sst: Subscription;

  //Paginate declarations
  page = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(
    private layoutAPIService: LayoutAPIService,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.route.params.pipe(
      pluck('categoryname'),
      tap((value) => (this.categoryName = value))
    );
    this.getProducts();
  }

  getProducts() {
    this.getListProduct_sst = this.layoutAPIService
      .GetProducts()
      .subscribe((res) => {
        this.productList = [...res.data];
        console.log(this.productList);
      });
  }
  handlePageChange(event: any) {
    this.page = event;
    this.getProducts();
  }
  handleURL(event: string) {
    console.log('event filter URL', event);
  }
  handleLableFilter(event: any) {
    this.arrLableFilter = [...event];
    console.log('event lable filter', this.arrLableFilter);
  }
  handleCloseFilter(item) {
    this.arrLableFilter = this.arrLableFilter.filter((i) => i !== item);
    console.log(this.arrLableFilter);
  }
}
