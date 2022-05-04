import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees?:any;
  currentEmployee: Employee = {};
  currentIndex = -1;
  page: number = 1;
  count: number = 0;
  errorMessage = '';


  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;


  constructor(private userService: UserService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveEmployees();
  }


    sendRegistrationMail():void{
      this.userService.sendRegistrationMail().subscribe(
        response => {
          console.log(response);    },
          err => {
            this.errorMessage = err.error.message;
            
          }
        );
      
    }

    retrieveEmployees():void{
      this.userService.getEmloyeesList().subscribe({next:(data)=>{
      this.employees=data;
      console.log(data);},
      error:(e)=>console.error(e)
      });}

      setActiveEmployee(employee: Employee, index: number): void {
        this.currentEmployee = employee;
        this.currentIndex = index;
      }
    
  refreshList():void{
  this.retrieveEmployees();
  this.currentEmployee = {};
  this.currentIndex = -1;
    }
    onTableDataChange(event: any) {
      this.page = event;
      this.retrieveEmployees();
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
          this.userService.upload(this.currentFile).subscribe(
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
                this.message = 'Could not upload the file!';
              }
              this.currentFile = undefined;
            });
        }
        this.selectedFiles = undefined;
      }
    }

}
