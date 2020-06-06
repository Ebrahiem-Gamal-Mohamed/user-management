import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as User from "./../../users/user.model";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated) {
      this.router.navigate(["/dashboard"]);
    }
    this.initLoginForm();
  }

  get loginControls() {
    return this.loginForm.controls;
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    const user: User.IUserCredential = {
      username: this.loginControls.username.value,
      password: this.loginControls.password.value,
    };
    this.authService.login(user);
  }
}
