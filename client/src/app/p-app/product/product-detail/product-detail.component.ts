import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Subject,
  concatMap,
  of,
  pluck,
  switchMap,
  takeUntil,
} from 'rxjs';
import { LayoutAPIService } from '../../p-layout/shared/services/layout-api.service';
import { ProductService } from '../../p-layout/shared/services/product.service';
import { NotificationPopupService } from '../../p-layout/shared/services/notification.service';
import { subImgService } from '../../p-layout/shared/services/subimg.service';
import { Ps_UtilObjectService } from 'src/app/p-lib/ultilities/ulity.object';
import { convertBase64ToImg } from '../../p-layout/shared/core/convertBase64Img';
import { DTOProduct } from '../shared/dto/DTOProduct.dto';

const PolicyData = [
  {
    text: 'Hỗ trợ trả góp 0%, trả trước 0đ',
    iconName: 'icon_payment.svg',
  },
  {
    text: 'Hoàn tiền 200% nếu có hàng giả',
    iconName: 'icon_money.svg',
  },
  {
    text: 'Giao hàng nhanh trên toàn quốc',
    iconName: 'icon_shipping.svg',
  },
  {
    text: 'Hỗ trợ kĩ thuật online 7/7',
    iconName: 'icon_chat.svg',
  },
];

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productDetail: DTOProduct = new DTOProduct();
  productName: string = '';
  saleprice: number = 0;

  breadCrumbList: string[] = [];
  policyList: any[] = PolicyData;
  subImgList: string[] = [];

  //Cart handle declarations
  cartQuantity: number = 1;

  //subscription
  ngUnsubscribe = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private productAPIService: ProductService,
    private notiService: NotificationPopupService,
    private subImgService: subImgService,
  ) {}

  

  ngOnInit(): void {
    this.GetDetailProduct();
  }

  GetDetailProduct() {
    this.route.params
    .pipe(
      pluck('productname'),
      switchMap((params) => {
        this.productName = params;
        return this.productAPIService.getDetaiProductByName(this.productName);
      }),
      concatMap((res) => {
        if (res.Code === 200) {
          this.productDetail = {...res.Data[0]};
          return this.subImgService.getProductSubImage(this.productDetail.ProductID);
        } else {
          this.notiService.onError('Đã xảy ra lỗi khi load chi tiết sản phẩm');
          return of();
        }
    }),
    takeUntil(this.ngUnsubscribe)
    )
    .subscribe(res => {
      if (Ps_UtilObjectService.hasListValue(res.Data)) {
        const imgList = [...res.Data];
        const mainImg = convertBase64ToImg(this.productDetail.Base64Image);
        this.subImgList.unshift(mainImg);
        imgList.forEach((img) => {
          const convertedImg = convertBase64ToImg(img.base64);
          this.subImgList.push(convertedImg);
        })
      } else {
        this.notiService.onError('Đã xảy ra lỗi khi load ảnh sản phẩm');
      }
    });
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
