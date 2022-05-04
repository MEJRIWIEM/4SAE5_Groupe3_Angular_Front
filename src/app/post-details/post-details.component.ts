import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
public id !: number;
  public post !:Post;
  constructor(public postService :PostService,private router: Router) { }

  ngOnInit(): void {
    console.log(history.state.data)
this.id = history.state.data;
this.getPost();
  }
  public getPost(): void {
    this.postService.getPostById(this.id).subscribe(
      (response : Post) => {
        this.post = response
        console.log(this.post);
      },
      (error : HttpErrorResponse) => {
        console.log(error.message);
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
      this.router.navigate(['/forum']);

  }
  public editPost(post: Post){
    this.router.navigate(['/edit-post'],{state:{data: post}});
  }

}
