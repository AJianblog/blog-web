import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CorsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = req.clone();
    // authRequest = authRequest.clone({
    //   headers: req.headers.set('Access-Control-Allow-Origin', '*')
    // });
    // if (token) {
    //   authRequest = authRequest.clone({
    //     headers: req.headers.set('Authorization', token)
    //   })
    // }
    return next.handle(authRequest);
  }
}
