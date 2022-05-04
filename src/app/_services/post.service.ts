import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {



  private apiServerURL ='http://localhost:8089/SpringMVC/api/forumCrud';
    constructor(private http: HttpClient) { }
    public getPosts():Observable<Post[]>{
      return this.http.get<Post[]>(`${this.apiServerURL}/ListOfPosts`);
    }
    public addPost(post : Post):Observable<Post>{
      return this.http.post<Post>(`${this.apiServerURL}`, post);
    }
    public editPost(post : Post):Observable<Post>{
      return this.http.put<Post>(`${this.apiServerURL}/update`, post);
    }
    public deletePost(idPost : number):Observable<void>{
      return this.http.delete<void>(`${this.apiServerURL}/DeletePost/${idPost}`);
    }
    public getPostById(idPost : number):Observable<Post>{
      return this.http.get<Post>(`${this.apiServerURL}/RetrivePost/${idPost}`);
    }
  }