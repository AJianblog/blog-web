import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatMenuModule} from "@angular/material/menu";
import {MatRippleModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";

const MAT_MODULE = [
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule,
  MatRippleModule,
  MatTooltipModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MAT_MODULE
  ],
  exports: [
    ...MAT_MODULE
  ]
})
export class MaterialModule {

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: MaterialModule,
      providers: []
    }
  }
}
