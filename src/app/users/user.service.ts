import { BrowserStorageService } from './../shared/_services/browser-storage.service';
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
  constructor(
    private httpClient: HttpClient, 
    private router: Router, 
    private browserStorage: BrowserStorageService
    ) { }

  getDepartments(): Observable<any> {
    const url = 'assets/departments.json';
    return this.httpClient.get(url);
  }

  getUsers(): IUser[] {
    this.users = this.browserStorage.getLocal('users') ? this.browserStorage.getLocal('users') : [];
    return this.users;
  }

  createNewUser(user) {
    if (user) {
      this.users.unshift({...user, id: this.users.length + 1 });
      this.browserStorage.setLocal('users', this.users);
      this.router.navigate(['/users']);
    }
  }

  editUser(user: IUser, userId: number) {
    const usersData = this.users.map(item => {
      if (userId === item.id) {
        item = {...user, id: userId};
      }
      return item;
    });
    this.users = [...usersData];
    this.browserStorage.setLocal('users', this.users);
    this.router.navigate(['/users']);
  }

  removeUser(id: number) {
    if (id) {
      this.users = [...this.users.filter(item => item.id !== id)];
      this.browserStorage.setLocal('users', this.users);
    }
  }

  removeAll() {
    this.users = [];
    this.browserStorage.removeFromLocal('users');
  }
}
