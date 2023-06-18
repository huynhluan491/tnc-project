import { Component, ElementRef, Input, Renderer2, ViewChild } from "@angular/core";

@Component({
  selector :"dropdown-filter",
  templateUrl : "./dropdown-filter.component.html",
  styleUrls :['./dropdown-filter.component.scss']
})
export class dropdownFilterComponent{
  constructor(private renderer:Renderer2){}
  @ViewChild('myDropdownList') myDropdownList :ElementRef
  @Input() filterbyPrice : boolean = false
  @Input() activeSearch : boolean= false
  @Input() titleFilter :string = "default"
  @Input() placeholderSearch : string = `Tìm ${this.titleFilter}`
  @Input() itemsDropList :any[] = [
    {
      type : "checkbox",
      inputValue : "",
      name : "cc"
    },
    {
      type : "checkbox",
      inputValue : "",
      name : "cc"
    },
    {
      type : "checkbox",
      inputValue : "",
      name : "cc"
    }
  ]
  active : boolean = false
  ngOnInit(): void {
    if (this.filterbyPrice) {
      this.titleFilter ="Mức giá"
    }

  }
  clickBoxFilter(){
    const element = this.myDropdownList.nativeElement;
    const hasClass = element.classList.contains('active-dropdown-list')
    hasClass? this.active = false : this.active = true
    // console.log("hasClass",hasClass);
    // console.log("active",this.active);
  }

}
