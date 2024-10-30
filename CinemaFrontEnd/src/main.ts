import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// al setear el standalone como "false", 
// no se ejecutaba el servicio
// esta es la solución
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
 
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
// fin de la solución

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
