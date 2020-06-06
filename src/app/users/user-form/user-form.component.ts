import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { IUser } from './../user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  departments: { name: string, value: string }[] = [];
  userId: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initUserForm();
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id');
      if (this.userId !== 0) {
        this.setUserData();
      }
    });
    this.getDepartments();
  }

  initUserForm() {
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(11)]],
      department: ['default', [Validators.required]]
    });
  }

  setUserData() {
    const user = this.userService.users.find(user => this.userId === +user.id);
    if (!user) {
      this.router.navigate(["/users"]);
    }
    this.userForm.patchValue({
      firstname: user.firstName,
      lastname: user.lastName,
      username: user.username,
      password: user.password,
      email: user.email,
      phone: user.phone,
      department: user.department
    });
  }

  get userContols() {
    return this.userForm.controls;
  }

  getDepartments() {
    this.userService.getDepartments().subscribe(data => {
      this.departments = data;
    });
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }
    const user: IUser = {
      firstName: this.userContols.firstname.value,
      lastName: this.userContols.lastname.value,
      username: this.userContols.username.value,
      password: this.userContols.password.value,
      email: this.userContols.email.value,
      phone: this.userContols.phone.value,
      department: this.userContols.department.value
    };
    if (this.userId === 0) {
      this.userService.createNewUser(user);
    } else {
      this.userService.editUser(user, this.userId);
    }
  }

}
