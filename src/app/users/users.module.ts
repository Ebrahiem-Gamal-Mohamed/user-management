import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

import { UserFormComponent } from './user-form/user-form.component';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  declarations: [
    UserFormComponent,
    UsersListComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
