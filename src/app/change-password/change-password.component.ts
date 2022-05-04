import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  errorMessage = '';
  currentUser:any;
  constructor(private token: TokenStorageService,private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
  
  this.currentUser=this.token.getUser();
  this.authService.forgetPassword(this.currentUser.email).subscribe(
    response => {
      console.log(response);
      this.router.navigate(['/resetPassword']);

    },
    err => {
      this.errorMessage = err.error.message;
      
    }
  );
}


  }


