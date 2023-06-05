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
}
