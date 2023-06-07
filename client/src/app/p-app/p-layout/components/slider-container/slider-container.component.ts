import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  AfterViewInit,
  TemplateRef,
} from '@angular/core';
@Component({
  selector: 'app-slider-container',
  templateUrl: './slider-container.component.html',
  styleUrls: ['./slider-container.component.scss'],
})
export class SliderContainerComponent implements AfterViewInit {
  constructor() {}

  @Input() slidesToShow: Number = 1;
  @Input() slidesToSCroll: Number = 1;
  @Input() autoPlay: Boolean = true;
  @ContentChildren(TemplateRef) templateRefs: QueryList<TemplateRef<any>>;

  slideConfig = {};

  ngOnInit(): void {
    this.slideConfig = {
      slidesToShow: this.slidesToShow,
      slidesToScroll: this.slidesToSCroll,
      autoplay: this.autoPlay,
    };
  }
  ngAfterViewInit(): void {
    console.log(this.templateRefs);
  }
}
