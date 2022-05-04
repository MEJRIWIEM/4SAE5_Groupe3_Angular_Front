import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [PostService],
})
export class AddPostComponent implements OnInit {

  public post!: Post;
  constructor(private router: Router,public postService : PostService) { }

  ngOnInit(): void {
  }
  public forum(): void {
    
    this.router.navigate(['/forum']);
    
  }
  public onAddPost(addForm : NgForm): void{

    this.post = addForm.value;
    this.post.fileURL="";
    this.post.file_id=1;
    this.postService.addPost(addForm.value).subscribe(
      (response : Post)=> {
        console.log(response);
        console.log("clicked show success!");
      },
    /*  (error: HttpErrorResponse)=>{
        alert(error.message);
      }*/
      
     
    )
    this.router.navigate(['/forum']);

    console.log("clicked show success!");
  }

}
