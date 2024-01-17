import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  languages: string = "Angular";
  menuList = [
    { id: 1, name: "Home", slug: "/home" },
    { id: 2, name: "Products", slug: "/products" },
    { id: 3, name: "Contact", slug: "/contact" },
    { id: 4, name: "Admin", slug: "/admin" },
    { id: 5, name: "Login", slug: "/login" },
  ];

  navigationHiddenOrShow: boolean = true;

  onClickMenu(): void {
    this.navigationHiddenOrShow = !this.navigationHiddenOrShow;
  }
}
