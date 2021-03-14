import {Injectable} from '@angular/core';
import {AuthorService} from "../interface/author.service";
import {StorageMessage} from "../../utils/storage-message";
import {ActivatedRoute, Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthorImplService extends AuthorService {

  constructor(private route: ActivatedRoute, private router: Router) {
    super();
  }

  /**
   * 检测是否为登录状态, true为登录, false为不登录
   */
  isLogin() {
    const token = StorageMessage.getToken();
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(token);
  }

  /**
   * 退出登录
   */
  quit() {
    StorageMessage.clear();
    this.router.navigate(['/user/login']);
  }
}
