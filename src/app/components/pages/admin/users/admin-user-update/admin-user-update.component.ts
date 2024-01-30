import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';
import { User } from '../../../../../types/users';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-user-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-user-update.component.html',
  styleUrl: './admin-user-update.component.css'
})
export class AdminUserUpdateComponent implements OnInit {
  account: User = {
    _id: 0,
    username: "",
    email: "",
    password: "",
    role: "",
  }

  idUser = 0;

  valid = {
    username: "",
    email: "",
    password: "",
  }

  isUpdate = true;

  constructor(private authS: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.idUser = Number(param.get("idUser"));
    })

    this.authS.getDetailUser(this.idUser).subscribe(data => this.account = data);
  }

  handleValidFormRegister() {
    if (!this.account.username) {
      this.valid.username = `Username is required`;
      this.isUpdate = false;
    }
    if (!this.account.password) {
      this.valid.password = `Password is required`;
      this.isUpdate = false;
    }
    if (!this.account.email) {
      this.valid.email = `Email is required`;
      this.isUpdate = false;
    }

    if (this.account.email && this.account.password && this.account.username) this.isUpdate = true;

    return this.isUpdate;
  }

  handleSubmitUpdateUser() {
    if(!this.handleValidFormRegister()) return;
    this.authS.updateUser(this.account);
  }


}
