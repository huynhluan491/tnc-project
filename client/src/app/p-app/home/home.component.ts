import { ProductService } from './../p-layout/shared/services/product.service';
import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { LayoutAPIService } from '../p-layout/shared/services/layout-api.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { CategoryService } from '../p-layout/shared/services/category.service';
import { DTOResponse } from '../p-layout/shared/dto/DTOResponse';

@Component({
  selector: 'app-p-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  ngUnsubscribe = new Subject<void>();

  mainBanner: string[] = [
    'https://www.tncstore.vn/image/catalog/banner/2022/Slide/loi-ich-1640x66-banner160520220.png',
    'https://www.tncstore.vn/image/catalog/Landing%20Page/Pc%20Gaming%2005.2023/banner-build-pc.jpg',
    'https://www.tncstore.vn/image/catalog/banner/2023/Slide/banner--gaming-gear.jpg',
  ];

  subBanner: string[] = [
    'https://www.tncstore.vn/image/catalog/banner/2022/Thang5/laptop-dohoa.png',
    'https://www.tncstore.vn/image/catalog/banner/2022/Thang5/ban-ghe-gaming.png',
    'https://www.tncstore.vn/image/catalog/banner/2022/Thang5/pc-dohoa.png',
    'https://www.tncstore.vn/image/catalog/banner/2022/Thang5/laptop-gaming.png',
  ];

  productCategories = [
    {
      subTitle: 'CHIẾN MỌI GAME',
      img: 'assets/images/headphone.png',
      color: '#1A5DC4',
    },
    {
      subTitle: 'CHIẾN MỌI GAME',
      img: 'assets/images/keyboard.png',
      color: '#343332',
    },
    {
      subTitle: 'CHIẾN MỌI GAME',
      img: 'assets/images/laptop.png',
      color: '#01F9C9',
    },
    {
      subTitle: 'CHIẾN MỌI GAME',
      img: 'assets/images/modem.png',
      color: '#FFCC3A',
    },
    {
      subTitle: 'CHIẾN MỌI GAME',
      img: 'assets/images/phone.png',
      color: '#D12137',
    },
    {
      subTitle: 'CHIẾN MỌI GAME',
      img: 'assets/images/ipad.png',
      color: '#FF9005',
    },
    {
      subTitle: 'CHIẾN MỌI GAME',
      img: 'assets/images/watch.png',
      color: '#FDF292',
    },
    {
      subTitle: 'CHIẾN MỌI GAME',
      img: 'assets/images/tv.png',
      color: '#343D57',
    },
  ];

  brandSlider = [
    'https://www.tncstore.vn/image/cache/catalog/logo/akko-logo-228x228.jpg',
    'https://www.tncstore.vn/image/cache/catalog/vga/AFOX/afox-228x228.jpg',
    'https://www.tncstore.vn/image/cache/catalog/brands/lrg_aerocool-228x228.png',
    'https://www.tncstore.vn/image/cache/catalog/brands/ada-228x228.png',
    'https://www.tncstore.vn/image/cache/catalog/brands/lrg_acer-228x228.png',
    'https://www.tncstore.vn/image/cache/catalog/logo new/logo-amd-228x228.jpg',
    'https://www.tncstore.vn/image/cache/catalog/logo new/logo-antec-228x228.jpg',
  ];

  sliderProducts: any[] = [];

  //Subscriptions
  getSlidersProduct_sst: Subscription;

  constructor(
    private layoutAPIService: LayoutAPIService,
    @SkipSelf() private productService: ProductService,
    @SkipSelf() private categoryService: CategoryService
  ) {}

  ngOnInit() {
    // this.getProducts();
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.productService.getData(1, 15).subscribe((res: DTOResponse) => {
      for (let product of res.Data) {
        this.getProductImage(product.Image).subscribe((imageSrc) => {
          product.ImageSrc = imageSrc;
        });
      }
      this.sliderProducts = res.Data;
    });
  }

  getProductImage(imageName: string) {
    return this.productService.getProductImage(imageName);
  }

  getCategories() {
    this.categoryService.getData(1, 20).subscribe((res) => {
      for (let i = 0; i < res.Data.length; i++) {
        this.productCategories[i]['CategoryName'] = res.Data[i]['CategoryName'];
      }
    });
  }

  ngOnDestroy(): void {
    this.getSlidersProduct_sst?.unsubscribe();
  }
}
