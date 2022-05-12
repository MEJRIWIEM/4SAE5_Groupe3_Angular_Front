import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiServerURL ='http://localhost:8089/SpringMVC/api/Comment';

  constructor(private http: HttpClient) { }
  public addComment(comment : Comment, idPost : number):Observable<Comment>{
    return this.http.post<Comment>(`${this.apiServerURL}/addComment/${idPost}`,comment);
  }


}
