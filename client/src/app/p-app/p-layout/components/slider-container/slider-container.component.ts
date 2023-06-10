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
  constructor() { }

  @Input() slidesToShow: Number = 1;
  @Input() slidesToSCroll: Number = 1;
  @Input() autoPlay: Boolean = true;
  @Input() sliderProducts: any[] = [];
  @Input() imgs: string[] = [];
  @Input() isImageSlider: boolean;
  @ContentChildren(TemplateRef) templateRefs: QueryList<TemplateRef<any>>;
  filteredTemplateRefs;

  slideConfig = {};

  ngOnInit(): void {
    this.slideConfig = {
      slidesToShow: this.slidesToShow,
      slidesToScroll: this.slidesToSCroll,
      autoplay: this.autoPlay,
    };
  }
  ngAfterViewInit(): void {
    const filteredTemplateRefs = this.templateRefs.filter((templateRef) => {
      const embeddedView = templateRef.createEmbeddedView(null);
      return embeddedView.rootNodes.some(
        (node) => node.nodeName !== '#comment'
      );
    });
    this.filteredTemplateRefs = filteredTemplateRefs;
  }
}
