import { LayoutAPIService } from './../../p-layout/shared/services/layout-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, pluck, takeUntil, tap } from 'rxjs';
import { DTOProduct } from '../shared/dto/DTOProduct.dto';
import { ProductAPIService } from '../shared/services/product-api.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  //Data declarations
  productList: DTOProduct[] = [];
  categoryName: string = '';
  keyFilter: string = 'Default Value Filter'; // load search key
  totalProduct: string = `{ ${0} } san pham`; // load total product
  arrlabelFilter: any[] = [];
  listDataASC = ['Giá ( Thấp - Cao )', 'Giá ( Cao - Thấp )'];
  selectedValue = ' Giá ( Thấp - Cao )';
  allDataDropdowns: any[] = [];
  //Subscription declarations
  getListProduct_sst: Subscription;
  ngUnsubscribe = new Subject<void>();

  //Paginate declarations
  page = 1;
  pageSize = 0;
  totalItems = 0;

  constructor(
    private layoutAPIService: LayoutAPIService,
    private route: ActivatedRoute,
    private productService: ProductAPIService
  ) {}

  ngOnInit() {
    this.route.params.pipe(
      pluck('categoryname'),
      tap((value) => (this.categoryName = value))
    );
    this.getProducts();
    this.handleGetFilter();
  }

  getProducts(headers = new HttpHeaders({}), url = '/api/v1/product') {
    this.getListProduct_sst = this.layoutAPIService
      .GetFilterProducts(url, headers)
      .subscribe((res) => {
        this.productList = [...res.Data];
        this.pageSize = res.PageSize;
        this.totalItems = res.TotalProduct;
      });
  }

  handleGetFilter() {
    this.productService.getArrlabelFilter().subscribe((arr) => {
      this.arrlabelFilter = arr;
    });
    this.productService
      .getBrandFilter()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        var obj = {
          titleFilter: 'Brand',
          dataItems: [...res],
        };
        this.allDataDropdowns.push(obj);
      });
    this.productService
      .getCateFilter()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        var obj = {
          titleFilter: 'Category',
          dataItems: [...res],
        };
        this.allDataDropdowns.push(obj);
      });
  }
  handlePageChange(event: any) {
    this.page = event;
    console.log(event);
    const headers = new HttpHeaders({
      CurrentPage: `${this.page}`,
    });
    this.getProducts(headers);
  }
  handleURL(event: string) {
    console.log('event filter URL', event);
  }
  handleCloseFilter(item) {
    this.arrlabelFilter = this.arrlabelFilter.filter(
      (i) => i.labelName !== item.labelName
    );
    console.log(this.arrlabelFilter);
    this.productService.setRemoveItem([item.labelName]);

    this.productService.setArrlabelFilter(this.arrlabelFilter);
  }
}
