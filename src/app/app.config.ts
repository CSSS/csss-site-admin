import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideApi } from '@api/backend-api';
import { CsssAuthService } from '@pages/auth/csss-auth/csss-auth.service';
import Aura from '@primeuix/themes/aura';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { environment } from 'src/environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const auth = inject(CsssAuthService);
      return auth.initialize();
    }),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideApi({
      basePath: environment.apiUrl,
      withCredentials: true
    }),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { timezone: '-0800' }
    },
    MessageService
  ]
};
