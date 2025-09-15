import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // ejemplo: inyectar token si lo tuvieras
    const token = localStorage.getItem('token');
    let cloned = req;
    if (token) {
      cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        // Log global y conversión a mensajes legibles
        console.error('HTTP Error', error);
        return throwError(() => error);
      }),
    );
  }
}
