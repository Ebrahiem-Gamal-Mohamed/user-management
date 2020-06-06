import { Injectable } from '@angular/core';
import { BrowserStorageService } from './../shared/_services/browser-storage.service';
import * as User from './../users/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private browserStorage: BrowserStorageService, private router: Router) { }

  get isAuthenticated(): boolean {
    let authenticated: boolean;
    const user = this.browserStorage.getLocal('userAuth');
    user ?  authenticated = true : authenticated = false;
    return authenticated;
  }

  login(user: User.IUserCredential) {
    if (user) {
      this.browserStorage.setLocal('userAuth', user);
      this.router.navigate(['/dashboard']);
    }
  }

  logout() {
    this.browserStorage.removeFromLocal('userAuth');
    this.router.navigate(['/login']);
  }

}
