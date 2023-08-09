import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DTOOrder } from '../share/DTO/orderDTO.dto';
import { OrderService } from '../../p-layout/shared/services/order.service';
import { StorageService } from '../../p-layout/shared/services/storage.service';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  //Grid view
  orderGridView: Subject<any> = new Subject<any>();
  range = { start: null, end: null };
  ngUnsubscribe$ = new Subject<void>();
  userID: number = null;
  constructor(
    private orderService: OrderService,
    private storageService: StorageService
  ) {}
  fullName: String = 'NAME';

  ngOnInit(): void {
    this.userID = this.storageService.getUser().UserID;
    this.getPersonalOrders();
    const userData = this.storageService.getUser();
    userData.FullName && (this.fullName = userData.FullName);
  }

  getPersonalOrders() {
    this.orderService
      .getDataById(this.userID)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res) => {
        console.log(res);

        if (res.Code === 200) {
          console.log('check');

          this.orderGridView.next({
            data: res.Data.Data,
            total: res.Data.TotalOrder,
          });
        }
      });
  }

  getOrderDetail(orderID: number) {
    const body = {
      OrderID: orderID,
      UserID: this.userID,
    };
    this.orderService
      .getOrderDetail(body)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res) => {
        console.log(res);
      });
  }
}
