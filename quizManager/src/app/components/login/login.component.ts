import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  user: User = {
    email: '',
    password: '',
    role: '',
  };

  onLogin() {
    this.authService
      .login(this.user.email, this.user.password)
      .subscribe((res) => {
        this.router.navigate(['dashboard']).then(() => {
          window.location.reload();

          console.log(res);
        });
      });
  }
}
