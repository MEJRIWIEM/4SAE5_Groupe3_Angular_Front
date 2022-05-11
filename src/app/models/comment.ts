import { Post } from "./post";
import { User } from "./user.model";

export interface Comment{
    idComment:number;
    timestamp:Date;
    text:string;
    post:Post;
    user:User;
    
    
}