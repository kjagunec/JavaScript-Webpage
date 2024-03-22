import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req : HttpRequest<any>, next : HttpHandlerFn) => {

  const authService : AuthService = inject(AuthService);
  const token = authService.getToken();

  if (token) {

    const cloned = req.clone({
      params : req.params.set('token', token)
    });
    return next(cloned);

  } else {
    return next(req);
  }

};
