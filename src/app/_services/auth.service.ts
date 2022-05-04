import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8089/SpringMVC/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }
  register(username: string, email: string, password: string,firstname:string,lastname:string,numTel:number,departement:string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
      firstname,
      lastname,
      numTel,
      departement, 
    }, httpOptions);
  }
forgetPassword(email:string):Observable<any> {
  return this.http.post(AUTH_API + 'forgetPassword', {
    email
  }, httpOptions);
}


resetPassword(token:string,newPassword:string):Observable<any> {
  return this.http.post(AUTH_API + 'resetPassword', {
    token,newPassword
  }, httpOptions);
}

refreshToken(token: string) {
  return this.http.post(AUTH_API + 'refreshtoken', {
    refreshToken: token
  }, httpOptions);
}

}