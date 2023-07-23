import { Injectable } from '@angular/core';
import { LoginPayload } from './loginPayload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { DTOUser } from '../_models/DTOUser';
import { environment } from 'src/app/environments/environments';
import { StorageService } from '../p-layout/shared/services/storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  loginURL: 'http://localhost:3001/api/v1/user/login';
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private currentUser: Observable<DTOUser>;
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.currentUserSubject = new BehaviorSubject<DTOUser>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): DTOUser {
    return this.currentUserSubject.value;
  }

  getCurrentUserValue(): Observable<DTOUser> {
    return this.currentUserSubject;
  }

  get _isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  setLoginState(state: boolean): void {
    this.isLoggedIn.next(state);
  }

  login(user: LoginPayload) {
    return this.http
      .post<any>(`${environment.apiUrl}/user/login`, user, httpOptions)
      .pipe(
        map((user) => {
          const { UserName, Address, Email, Phone, Point } = user.Data.User;
          const loggedInUser = {
            UserName,
            Email,
            Phone,
            Point,
            Address,
          };
          this.storageService.saveUser(loggedInUser);
          this.currentUserSubject.next(user.Data);
          this.setLoginState(true);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    return this.http.get(`${environment.apiUrl}/user/logout`, httpOptions);
  }
}
