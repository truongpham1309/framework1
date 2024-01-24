import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, responseDataLogin } from '../types/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = "http://localhost:8000/users";

  constructor(private http: HttpClient, private route: Router, private toastr: ToastrService) { }

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    })
  }

  registerAccount(account: User): void {
    this.http.post<User>(`${this.apiURL}/register`, account).subscribe(data => {
      const {email, password} = account;
      this.loginAccount({email, password});
    },(error) => {
      console.log(error);
      this.toastr.warning("Register failed!","",{
        
      });
    }
    );
  }

  loginAccount(account: Omit<User, "username">): void {
    this.http.post<responseDataLogin>(`${this.apiURL}/login`, account).subscribe((data) => {
      sessionStorage.setItem("token", data.token);

      if(data.user.role === "admin") this.route.navigateByUrl("/admin");
      else this.route.navigateByUrl("/products");
    }, (error) => {
      this.toastr.warning("Email or password incorrect!");
    }
    )
  }
}
