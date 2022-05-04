import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  show=false;

  currentUser: any;
  auxUser : any;
  constructor(private tokenStorageService: TokenStorageService,private router: Router,private userService: UserService) { }
  ngOnInit(): void {
    
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.currentUser = this.tokenStorageService.getUser();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
      this.userService.getUserById(this.currentUser.id).subscribe(
        data=>{this.auxUser=data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
  
      );
      
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    
    this.router.navigate(['/login']);
    
  }
}