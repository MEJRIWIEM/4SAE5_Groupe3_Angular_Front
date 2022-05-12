import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IgxDateRangePickerModule } from "igniteui-angular";

import { FlashMessagesModule } from 'angular2-flash-messages';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { NgxStarRatingModule } from 'ngx-star-rating';

import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

// Datepicker module
//import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ForumComponent } from './forum/forum.component';
import { PostService } from './_services/post.service';
import { AddPostComponent } from './add-post/add-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdvertisingComponent } from './advertisings/advertising/advertising.component';
import { AdvertisingFormComponent } from './advertisings/advertising-form/advertising-form.component';
import { EditAdvertisingComponent } from './advertisings/edit-advertising/edit-advertising.component';
import { CollaboratorComponent } from './collaborators/collaborator/collaborator.component';
import { CollaboratorFormComponent } from './collaborators/collaborator-form/collaborator-form.component';
import { EditCollaboratorComponent } from './collaborators/edit-collaborator/edit-collaborator.component';
import { OffersComponent } from './offer/offers/offers.component';
import { OfferFormComponent } from './offer/offer-form/offer-form.component';
import { OfferEditComponent } from './offer/offer-edit/offer-edit.component';
import { DateComComponent } from './date-com/date-com.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LinkedinComponent } from './linkedin/linkedin.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


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

    AdvertisingComponent,
    AdvertisingFormComponent,
    EditAdvertisingComponent,
    CollaboratorComponent,
    CollaboratorFormComponent,
    EditCollaboratorComponent,
    OffersComponent,
    OfferFormComponent,
    OfferEditComponent,
    DateComComponent,


    LinkedinComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
    BrowserAnimationsModule,
  BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgxStarRatingModule,
    //NgbModule,
    IgxDateRangePickerModule,
    FlashMessagesModule.forRoot(),
    NgbModule,

    Ng2SearchPipeModule

  ],
  providers: [
    authInterceptorProviders,
    PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
