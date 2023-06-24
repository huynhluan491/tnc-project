import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss'],
})
export class dropdownFilterComponent {
  constructor(private renderer: Renderer2) {}
  @ViewChild('myDropdownList') myDropdownList: ElementRef;
  @Input() filterbyPrice: boolean = false;
  @Input() activeSearch: boolean = false;
  @Input() titleFilter: string = 'default';
  @Input() placeholderSearch: string = `Tìm ${this.titleFilter}`;
  @Input() itemsDropList: any[] = [];

  @Output() filterURL = new EventEmitter<string>();
  @Output() queryFilter = new EventEmitter<any[]>();
  active: boolean = false;
  query: string = '';
  lableFilter: any[] = [];
  ngOnInit(): void {
    if (this.filterbyPrice) {
      this.titleFilter = 'Mức giá';
    }
  }
  clickBoxFilter() {
    const element = this.myDropdownList.nativeElement;
    const hasClass = element.classList.contains('active-dropdown-list');
    hasClass ? (this.active = false) : (this.active = true);
    // console.log("hasClass",hasClass);
    // console.log("active",this.active);
  }
  handleCheck(event: any) {
    console.log(event.target.checked);
    event.target.checked
      ? (this.query += `&${event.target.name}=${event.target.value}`)
      : (this.query = this.query.replace(
          `&${event.target.name}=${event.target.value}`,
          ''
        ));
    this.filterURL.emit(this.query);
    this.lableFilter.push(
      // this.itemsDropList[parseInt(event.target.id)].lableName
      this.itemsDropList[parseInt(event.target.id)]
    );
    console.log(this.lableFilter);

    this.queryFilter.emit(this.lableFilter);
  }
}
