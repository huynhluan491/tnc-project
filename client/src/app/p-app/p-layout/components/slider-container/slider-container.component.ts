import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-slider-container',
  templateUrl: './slider-container.component.html',
  styleUrls: ['./slider-container.component.scss'],
})
export class SliderContainerComponent {
  constructor() { }

  @Input() slidesToShow: Number = 1;
  @Input() slidesToSCroll: Number = 1;
  @Input() withdSubImg: Number = 384;
  @Input() autoPlay: Boolean = true;
  @Input() sliderProducts: any[] = [];
  @Input() imgs: string[] = [];
  @Input() type: string;

  slideConfig = {};

  ngOnInit(): void {
    this.slideConfig = {
      slidesToShow: this.slidesToShow,
      slidesToScroll: this.slidesToSCroll,
      autoplay: this.autoPlay,
    };
  }
}
