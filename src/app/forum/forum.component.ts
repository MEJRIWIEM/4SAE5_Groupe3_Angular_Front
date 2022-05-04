import { state } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: [PostService],

})
export class ForumComponent implements OnInit {
  

  public posts: Post[] =[];
  constructor(public postService : PostService,private router: Router) { }

  ngOnInit(): void {
  
    this.getPosts();
  }
  public getPosts(): void {
    this.postService.getPosts().subscribe(
      (response : Post[]) => {
        this.posts = response
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
      );
  }
public add(): void {
    
    this.router.navigate(['/add-post']);
    
  }
  public showPost(id : number):void{
    this.router.navigate(['/show-post'],{state:{data: id}});

  }

}
