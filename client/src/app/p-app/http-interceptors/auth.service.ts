import { Injectable } from "@angular/core";
import { LoginPayload } from "./loginPayload";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, map } from "rxjs";
import { DTOUser } from "../_models/DTOUser";
import { environment } from "src/app/environments/environments";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({ providedIn: 'root' })

export class AuthService {
    loginURL: 'http://localhost:3001/api/v1/user/login';
    private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private currentUser: Observable<DTOUser>;
    private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor( private http: HttpClient ) {
        this.currentUserSubject = new BehaviorSubject<DTOUser>(JSON.parse(localStorage.getItem('currentUser')));
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

    login(user: LoginPayload) {
        return this.http.post<any>(`${environment.apiUrl}/user/login`, user, httpOptions)
            .pipe(map(user => {
                console.log(user);
                const token = user.Data.Token;
                this.currentUserSubject.next(user.Data);
                this.isLoggedIn.next(true);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        this.isLoggedIn.next(false);
        return this.http.get(`${environment.apiUrl}/user/logout`, httpOptions)
    }
}