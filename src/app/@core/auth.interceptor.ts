import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { SessionStorageService } from "./services/session-storage";
import { catchError, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next)=>{
    const sessionStorageService = inject(SessionStorageService);
    const authService  = inject(AuthService);
    const token = sessionStorageService.getAuthToken();
    console.log('Auth Intercepts');
    if(token){
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    console.log(req.headers.get('Authorization'));
    // return next(req); for sending request with auth token,
    return next(req).pipe(catchError(err => {
        if(err.status === 401){
            authService.logout();
            console.log('Auth token expired. ')
        }
        if(err.status != 200 || err.status != 201){
            console.log(err, 'something went wrong');
        }
        return throwError(() => err);
    }))
}