import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DTOOrder } from '../share/DTO/orderDTO.dto';
import { OrderService } from '../../p-layout/shared/services/order.service';
import { StorageService } from '../../p-layout/shared/services/storage.service';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  //Grid view
  orderGridView: Subject<any> = new Subject<any>();
  range = { start: null, end: null };
  ngUnsubscribe$ = new Subject<void>();
  userID: number = null;
  constructor(private orderService: OrderService, private storageService: StorageService) {}

  ngOnInit(): void {
    this.userID = this.storageService.getUser().UserID;
    this.getPersonalOrders();
  }

  getPersonalOrders() {
    this.orderService.getDataById(this.userID).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(
      res => {
        if (res.Code === 200) {
          this.orderGridView.next({
            data: res.Data,
            total: res.Data.length
          })
      }})
    }
}
