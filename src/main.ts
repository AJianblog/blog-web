
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/css/css';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));


const bootstrap = () => {
  return platformBrowserDynamic().bootstrapModule(AppModule);
};

bootstrap().then(() => {
  const spinner = document.getElementById('nb-global-spinner');
  if (spinner) {
    spinner.style.display = 'none';
  }
}).catch(err => console.error(err));
