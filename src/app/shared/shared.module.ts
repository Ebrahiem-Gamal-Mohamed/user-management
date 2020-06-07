import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule, FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faEdit, faTrashAlt, faPlus, faSignOutAlt, faUniversity } from '@fortawesome/free-solid-svg-icons';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    SweetAlert2Module.forChild(),
    TooltipModule.forRoot(),
    RxReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    SweetAlert2Module,
    TooltipModule,
    RxReactiveFormsModule
  ],
})
export class SharedModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(
      faEdit,
      faTrashAlt,
      faPlus,
      faSignOutAlt,
      faUniversity
    );
  }
}
