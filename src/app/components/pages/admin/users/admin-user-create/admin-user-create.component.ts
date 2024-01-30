import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../../../../types/users';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-admin-user-create',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './admin-user-create.component.html',
  styleUrl: './admin-user-create.component.css'
})
export class AdminUserCreateComponent {
  account: Omit<User, "_id" | "role"> = {
    username: "",
    email: "",
    password: "",
  }

  valid = {
    username: "",
    email: "",
    password: "",
  }

  isRegister = false;

  constructor(private auth: AuthService) { }

  handleValidFormRegister() {
    if (!this.account.username) {
      this.valid.username = `Username is required`;
      this.isRegister = false;
    }
    if (!this.account.password) {
      this.valid.password = `Password is required`;
      this.isRegister = false;
    }
    if (!this.account.email) {
      this.valid.email = `Email is required`;
      this.isRegister = false;
    }

    if (this.account.email && this.account.password && this.account.username) this.isRegister = true;

    return this.isRegister;
  }

  handleSubmitCreateUser() {
    console.log("object");
    if (!this.handleValidFormRegister()) return;
    this.auth.createUser(this.account);
  }
}
