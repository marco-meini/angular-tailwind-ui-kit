import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import 'flatpickr/dist/themes/material_blue.css';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
