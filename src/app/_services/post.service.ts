import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { Comment } from '../models/comment';

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
    public addPost2(f : FormData){
      return this.http.post(`${this.apiServerURL}/addPostupload2`, f);
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
    public getTotal():Observable<number>{
      return this.http.get<number>(`${this.apiServerURL}/totalPosts`);
    }
    public getTotalComments(idPost : number):Observable<number>{
      return this.http.get<number>(`${this.apiServerURL}/NbrCommentsPost/${idPost}`);
    }
    public getTotalLikes(idPost : number):Observable<number>{
      return this.http.get<number>(`${this.apiServerURL}/NbrLikesPost/${idPost}`);
    }
    public getComments(idPost : number):Observable<Comment[]>{
      return this.http.get<Comment[]>(`${this.apiServerURL}/CommentsByPost/${idPost}`);
    }
    //boolean like liked
    public getStatus(idPost : number):Observable<Boolean>{
      return this.http.get<Boolean>(`${this.apiServerURL}/${idPost}`);
    }
    //showMyNotifications
    public  getNotifs(): Observable<String []>{
      return this.http.get<String []>(`${this.apiServerURL}/showMyNotifications`);
    }
    public  getPopular(): Observable<Post>{
      return this.http.get<Post>(`${this.apiServerURL}/MostLiked`);
    }
  }