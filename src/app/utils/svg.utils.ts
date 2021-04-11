import { MatIconRegistry } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

export const loadSvgResource = (matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) => {

  const baseUrl = 'assets/svg';
  // 文件夹图标
  matIconRegistry.addSvgIcon('mkdir', domSanitizer.bypassSecurityTrustResourceUrl(`${baseUrl}/mkdir.svg`));
  // 标签
  matIconRegistry.addSvgIcon('tag', domSanitizer.bypassSecurityTrustResourceUrl(`${baseUrl}/tag.svg`));
};
