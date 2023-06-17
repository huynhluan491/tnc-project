import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutAPIService } from '../../shared/services/layout-api.service';
import { Ps_UtilObjectService } from 'src/app/p-lib/ultilities/ulity.object';

@Component({
  selector: 'app-p-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  //Category list declaration
  headerMenuItems: any[] = [
    {
      text: 'DANH MỤC SẢN PHẨM',
      icon: 'icon_computer.svg',
      path: '',
      items: [],
    },
    {
      text: 'XÂY DỰNG CẤU HÌNH',
      icon: 'icon_setting.svg',
      path: 'building',
      items: [],
    },
    {
      text: 'XẢ KHO GEAR CỰC CHẤT',
      icon: 'icon_sale.svg',
      path: 'saleoff',
      items: [],
    },
    {
      text: 'TIN TỨC',
      icon: '',
      path: 'news',
      items: [],
    },
  ];

  cartShown: boolean = false;
  toggleCart = () => {
    console.log('cc');

    this.cartShown = !this.cartShown;
  };

  //Subscription
  getCategoryList_sst: Subscription;

  constructor(private layoutAPIService: LayoutAPIService) {}

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.getCategoryList_sst = this.layoutAPIService
      .GetCategories()
      .subscribe((res) => {
        const categories = res.data.categories;
        if (Ps_UtilObjectService.hasListValue(categories)) {
          categories.forEach((item) => {
            this.headerMenuItems[0].items.push({
              text: item.categoryName,
              path: `${item.categoryName}`,
            });
          });
        } else {
          window.alert('Không load được danh sách Category');
        }
      });
  }

  ngOnDestroy(): void {
    this.getCategoryList_sst?.unsubscribe();
  }
}
