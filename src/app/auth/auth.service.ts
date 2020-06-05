import { Injectable } from '@angular/core';
import { BrowserStorageService } from './../shared/_services/browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private browserStorage: BrowserStorageService) { }

  get isAuthenticated(): boolean {
    let authenticated: boolean;
    const user = this.browserStorage.getLocal('userAuth');
    user ?  authenticated = true : authenticated = false;
    return authenticated;
  }
}
