///<reference path="../typings/index.d.ts"/>
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import 'rxjs/Rx'
platformBrowserDynamic().bootstrapModule(AppModule);