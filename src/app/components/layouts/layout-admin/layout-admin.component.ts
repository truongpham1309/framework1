import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [HeaderAdminComponent, RouterOutlet],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.css'
})
export class LayoutAdminComponent {

}
