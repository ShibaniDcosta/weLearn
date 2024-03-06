import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CarouselModule } from 'ngx-owl-carousel-o';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';



import { ChatComponent } from './chat/chat.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AdminComponent } from './admin/admin.component';
import { AddFormComponent } from './add-form/add-form.component';
import { TableComponent } from './table/table.component';

import { OAuthModule } from 'angular-oauth2-oidc';
import { StudentsDetailsComponent } from './students-details/students-details.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { InstructorComponent } from './instructor/instructor.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EnrolledComponent } from './enrolled/enrolled.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { AnnouncementFormComponent } from './announcement-form/announcement-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    NavigationComponent,
    ChatComponent,
    HomeComponent,
    StudentComponent,
    CarouselComponent,
    AdminComponent,
    AddFormComponent,
    TableComponent,
    StudentsDetailsComponent,
    InstructorComponent,
    CourseFormComponent,
    CreateCourseComponent,
    EnrolledComponent,
    StudentFormComponent,
    AssignmentFormComponent,
    AnnouncementFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    CarouselModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,

    OAuthModule.forRoot(),
    NgxDropzoneModule,

    FormsModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
