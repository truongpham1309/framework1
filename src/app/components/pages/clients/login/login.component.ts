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
  isBackground = false;

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.router.navigateByUrl("/home");
      this.toastr.info("Bạn đã đăng nhập!", "", {
        positionClass: 'toast-top-full-width',
      })
    }
  }

  handleValidInput(e: HTMLInputElement) {
    if (!e.value) {
      if (e.name === "email") {
        this.valid.email = `${e.name} is required!`;
        this.isBackground = false;
        return false;
      }
      else if (e.name === "password") {
        this.valid.password = `${e.name} is required!`;
        this.isBackground = false;
        return false;
      }
    }
    else {
      this.valid = {
        email: "",
        password: "",
      }
      this.isBackground = true;
    }
    return true;
  }

  handleSubmitLogin() {

    if (!this.account.email || !this.account.password) return;

    this.auth.loginAccount(this.account);
  }

}
