import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { content } from '@syncfusion/ej2/grids';
import { Post } from '../models/post';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [PostService],
})
export class AddPostComponent implements OnInit {

  public fd = new FormData();
  public s!: String ;
  public post!: Post;
  public fileUser !: File;
  constructor(private router: Router,public postService : PostService) { }

  ngOnInit(): void {
  }
  public forum(): void {
    
    this.router.navigate(['/forum']);
    
  }
  public onAddPost(addForm : NgForm): void{

    
    this.postService.addPost(addForm.value).subscribe(
      (response : Post)=> {
        console.log(response);
        console.log("clicked show success!");
      },
     (error: HttpErrorResponse)=>{
        alert(error.message);
      }
      
     
    )
    this.router.navigate(['/forum']);

    console.log("clicked show success!");
  }
  public onAddPost2(addForm : NgForm): void{

    const df : FormData = new FormData();
    df.append('file',this.fileUser);
    df.append('post',JSON.stringify(addForm.value));
    console.log(JSON.stringify(addForm.value));
    console.log(this.fileUser);
    this.postService.addPost2(df).subscribe(data=>console.log(data));
    this.router.navigate(['/forum']);
    console.log("clicked show success!");
    
  }

  onFileChanged(event : any){
    const file = event.target.files[0];
    this.fileUser = file;
    console.log("file is : ", this.fileUser);

  }
  
 

}
