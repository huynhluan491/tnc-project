import { BrandService } from './../../p-layout/shared/services/brand.service';
import { LayoutAPIService } from './../../p-layout/shared/services/layout-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, pluck, takeUntil, tap } from 'rxjs';
import { DTOProduct } from '../shared/dto/DTOProduct.dto';
import { ProductAPIService } from '../shared/services/product-api.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CategoryService } from '../../p-layout/shared/services/category.service';

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
    private productService: ProductAPIService,
    private categoryService: CategoryService,
    private BrandService: BrandService
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

  setCategories() {
    this.categoryService
      .getData(1, 100)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        const categories = res.Data;
        let arr = [];
        categories.forEach((cate) => {
          arr.push({
            type: 'checkbox',
            inputValue: cate.CategoryName,
            field: 'CategoryName',
            labelName: cate.CategoryName,
          });
        });
        var obj = {
          titleFilter: 'Category',
          dataItems: [...arr],
        };
        this.allDataDropdowns.push(obj);
        console.log('this.CategoryFilter', obj);
      });
  }

  setBrands() {
    this.BrandService.getData(1, 100, '')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        const brands = res.Data;
        let arr = [];
        brands.forEach((b) => {
          arr.push({
            type: 'checkbox',
            inputValue: b.BrandName,
            field: 'BrandName',
            labelName: b.BrandName,
          });
        });
        var obj = {
          titleFilter: 'Brand',
          dataItems: [...arr],
        };
        this.allDataDropdowns.push(obj);
      });
  }

  handleGetFilter() {
    this.productService.getArrlabelFilter().subscribe((arr) => {
      this.arrlabelFilter = arr;
    });
    this.setCategories();
    this.setBrands();
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
