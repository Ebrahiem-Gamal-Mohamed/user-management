import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: IUser[] = [];
  constructor(private httpClient: HttpClient, private router: Router) { }

  getDepartments(): Observable<any> {
    const url = 'assets/departments.json';
    return this.httpClient.get(url);
  }

  createNewUser(user) {
    if (user) {
      this.users.push({...user, id: `${this.users.length + 1}`});
      this.router.navigate(['/users']);
    }
  }

  editUser(user: IUser, userId: number) {
    this.users = this.users.map(item => {
      if (userId === +item.id) {
        item = user;
      }
      return item;
    });
    this.router.navigate(['/users']);
  }

  removeUser(id: string) {
    this.users.splice(+id, 1);
  }
}
