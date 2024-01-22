import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../types/users';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  account: User = {
    username: "",
    email: "",
    password: "",
  }

  constructor(private auth: AuthService){}

  handleSubmitRegister() {
    console.log(this.account);
    this.auth.registerAccount(this.account)
    
  }
}
