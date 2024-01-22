import { RouterLink } from '@angular/router';
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

  constructor(private auth: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  handleSubmitLogin() {
    try {
      this.auth.loginAccount(this.account);
    } catch (error) {
      this.toastr.warning("Email or password incorrect!", "INCORRECT", {
        positionClass: "toast-top-full-width",
        closeButton: true,
      })
    }
  }

}
