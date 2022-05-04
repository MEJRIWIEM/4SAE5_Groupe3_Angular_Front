import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form: any = {
    token: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
  const { token,password } = this.form;
   this.authService.resetPassword(token,password).subscribe(
    response => {
      console.log(response);
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      this.router.navigate(['/login']);

   },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
