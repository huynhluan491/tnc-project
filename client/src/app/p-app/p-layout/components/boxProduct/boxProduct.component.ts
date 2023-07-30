import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { DTOProduct } from '../../shared/dto/DTOProduct';

@Component({
  selector: 'box-product',
  templateUrl: './boxProduct.component.html',
  styleUrls: ['./boxProduct.component.scss'],
})
export class BoxProductComponent implements OnChanges {
  @Input() data: DTOProduct;
  salePrice: number = 0;
  saleConvert: string = '';
  selected = 0;
  hovered = 0;
  readonly = true;
  inforProduct = 'infor-product';
  ngOnInit(): void {
    console.log(this.data);

    this.calculateSalePrice();
    this.convertToPercentage();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this['data']) {
      this.calculateSalePrice();
      this.convertToPercentage();
    }
  }
  private calculateSalePrice(): void {
    this.salePrice = this['data'].Sale
      ? this['data'].Price - this['data'].Price * this['data'].Sale
      : this['data'].Price;
  }

  private convertToPercentage(): string {
    this.saleConvert = (this['data'].Sale * 100).toString() + '%';
    return this.saleConvert;
  }
}
