import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  form: any = {
    email: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { email } = this.form;
    this.authService.forgetPassword(email).subscribe(
      response => {
        console.log(response);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/resetPassword']);

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
