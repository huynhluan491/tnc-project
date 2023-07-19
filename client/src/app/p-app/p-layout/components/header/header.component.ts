import { DTOCategory } from './../../shared/dto/DTOCategory';
import { RegisterService } from './../../shared/services/register.service';
import {
  Component,
  Input,
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
import { AuthService } from 'src/app/p-app/http-interceptors/auth.service';
import { DTOUser } from 'src/app/p-app/_models/DTOUser';
import { StorageService } from '../../shared/services/storage.service';
import { Route, Router } from '@angular/router';
import { NotificationPopupService } from '../../shared/services/notification.service';
import { CategoryService } from '../../shared/services/category.service';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-p-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userMenu: any[] = [
    { text: 'TNCMember', icon: 'k-i-user'},
    { text: 'Đăng xuất', icon: 'k-i-home'}
  ] 

  constructor(
    private layoutAPIService: LayoutAPIService,
    @SkipSelf() private cartSerivce: CartService,
    @SkipSelf() private registerService: RegisterService,
    private authService: AuthService,
    private storageService: StorageService,
    private route: Router,
    private notificationService: NotificationPopupService
    @SkipSelf() private categoryService: CategoryService,
    @SkipSelf() private registerService: RegisterService,
    @SkipSelf() private orderService: OrderService
  ) {}
  userName: string = '';
  ngUnsubscribe = new Subject<void>();
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.getOrders();
    if (Object.keys(this.storageService.getUser()).length > 0) {
      this.isLoggedIn = this.storageService.isLoggedIn();
      this.userName = this.storageService.getUser().Data.UserName;
    }
    this.authService.getCurrentUserValue().subscribe(res => {
      this.userName = res.UserName;
    });
    this.authService._isLoggedIn.subscribe(res => {
      this.isLoggedIn = res;
    });
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

  onHandleMenu(type: string) {
    if (type === 'TNCMember') {
      this.route.navigate(['/profile']);
    } else if (type === 'Đăng xuất') {
      this.storageService.clean();
      this.notificationService.onSuccess('Đăng xuất thành công');
      this.isLoggedIn = false;
      console.log('dang xuat');
      
    }
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
