import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import {
  provideHttpClient,
  withInterceptors,
  withFetch,
} from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { jwtInterceptor } from './app/services/jwt.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
  ],
});
