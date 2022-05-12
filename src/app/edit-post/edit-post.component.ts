import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  public editpost !: Post;
  public fileUser !: File;

  constructor(private router: Router,public postService : PostService) {
  
   }

  ngOnInit(): void {
    console.log(history.state.data)
    this.editpost = history.state.data;
  }
  public forum(): void {
    
    this.router.navigate(['/forum']);
    
  }
  public editPost(post : Post): void{
    
    this.postService.editPost(post).subscribe(
      (response : Post)=> {
        console.log(response);
        console.log("clicked show success!");
      },
      (error: HttpErrorResponse)=>{
        //alert(error.message);
      }
      
     
    )
    this.router.navigate(['/forum']);

    console.log("clicked show success!");
  }
 


}
