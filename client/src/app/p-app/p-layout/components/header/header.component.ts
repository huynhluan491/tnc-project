import { RegisterService } from './../../shared/services/register.service';
import {
  Component,
  OnDestroy,
  OnInit,
  SkipSelf,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { LayoutAPIService } from '../../shared/services/layout-api.service';
import { Ps_UtilObjectService } from 'src/app/p-lib/ultilities/ulity.object';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-p-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private layoutAPIService: LayoutAPIService,
    @SkipSelf() private cartSerivce: CartService,
    @SkipSelf() private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.getCategoryList();
  }

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

  //Subscription
  ngUnsubscribe: Subject<void> = new Subject<void>();

  toggleCart = () => {
    this.cartSerivce;
  };

  toggleRegister(): void {
    this.registerService.toggleRegisterShown();
  }

  getCategoryList() {
    this.layoutAPIService
      .GetCategories()
      .pipe(takeUntil(this.ngUnsubscribe))
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
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
