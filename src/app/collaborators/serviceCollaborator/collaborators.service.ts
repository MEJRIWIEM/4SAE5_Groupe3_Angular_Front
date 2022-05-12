import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Collaborator} from "../../models/collaborator";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
const IMAGE='http://localhost:8089/SpringMVC/files';
@Injectable({
  providedIn: 'root'
})
export class CollaboratorsService {
  private usersUrl: string;
  private collaboratorUrl='http://localhost:8089/SpringMVC/api/collaborator'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient:HttpClient) {
    this.usersUrl  = 'http://localhost:8089/SpringMVC/api/collaborator/ListOfCollaborators';


  }

  getImage(idf: any):Observable<any> {
    return this.httpClient.get<any>(`${IMAGE}/${idf}`);
  }

  public findAll(): Observable<Collaborator[]> {
    return this.httpClient.get<Collaborator[]>(this.usersUrl);
  }

  create(col:Collaborator): Observable<any> {

    return this.httpClient.post(this.collaboratorUrl + '/addCollaborator', col, {responseType: 'text'})
        .pipe(
            catchError(this.errorHandler)
        )
  }
  find(id:number): Observable<any> {


    return this.httpClient.get(this.collaboratorUrl + '/RetriveCollaborator/' + id)

        .pipe(
            catchError(this.errorHandler)
        )
  }

  update(id:number, col:Collaborator): Observable<any> {

    return this.httpClient.put(this.collaboratorUrl + '/EditCollaborator/' + id,  col, {responseType: 'text'})

        .pipe(
            catchError(this.errorHandler)
        )
  }

  delete(id:number){
    return this.httpClient.delete(this.collaboratorUrl + '/DeleteCollaborator/' + id, {responseType: 'text'})


        .pipe(
            catchError(this.errorHandler)
        )
  }

  uploadIMG(id:number,file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `http://localhost:8089/SpringMVC/api/collaborator/logo`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }



}
