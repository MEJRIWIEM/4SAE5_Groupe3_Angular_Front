import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForumComponent } from './forum/forum.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { EditPostComponent } from './edit-post/edit-post.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'employeesList', component: EmployeesListComponent },
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: 'show-post', component: PostDetailsComponent },
  { path: 'edit-post', component: EditPostComponent },
 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}