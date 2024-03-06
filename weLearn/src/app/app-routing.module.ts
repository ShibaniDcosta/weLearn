import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ChatComponent } from './chat/chat.component';
import { EnrolledComponent } from './enrolled/enrolled.component';
import { HomeComponent } from './home/home.component';
import { InstructorComponent } from './instructor/instructor.component';
import { StudentComponent } from './student/student.component';
import { StudentsDetailsComponent } from './students-details/students-details.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "chat", component: ChatComponent },
  // { path: "create", component: PostCreateComponent, canActivate: [AuthGuard] },
  // { path: "edit/:postId", component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "student", component: StudentComponent},
  { path: "student/:id", component: StudentComponent},
  { path: "instructor/:id", component: InstructorComponent},
  { path: "enrolled", component: EnrolledComponent},
  { path: "enrolled/:id", component: EnrolledComponent},
  { path:"admin", component:AdminComponent},
  { path:"table",component:TableComponent},
  {path:"studentDetails/:id", component:StudentsDetailsComponent},
  {path:'**',redirectTo:'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
