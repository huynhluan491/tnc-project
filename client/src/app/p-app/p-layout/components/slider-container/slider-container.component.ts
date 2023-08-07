import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-slider-container',
  templateUrl: './slider-container.component.html',
  styleUrls: ['./slider-container.component.scss'],
})
export class SliderContainerComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() slidesToShow: Number = 1;
  @Input() slidesToScroll: Number = 1;
  @Input() withdSubImg: Number = 384;
  @Input() autoPlay: Boolean = true;
  @Input() sliderProducts: any[] = [];
  @Input() imgs: string[] = [];
  @Input() type: string;

  slideConfig = {};

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['imgs'].currentValue);
  }

  ngOnInit(): void {
    this.slideConfig = {
      lazyLoad: false,
      slidesToShow: this.slidesToShow,
      slidesToScroll: this.slidesToScroll,
      autoplay: this.autoPlay,
    };
  }
}
