import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {throwIfAlreadyLoaded} from "./module-import-guard";
import {UserService} from "./interface/user-service";
import {UserImplService} from "./interface-impl/user-impl.service";
import {BlogService} from "./interface/blog.service";
import {BlogImplService} from "./interface-impl/blog-impl.service";
import {AuthorService} from "./interface/author.service";
import {AuthorImplService} from "./interface-impl/author-impl.service";
import {BlogTypeAccountService} from "./interface/blog-type-account.service";
import {BlogTypeAccountImplService} from "./interface-impl/blog-type-account-impl.service";
import {BlogTypeService} from "./interface/blog-type.service";
import {BlogTypeImplService} from "./interface-impl/blog-type-impl.service";
import {TagService} from "./interface/tag-service";
import {TagImplService} from "./interface-impl/tag-impl.service";
import {SidenavService} from "./interface/sidenav.service";
import {SidenavImplService} from "./interface-impl/sidenav-impl.service";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {loadSvgResource} from "../utils/svg.utils";
import {ResumeService} from "./interface/resume.service";
import {ResumeImplService} from "./interface-impl/resume-impl.service";

const SERVICE = [
  {provide: AuthorService, useClass: AuthorImplService},
  {provide: BlogService, useClass: BlogImplService},
  {provide: BlogTypeAccountService, useClass: BlogTypeAccountImplService},
  {provide: BlogTypeService, useClass: BlogTypeImplService},
  {provide: ResumeService, useClass: ResumeImplService},
  {provide: SidenavService, useClass: SidenavImplService},
  {provide: TagService, useClass: TagImplService},
  {provide: UserService, useClass: UserImplService}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
    loadSvgResource(matIconRegistry, domSanitizer);
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...SERVICE
      ]
    }
  }
}
