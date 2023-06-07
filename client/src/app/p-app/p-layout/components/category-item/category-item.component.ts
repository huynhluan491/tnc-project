import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent {
  @Input() img: string = '';
  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() color: string = '';
}
