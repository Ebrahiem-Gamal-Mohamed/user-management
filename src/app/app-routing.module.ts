import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./core/home/home.component";
import { AuthGuard } from "./auth/auth.guard";
import { DashboardComponent } from './core/dashboard/dashboard.component';

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '/dashboard', component: DashboardComponent },
      {
        path: "users",
        loadChildren: () =>
          import("./users/users.module").then((m) => m.UsersModule),
        canActivate: [AuthGuard],
      }
    ],
  },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "/dashboard", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
