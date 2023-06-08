import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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

  data = {
    srcAvaterProduct:
      'https://www.tncstore.vn/image/cache/catalog/chu%E1%BB%99t/razer/Viper%20V2%20Pro%20White%20Wireless/Razer%20Viper%20V2%20Pro%20White%20Wireless-500x500.jpg',
    nameProdcut: 'default',
    salePercentage: 0.2,
    basePrice: 22222,
  };

  productCategories = [
    {
      title: 'PC GAMING',
      subTitle: 'CHIẾN MỌI GAME',
      img: 'https://www.tncstore.vn/catalog/view/theme/default/image/cat_maytinh_v2.png',
      color: '#1A5DC4',
    },
    {
      title: 'BÀN PHÍM CƠ',
      subTitle: 'CHIẾN MỌI GAME',
      img: 'https://www.tncstore.vn/catalog/view/theme/default/image/cat_banphimco_v2.png',
      color: '#343332',
    },
    {
      title: 'PC DO HOA',
      subTitle: 'CHIẾN MỌI GAME',
      img: 'https://www.tncstore.vn/catalog/view/theme/default/image/cat_manhinhgame_v2.png',
      color: '#01F9C9',
    },
    {
      title: 'GAMING LAPTOP',
      subTitle: 'CHIẾN MỌI GAME',
      img: 'https://www.tncstore.vn/catalog/view/theme/default/image/cat_dohoa_v3.png',
      color: '#FFCC3A',
    },
    {
      title: 'PC GAMING',
      subTitle: 'CHIẾN MỌI GAME',
      img: 'https://www.tncstore.vn/catalog/view/theme/default/image/cat_maytinh_v2.png',
      color: '#1A5DC4',
    },
    {
      title: 'BÀN PHÍM CƠ',
      subTitle: 'CHIẾN MỌI GAME',
      img: 'https://www.tncstore.vn/catalog/view/theme/default/image/cat_banphimco_v2.png',
      color: '#343332',
    },
    {
      title: 'PC DO HOA',
      subTitle: 'CHIẾN MỌI GAME',
      img: 'https://www.tncstore.vn/catalog/view/theme/default/image/cat_manhinhgame_v2.png',
      color: '#01F9C9',
    },
    {
      title: 'GAMING LAPTOP',
      subTitle: 'CHIẾN MỌI GAME',
      img: 'https://www.tncstore.vn/catalog/view/theme/default/image/cat_dohoa_v3.png',
      color: '#FFCC3A',
    },
  ];
  ngOnInit() {}
}
