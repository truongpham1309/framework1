import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../types/users';
import { AuthService } from '../../../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { DescriptionPipe } from '../../../../../pipes/description.pipe';
import { Toast, ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [CommonModule, DescriptionPipe, RouterLink],
  templateUrl: './admin-user-list.component.html',
  styleUrl: './admin-user-list.component.css'
})
export class AdminUserListComponent implements OnInit {
  Users: User[] = [];
  constructor(private auth: AuthService, private toastr: ToastrService) {}
  ngOnInit(): void {
    this.auth.getAllUsers().subscribe(data => {
      this.Users = data      
    })
  }

  handleClickRemoveUser(id:string) {
    if(!confirm('Are you sure you want to remove?')) return;

    this.auth.removeUser(id).subscribe( () => {
      this.toastr.success('User removed successfully!',"");
      this.Users = this.Users.filter(user => user._id !== id);
    }, (error) => {
      console.log(error);
      this.toastr.error("Remove user failed!","");
    })
  }

}
