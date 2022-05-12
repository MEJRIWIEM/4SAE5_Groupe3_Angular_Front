import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Offer} from "../../models/offer";
import {catchError} from "rxjs/operators";
import {Rating} from "../../models/rating";
import {Collaborator} from "../../models/collaborator";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private offerUrl='http://localhost:8089/SpringMVC/api/offer'
  private allOfferUrl='http://localhost:8089/SpringMVC/api/offer/ListOfOffer'

  constructor(private httpClient:HttpClient) { }



  create(id: string | null, offer: Offer): Observable<any> {

    return this.httpClient.post(this.offerUrl + '/addOffer/'+ id, offer, {responseType: 'text'})
        .pipe(
            catchError(this.errorHandler)
        )
  }
  createRating(id: number, rating: Rating): Observable<any> {

    return this.httpClient.post("http://localhost:8089/SpringMVC/api/rating/ratingOffer"+ id, rating, {responseType: 'text'})
        .pipe(
            catchError(this.errorHandler)
        )
  }

  excel(): Observable<any> {

    return this.httpClient.get(this.offerUrl + '/export/excel')

  }
  find(id:any): Observable<any> {


    return this.httpClient.get(this.offerUrl + '/getOffersWithCollabortorId/' + id)

        .pipe(
            catchError(this.errorHandler)
        )
  }

  public findAll(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>(this.allOfferUrl);
  }


  findById(id:any): Observable<any> {


    return this.httpClient.get<Offer[]>(this.offerUrl + '/RetriveOfferById/'+ id)

        .pipe(
            catchError(this.errorHandler)
        )
  }

  update(id:number, offer:Offer): Observable<any> {

    return this.httpClient.put(this.offerUrl + '/updateOffer/' + id,  offer, {responseType: 'text'})

        .pipe(
            catchError(this.errorHandler)
        )
  }

  delete(id:number){
    return this.httpClient.delete(this.offerUrl + '/DeleteOffer/' + id, {responseType: 'text'})


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
