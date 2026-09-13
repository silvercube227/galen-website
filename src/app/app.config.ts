import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // The header's nav uses same-page fragments. scrollPositionRestoration is
      // deliberately left off: on a single-route site its only effect is to
      // reset scroll to the top, which fights the anchor scroll on a deep link.
      withInMemoryScrolling({ anchorScrolling: 'enabled' }),
    ),
    provideClientHydration(),
  ],
};
