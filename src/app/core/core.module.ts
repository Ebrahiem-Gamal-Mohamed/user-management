import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent, DashboardComponent],
  imports: [SharedModule, RouterModule],
  exports: [HomeComponent, DashboardComponent]
})
export class CoreModule {}
