import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.removeAll();
    this.authService.logout();
  }

}
