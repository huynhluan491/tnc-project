import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, filter, map, of, pluck, switchMap, takeUntil, tap } from 'rxjs';
import { ProductAPIService } from '../shared/services/product-api.service';
import { DTOProduct } from '../shared/dto/DTOProduct.dto';

const PolicyData = [
  {
    text: "Hỗ trợ trả góp 0%, trả trước 0đ",
    iconName: "icon_payment.svg"
  },
  {
    text: "Hoàn tiền 200% nếu có hàng giả",
    iconName: "icon_money.svg"
  },
  {
    text: "Giao hàng nhanh trên toàn quốc",
    iconName: "icon_shipping.svg"
  },
  {
    text: "Hỗ trợ kĩ thuật online 7/7",
    iconName: "icon_chat.svg"
  },
]

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productDetail: DTOProduct = new DTOProduct();
  productName: string = '';
  saleprice: number = 0;

  breadCrumbList: string[] = [];
  policyList: any[] = PolicyData;

  //Cart handle declarations
  cartQuantity: number = 1;

  //subscription
  ngUnsubscribe = new Subject<void>();

  testSubimg: any[] = [
    'https://www.tncstore.vn/image/cache/catalog/PC%20Dong%20Bo/Dell/Dell%20Precision%203660%20Tower%20(CTO)/pc-dong-bo-dell-precision-3660-tower-2-500x500.jpg',
    'https://www.tncstore.vn/image/cache/catalog/PC%20Dong%20Bo/Dell/Dell%20Precision%203660%20Tower%20(CTO)/pc-dong-bo-dell-precision-3660-tower-3-500x500.jpg',
    'https://www.tncstore.vn/image/cache/catalog/PC%20Dong%20Bo/Dell/Dell%20Precision%203660%20Tower%20(CTO)/pc-dong-bo-dell-precision-3660-tower-2-500x500.jpg',
    'https://www.tncstore.vn/image/cache/catalog/PC%20Dong%20Bo/Dell/Dell%20Precision%203660%20Tower%20(CTO)/pc-dong-bo-dell-precision-3660-tower-3-500x500.jpg',
  ];

  //subscriptions
  getProductDetail_sst: Subscription;

  constructor(private route: ActivatedRoute, private productAPIService: ProductAPIService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      tap(params =>
        this.breadCrumbList = [params['categoryname'], params['productname']]),
      switchMap(params => {
        console.log(this.breadCrumbList);
        return of(params)
      }), filter(product => !product)
    ).subscribe(value => console.log(this.breadCrumbList))
    this.GetTestProductDetail();
  }

  GetTestProductDetail() {
    this.productAPIService.GetProductDetail().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (res) => {
        this.productDetail = { ...res.data };
        this.saleprice = this.productDetail.price - (this.productDetail.price * parseFloat(this.productDetail.sale));

      }
    )
  }

  onHandleQuantity(type: string) {
    if (type === 'increase') {
      this.cartQuantity += 1;
    } else {
      if (this.cartQuantity > 1) {
        this.cartQuantity -= 1;
      }
    }
  }

  onRatingProduct(event: any) {
    console.log(event);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
