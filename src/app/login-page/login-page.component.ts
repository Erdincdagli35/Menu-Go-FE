import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username: string = '';
  password: string = '';
  loginError: boolean = false;
  showAdminLogin: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  login() {
    if (this.username === 'zakkum' && this.password === '2025') {
      console.log("Login success");

      // ✅ login state sakla
      localStorage.setItem('isAdmin', 'true');

      // ❌ reload kaldırıldı
      this.router.navigate(['admin/product-control']);

      this.loginError = false;
    } else {
      this.loginError = true;
    }
  }

  cancel() {
    this.showAdminLogin = false;
    this.router.navigate(['menu/restaurant']);
  }
}