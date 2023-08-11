import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../http-interceptors/auth.service";


@Injectable({
    providedIn: 'root'
})

export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
            console.log(currentUser);
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}