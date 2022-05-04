import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Employee } from '../models/employee.model';
const API_URL = 'http://localhost:8089/SpringMVC/api/userCrud/';
const DELETE= 'http://localhost:8089/SpringMVC/api/userCrud/deleteUser';
const IMAGE='http://localhost:8089/SpringMVC/files';
const GETONE='http://localhost:8089/SpringMVC/api/userCrud/admin/employeeById';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_URL+'admin/employees');
  }
  getUserById(id: any):Observable<User>{
    
    return this.http.get<User>(`${GETONE}/${id}`);

  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${DELETE}/${id}`);
  }

  getImage(idf: any):Observable<any> {
    return this.http.get<any>(`${IMAGE}/${idf}`);
  }

  getEmloyeesList():Observable<Employee[]>{
    return this.http.get<Employee[]>(API_URL+'admin/employeesList');
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('CSVfile', file);
    const req = new HttpRequest('POST', `${API_URL}admin/employeesList`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  uploadIMG(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${API_URL}user/photo`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  sendRegistrationMail(): Observable<any> {
    return this.http.get(API_URL+'sendRegistrationMail');
  }

  edit(username: string, email: string, password: string,firstname:string,lastname:string,numTel:number,departement:string): Observable<any> {
    return this.http.put( API_URL+'userEdit', {
      username,
      email,
      password,
      firstname,
      lastname,
      numTel,
      departement, 
    }, httpOptions);
  }
}