import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

(async () => {
  const app = await bootstrapApplication(App, appConfig);
})()
