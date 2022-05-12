import { Post } from "./post";
import { User } from "./user.model";

export interface Likes{
    idLikes:number;
    user:User;
    post:Post;
    
    
}