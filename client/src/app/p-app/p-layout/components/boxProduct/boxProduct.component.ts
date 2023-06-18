import { formatCurrency } from "@angular/common";
import { Component,OnChanges, Input, SimpleChanges  } from "@angular/core";

@Component({
  selector : "box-product",
  templateUrl :"./boxProduct.component.html",
  styleUrls : ["./boxProduct.component.scss"]
})
export class BoxProductComponent implements OnChanges{
  @Input() data:any
  salePrice: number = 0;
  saleConvert:string =""
  selected = 0;
	hovered = 0;
	readonly = true;
  inforProduct = "infor-product"
  ngOnInit(): void {
    this.calculateSalePrice();
    this.convertToPercentage()

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this['data']) {
      this.calculateSalePrice();
      this.convertToPercentage()
    }
  }
  private calculateSalePrice(): void {
    this.salePrice =this['data'].sale ? this['data'].price - (this['data'].price * this['data'].sale) :  this['data'].price;
  }

  private convertToPercentage(): string {
    this.saleConvert = (this['data'].sale * -100 ).toString() + "%"
    return this.saleConvert
  }
}
