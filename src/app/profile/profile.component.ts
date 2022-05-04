import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  auxUser : any;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  constructor(private token: TokenStorageService,private userService: UserService,private router: Router) { }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.getUserById(this.currentUser.id).subscribe(
      data=>{this.auxUser=data;
        console.log(data);
      },
      error => {
        console.log(error);
      }

    );
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.userService.uploadIMG(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the image!';
            }
            this.currentFile = undefined;
          });
      }
      this.selectedFiles = undefined;
    }
  }

  editProfile():void{
    this.router.navigate(['/editProfile']);
  }
  changePassword():void{
    this.router.navigate(['/changePassword']);
  }

}