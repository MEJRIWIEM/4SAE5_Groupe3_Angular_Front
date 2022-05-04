import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
users?:any;
currentUser: User = {};
currentIndex = -1;
page: number = 1;
count: number = 0;

constructor(private userService: UserService, private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit(): void {
this.retrieveUsers();}

retrieveUsers():void{
  this.userService.getUsers().subscribe({next:(data)=>{
    this.users=data;
    console.log(data);
  },
  error: (e) => console.error(e)
  });
}
refreshList(): void {
  this.retrieveUsers();
  this.currentUser = {};
  this.currentIndex = -1;
}
setActiveUser(user: User, index: number): void {
  this.currentUser = user;
  this.currentIndex = index;
}
deleteUser(iduser: any): void {
  this.userService.delete(iduser)
    .subscribe(
      response => {
        console.log(response);
        window.location.reload();},
      error => {
        console.log(error);
      });
      
}
onTableDataChange(event: any) {
  this.page = event;
  this.retrieveUsers();
}

EmployeeList():void{
  this.router.navigate(['/employeesList']);
}

}
