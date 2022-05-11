import { state } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { LikesService } from '../_services/likes.service';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: [PostService],

})
export class ForumComponent implements OnInit {
  term : any;
 public notifs :String[] = [];
  public posts: Post[] =[];
  public n !: number;
  public popular !: Post;
  constructor(public postService : PostService,private router: Router) { }

  ngOnInit(): void {
    this.getPosts();
    this.postService.getNotifs().subscribe(
      (response : String[]) => {
        console.log("response",response);
        this.notifs =response;
        console.log("notifsssssss : ",this.notifs);
      },
     );
     this.postService.getPopular().subscribe(
      (response : Post) => {
        console.log("response",response);
        this.popular =response;
        console.log("popular: ",this.popular.title);
      },
     );
     console.log("popular: ",this.popular.title);
     
      

  }
  public getPosts(): void {

    this.postService.getTotal().subscribe(
      (response : number) => {
        this.n=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
      );
      
    this.postService.getPosts().subscribe(
      (response : Post[]) => {
        this.posts = response
        console.log(this.posts)

      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
      );

  }
  public Notifs(): void {
    this.postService.getNotifs().subscribe(
      (response : String[]) => {
    //    this.notifs=response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
      );
      console.log("notifsssssss : ",this.notifs);

  }
public add(): void {
    
    this.router.navigate(['/add-post']);
    
  }
  public showPost(id : number):void{
    this.router.navigate(['/show-post'],{state:{data: id}});

  }
  public  ellipsify (str : String) {
    if (str.length > 150) {
        return (str.substring(0, 150) + "...");
    }
    else {
        return str;
    }
}
myFunction() :void {
  console.log("clicked")
   var x = document.getElementById("myDIV");
   if (x!.style.display === "none") {
     x!.style.display = "block";
   } else {
     x!.style.display = "none";
   }
 }

 likeOrComment(ch :String): boolean{
  var index = ch.indexOf( "liked" ); 
  if(index >0)
  return true;
  else return false;
 }
 get(ch : String): String{
   return ch.substring(0,1);
 }
  

  

}
