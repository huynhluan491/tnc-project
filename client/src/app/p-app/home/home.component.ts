import { Component } from '@angular/core';
import { SliderItem } from '../p-layout/components/slider-container/SliderItem';

@Component({
  selector: 'app-p-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  promoSlides: SliderItem[] = [
    {
      img: 'https://www.tncstore.vn/image/catalog/banner/2022/Thang5/laptop-dohoa.png',
    },
    {
      img: 'https://www.tncstore.vn/image/catalog/banner/2022/Thang5/ban-ghe-gaming.png',
    },
    {
      img: 'https://www.tncstore.vn/image/catalog/banner/2022/Thang5/pc-dohoa.png',
    },

    {
      img: 'https://www.tncstore.vn/image/catalog/banner/2022/Thang5/laptop-gaming.png',
    },
  ];
  data = {
    srcAvaterProduct : "https://www.tncstore.vn/image/cache/catalog/chu%E1%BB%99t/razer/Viper%20V2%20Pro%20White%20Wireless/Razer%20Viper%20V2%20Pro%20White%20Wireless-500x500.jpg",
    nameProdcut : "default",
    salePercentage : 0.2,
    basePrice :22222
    }
    slides: SliderItem[] =[
      {img : '',
        component :'../p-layout/components/boxProduct/boxProduct.component.html'
      },  {
        img : '',
        component :'../p-layout/components/boxProduct/boxProduct.component.html'
      }
    ]
}
