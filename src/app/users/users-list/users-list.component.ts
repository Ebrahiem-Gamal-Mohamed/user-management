import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '../user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: IUser[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.users = this.userService.getUsers();
  }

  deleteUser(userId: number) {
    this.userService.removeUser(userId);
    this.getUsersData();
  }

}
