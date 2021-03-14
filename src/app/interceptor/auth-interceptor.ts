import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {StorageMessage} from "../utils/storage-message";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = StorageMessage.getToken();
    let authRequest = req.clone();
    if (token) {
      authRequest = authRequest.clone({
        headers: req.headers.set('Authorization', token)
      })
    }
    return next.handle(authRequest);
  }
}
