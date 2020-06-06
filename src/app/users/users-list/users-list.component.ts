import { Component, OnInit } from '@angular/core';
import { IUser } from './../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}
