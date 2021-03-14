import {Observable} from "rxjs";
import {SidenavMenu} from "../../model/sidenav-menu";

export abstract class SidenavService {
  /**
   * 获取侧边栏菜单目录
   */
  abstract getSidenav(): Observable<SidenavMenu[]>;

  /**
   * 获取普通用户的侧边栏
   */
  abstract getUserSidenav(): Observable<SidenavMenu[]>;
}
