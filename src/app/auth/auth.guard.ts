import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorService } from '../@core/interface/author.service';

@Injectable( {
    providedIn: 'root'
} )
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authorService: AuthorService, private router: Router) {
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild( childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate( childRoute, state );
    }

    /**
     * 检查登陆状态
     * @param url 前往到url地址
     */
    checkLogin(url: string): true | UrlTree {
        if (this.authorService.isLogin()) {
            return true;
        }
        this.authorService.redirectUrl = url;
        return this.router.parseUrl('/user/login');
    }
}
