import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Adver} from "../../models/adver";
import {Collaborator} from "../../models/collaborator";


@Injectable({
  providedIn: 'root'
})
export class AdsService {

  private adsUrl='http://localhost:8089/SpringMVC/api/advert'
  //http://localhost:8089/SpringMVC/api/advert/updateAds/11
  private allAds='http://localhost:8089/SpringMVC/api/advert/ListOfAds'


  constructor(private httpClient:HttpClient) { }


  create(id: string | null, col: Adver): Observable<any> {

    return this.httpClient.post(this.adsUrl + '/addAdvert/'+ id, col, {responseType: 'text'})
        .pipe(
            catchError(this.errorHandler)
        )
  }
  public findAll(): Observable<Adver[]> {
    return this.httpClient.get<Adver[]>(this.allAds );
  }
  find(id:number): Observable<any> {


    return this.httpClient.get<Adver[]>(this.adsUrl + '/getAdsWithCollabortorId/'+ id)

        .pipe(
            catchError(this.errorHandler)
        )
  }

  findById(id:any): Observable<any> {


    return this.httpClient.get<Adver[]>(this.adsUrl + '/RetriveAdsById/'+ id)

        .pipe(
            catchError(this.errorHandler)
        )
  }
  uploadIMG(id:number,file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `http://localhost:8089/SpringMVC/api/advert/flayer`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }

  update(id:number, advert:Adver): Observable<any> {

    return this.httpClient.put(this.adsUrl + '/updateAds/' + id,  advert, {responseType: 'text'})

        .pipe(
            catchError(this.errorHandler)
        )
  }

  delete(id:number){
    return this.httpClient.delete(this.adsUrl + '/DeleteAds/' + id, {responseType: 'text'})
        .pipe(
            catchError(this.errorHandler)
        )
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
