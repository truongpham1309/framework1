import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  account = {
    email: "",
    password: "",
  }

  constructor(private auth: AuthService, private toastr: ToastrService, private router: Router) { }

  valid = {
    email: "",
    password: "",
  };

  isLogin = false;

  ngOnInit(): void {
    if (sessionStorage.getItem("token")) {
      this.router.navigateByUrl("/home");
      this.toastr.info("Bạn đã đăng nhập!", "")
    }
  }

  handleValidInput() {
    if (this.account.email.trim().length === 0) {
      this.valid.email = "Email is required!";
      this.isLogin = false;
    }
    if (this.account.password.trim().length === 0) {
      this.valid.password = "Password is required!";
      this.isLogin = false;
    }
    if (this.account.email.trim().length === 0 && this.account.password.trim().length === 0) this.isLogin = true;

    return this.isLogin;
  }

  handleSubmitLogin() {
    if (this.handleValidInput()) return;
    this.auth.loginAccount(this.account);
  }

}
