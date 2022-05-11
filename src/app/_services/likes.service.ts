import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Likes } from '../models/likes';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  private apiServerURL ='http://localhost:8089/SpringMVC/api/Like/likePost';

  constructor(private http: HttpClient) { }
  public addLike( idPost : number){
    return this.http.post(`${this.apiServerURL}/${idPost}`,null);
  }
}
