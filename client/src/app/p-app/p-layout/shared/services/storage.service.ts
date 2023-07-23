import { Injectable } from '@angular/core';
import { DTOLocalUser } from 'src/app/p-app/_models/DTOLocalUser';
import { DTOOrder } from '../dto/DTOOrder';

const USER_KEY = 'auth-user';
const ORDER_KEY = 'orders';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: DTOLocalUser): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public saveOrders(data: any): void {
    window.sessionStorage.removeItem(ORDER_KEY);
    window.sessionStorage.setItem(
      ORDER_KEY,
      JSON.stringify({
        totalAmount: data.TotalAmount,
        orders: data.DataInOrder,
      })
    );
  }

  public getOrders(): any {
    const orders = window.sessionStorage.getItem(ORDER_KEY);
    if (orders) {
      return JSON.parse(orders);
    }
    return [];
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
