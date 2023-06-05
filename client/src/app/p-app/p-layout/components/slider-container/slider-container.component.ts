import { Component, Input } from '@angular/core';
import { SliderItem } from './SliderItem';

@Component({
  selector: 'app-slider-container',
  templateUrl: './slider-container.component.html',
  styleUrls: ['./slider-container.component.scss'],
})
export class SliderContainerComponent {
  @Input() slides: SliderItem[] = [
    {
      img: 'https://www.tncstore.vn/image/catalog/banner/2022/Slide/loi-ich-1640x66-banner160520220.png',
    },
    {
      img: 'https://www.tncstore.vn/image/catalog/Landing Page/Pc Gaming 05.2023/banner-build-pc.jpg',
    },
    {
      img: 'https://www.tncstore.vn/image/catalog/banner/2023/Slide/banner--gaming-gear.jpg',
    },
  ];

  @Input() slidesToShow: Number = 1;
  @Input() slidesToSCroll: Number = 1;
  @Input() autoPlay: Boolean = true;

  slideConfig = {
    slidesToShow: this.slidesToShow,
    slidesToScroll: this.slidesToSCroll,
    autoplay: this.autoPlay,
  };

  constructor() {}
  ngOnInit(): void {}
}
