import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, responseDataLogin } from '../types/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = "http://localhost:8000/users";

  constructor(private http: HttpClient, private route: Router, private toastr: ToastrService) { }

  private getHeaders(): HttpHeaders {
    if (!sessionStorage.getItem('token_admin')) this.route.navigateByUrl("/login");
    const token = sessionStorage.getItem('token_admin');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    })
  }

  registerAccount(account: Omit<User, "_id" | "role">): void {
    this.http.post<User>(`${this.apiURL}/register`, account).subscribe(data => {
      const { email, password } = account;
      this.loginAccount({ email, password });
    }, (error) => {
      console.log(error);
      this.toastr.warning("Register failed!", "", {

      });
    }
    );
  }

  loginAccount(account: Omit<User, "username" | "_id" | "role">): void {
    this.http.post<responseDataLogin>(`${this.apiURL}/login`, account).subscribe((data) => {
      if (data.user.role === "admin") {
        this.route.navigateByUrl("/admin");
        sessionStorage.setItem("token_admin", data.token);
      }
      else {
        this.route.navigateByUrl("/products");
        sessionStorage.setItem("token", data.token);
      }
    }, (error) => {
      this.toastr.warning("Email or password incorrect!");
    }
    )
  }

  getAllUsers(): Observable<User[]> {
    const options = {
      headers: this.getHeaders(),
    }
    return this.http.get<User[]>(this.apiURL, options);
  }

  removeUser(id: string): Observable<User> {
    const options = {
      headers: this.getHeaders(),
    }
    return this.http.delete<User>(`${this.apiURL}/${id}`, options);
  }
}
