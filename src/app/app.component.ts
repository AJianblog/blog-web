import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-blog-web';
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/menu.svg'));
    iconRegistry.addSvgIcon('home', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/home.svg'));
    iconRegistry.addSvgIcon('email', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/email.svg'));
  }
}
