import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      (req, next) => {
        const authReq = req.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
        });
        return next(authReq);
      }
    ]))
  ],
};
