import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutAPIService } from '../p-layout/shared/services/layout-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-p-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }
}
