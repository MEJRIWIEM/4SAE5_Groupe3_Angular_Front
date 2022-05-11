import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RowHistoryFormat } from '@syncfusion/ej2/documenteditor';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  currentUser: any;

  form: any = {
    username: null,
    email: null,
    password: null,
    firstname: null,
      lastname: null,
      numTel: null,
      departement: null
  };

  constructor(private token: TokenStorageService,private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.form.username=this.currentUser.username;
    this.form.email=this.currentUser.email;
    this.form.password=this.currentUser.password;
    this.form.firstname=this.currentUser.firstname;
    this.form.lastname=this.currentUser.lastname;
    this.form.numTel=this.currentUser.numTel;
    this.form.departement=this.currentUser.departement;

  }

  onSubmit():void {
    const { username, email, password,firstname,lastname,numTel,departement} = this.form;
    this.userService.edit(username, email, password ,firstname,lastname,numTel,departement ).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/profile']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
