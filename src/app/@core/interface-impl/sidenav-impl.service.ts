import {Injectable} from '@angular/core';
import {SidenavService} from "../interface/sidenav.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SidenavMenu} from "../../model/sidenav-menu";

@Injectable({
  providedIn: 'root'
})
export class SidenavImplService extends SidenavService {

  private url: string = './assets/mock';

  constructor(private http: HttpClient) {
    super();
  }

  getSidenav(): Observable<SidenavMenu[]> {
    return this.http.get<SidenavMenu[]>(`${this.url}/sidenav.json`);
  }

  getUserSidenav(): Observable<SidenavMenu[]> {
    return this.http.get<SidenavMenu[]>(`${this.url}/user-sidenav.json`)
  }
}
