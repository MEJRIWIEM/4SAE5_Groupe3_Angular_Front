import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { Comment } from '../models/comment';

import { PostService } from '../_services/post.service';
import { NgForm } from '@angular/forms';
import { CommentService } from '../_services/comment.service';
import { LikesService } from '../_services/likes.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  public popular !: Post;
  public id !: number;
  public post !:Post ;
  public n !:number;
  public n2!:number;
  public comments : Comment[]=[];
  public comment !:Comment;
  public state!: Boolean;
  constructor(public postService :PostService,private router: Router,
    public commentService: CommentService,
    public likesService : LikesService) { }

  ngOnInit(): void {
    console.log(history.state.data)
this.id = history.state.data;

this.postService.getStatus(this.id).subscribe(
  (response : Boolean) => {
    this.state= response;
    console.log("the user likes  the post ? ****",this.state)
  }
)
this.getPost();
this.postService.getPopular().subscribe(
  (response : Post) => {
    console.log("response",response);
    this.popular =response;
    console.log("popular: ",this.popular.title);
  },
 );
 console.log("popular: ",this.popular.title);
  }
  public getPost(): void {
    this.postService.getTotalLikes(this.id).subscribe(
      (response : number) => {
        this.n2= response
        console.log(this.post);
      },
      (error : HttpErrorResponse) => {
        console.log(error.message);
      }
      );
      console.log("******** likes",this.n2)
    
    this.postService.getTotalComments(this.id).subscribe(
      (response : number) => {
        this.n= response
        console.log(this.post);
      },
      (error : HttpErrorResponse) => {
        console.log(error.message);
      }
      );
    this.postService.getPostById(this.id).subscribe(
      (response : Post) => {
        this.post = response
        console.log(this.post);
      },
      (error : HttpErrorResponse) => {
        console.log(error.message);
      }
      );
      this.postService.getComments(this.id).subscribe(
       (response: Comment[])=>{
         this.comments = response;
       }
        );
  }
  public deletePost(idPost : number): void {
    this.postService.deletePost(idPost).subscribe(
      (response : void) => {
        console.log("working");
      },
      (error : HttpErrorResponse) => {
        console.log(error.message);
      }
      );
      window.location.reload();
  }
  public editPost(post: Post){
    this.router.navigate(['/edit-post'],{state:{data: post}});
  }
  public onAddComment(addComment : NgForm): void{

    
   this.commentService.addComment( addComment.value,this.id).subscribe(
    (response : Comment) => {
      this.comment = response
      console.log(this.comment);
    },
    (error : HttpErrorResponse) => {
      console.log(error.message);
    }
    );
    this.router.navigate(['/forum']);
    

  }

  public onchangeState(){
    this.state=!this.state;
    
  }
  public like(idPost : number): void{
    this.likesService.addLike(idPost).subscribe(
      (response : any) => {
        console.log("working");
      },
      (error : HttpErrorResponse) => {
        console.log(error.message);
      }
      );
      this.router.navigate(['/forum']);
    }
  public showPost(id : number):void{
    this.router.navigate(['/show-post'],{state:{data: id}});

  }
  get(ch : any): String{
    return ch.substring(0,1);
  }
 
  

}
