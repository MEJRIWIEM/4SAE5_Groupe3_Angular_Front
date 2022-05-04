import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from "./app.material-module";
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ForumComponent } from './forum/forum.component';
import { PostService } from './_services/post.service';
import { AddPostComponent } from './add-post/add-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { EditPostComponent } from './edit-post/edit-post.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    EmployeesListComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    ForumComponent,
    AddPostComponent,
    PostDetailsComponent,
    EditPostComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    authInterceptorProviders,
    PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }