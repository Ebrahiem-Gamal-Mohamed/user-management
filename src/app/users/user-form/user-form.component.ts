import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UserService } from "../user.service";
import { IUser } from "./../user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { RxwebValidators, RxFormBuilder, ReactiveFormConfig } from "@rxweb/reactive-form-validators";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  departments: { name: string; value: string }[] = [];
  userId: number;
  errorMsg: string = "";

  constructor(
    private fb: RxFormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setErrorMessages();
    this.initUserForm();
    this.route.paramMap.subscribe((params) => {
      this.userId = +params.get("id");
      if (this.userId !== 0) {
        this.setUserData();
      }
    });
    this.getDepartments();
  }

  initUserForm() {
    this.userForm = this.fb.group({
      firstname: [
        "",
        [
          RxwebValidators.required(),
          RxwebValidators.pattern({
            expression: { startWithCharacter: /^[A-Za-z]+/ },
            message: 'This field must start with character'
          }),
          RxwebValidators.minLength({
            value: 5,
            message: 'Firstname must not less than 5 charchter.'
          }),
        ],
      ],
      lastname: [
        "",
        [
          RxwebValidators.required(),
          RxwebValidators.pattern({
            expression: { startWithCharacter: /^[A-Za-z]+/ },
            message: 'This field must start with character'
          }),
          RxwebValidators.minLength({
            value: 5,
            message: 'Lastname must not less than 5 charchter.'
          }),
        ],
      ],
      username: [
        "",
        [
          RxwebValidators.required(), 
          RxwebValidators.minLength({
            value: 4,
            message: 'Username must not less than 4 charchter.'
          }),
        ],
      ],
      password: [
        "",
        [
          RxwebValidators.required(),
          RxwebValidators.password({
            validation: {
              minLength: 8,
              alphabet: true,
              digit: true,
              specialCharacter: true,
              upperCase: true,
              lowerCase: true,
            },
            message: 'Must be not less than 8 characters or numbers and must contain at least one character capital, one number and one special character.'
          }),
        ],
      ],
      email: ["", [
        RxwebValidators.required(), 
        RxwebValidators.email({
          message: 'Must be a valid email address'
        })
      ]],
      phone: [
        "",
        [
          RxwebValidators.required(),
          RxwebValidators.pattern({
            expression: {
              "startWithandMax": /^(?:010|011|012|015)[0-9\\s]{8}$/,
            },
            message: 'Must start with 010,011,012,015 then 8 numbers'
          }),
        ],
      ],
      department: ["default", [RxwebValidators.required()]],
    });
  }

  setErrorMessages() {
    ReactiveFormConfig.set({
      validationMessage: {
        required: "This field is required"
      }
    });
  }

  setUserData() {
    const user = this.userService.users.find(
      (user) => this.userId === user.id
    );
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
      department: user.department,
    });
    this.userContols.username.disable();
  }

  get userContols() {
    return this.userForm.controls;
  }

  getDepartments() {
    this.userService.getDepartments().subscribe((data) => {
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
      department: this.userContols.department.value,
    };

    if (this.userId === 0) {
      if (
        this.userService.users.find((item) => item.username === user.username)
      ) {
        this.errorMsg = `This username ( ${user.username} ) already exists!`;
        return;
      }
      this.userService.createNewUser(user);
    } else {
      this.userService.editUser(user, this.userId);
    }
  }
}
