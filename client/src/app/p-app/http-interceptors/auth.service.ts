import { Injectable } from "@angular/core";
import { LoginPayload } from "./loginPayload";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, map } from "rxjs";
import { DTOUser } from "../_models/DTOUser";
import { environment } from "src/app/environments/environments";

@Injectable({ providedIn: 'root' })

export class AuthService {
    loginURL: 'http://localhost:3001/api/v1/user/login';
    private currentUserSubject: BehaviorSubject<DTOUser>;
    private currentUser: Observable<DTOUser>;

    constructor( private http: HttpClient ) {
        this.currentUserSubject = new BehaviorSubject<DTOUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();  
    }

    public get currentUserValue(): DTOUser {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/user/login`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}