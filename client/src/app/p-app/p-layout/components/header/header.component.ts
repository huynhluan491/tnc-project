import { DTOCategory } from './../../shared/dto/DTOCategory';
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
import { CategoryService } from '../../shared/services/category.service';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-p-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private layoutAPIService: LayoutAPIService,
    @SkipSelf() private cartService: CartService,
    @SkipSelf() private categoryService: CategoryService,
    @SkipSelf() private registerService: RegisterService,
    @SkipSelf() private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getOrders();
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
  cartItems: number = 0;
  //Subscription
  ngUnsubscribe: Subject<void> = new Subject<void>();

  toggleCart = () => {
    const newValue = !this.cartService.isCartPopUpOpened.value;
    this.cartService.onToggleCartPopUpState(newValue);
  };

  toggleRegister(): void {
    this.registerService.toggleRegisterShown();
  }

  getOrders() {
    this.orderService.getData(1, 20, '?userID=1').subscribe((res) => {
      this.cartItems = res.Data.length;
    });
  }

  getCategoryList() {
    this.categoryService
      .getData(1, 100)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        const categories = res.Data;
        // if (Ps_UtilObjectService.hasListValue(categories)) {
        categories.forEach((item: DTOCategory) => {
          this.headerMenuItems[0].items.push({
            text: item.CategoryName,
            path: `${item.CategoryName}`,
          });
        });
        // } else {
        //   window.alert('Không load được danh sách Category');
        // }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
