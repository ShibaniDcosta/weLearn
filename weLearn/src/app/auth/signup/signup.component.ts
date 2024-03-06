import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";

interface Role {
  value: string;
  viewRole: string;
}

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent {
  isLoading = false;
  selectedRole: string ='Student';
  roles: Role[] = [
    {value: 'STUDENT', viewRole : 'Student'},
    {value: 'INSTRUCTOR', viewRole : 'Instructor'},
    {value: 'ADMIN', viewRole : 'Admin'},
  ];

  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let authData:any;

    this.isLoading = true;
    if (this.selectedRole== 'STUDENT'){
      authData= {
          name: form.value.name,
          email: form.value.email,
          password:form.value.password,
          role: this.selectedRole,
          id: form.value.id,
          studentMajor: form.value.major
       }
    }else if (this.selectedRole== 'INSTRUCTOR'){
      authData= {
        name: form.value.name,
        email: form.value.email,
        role: this.selectedRole,
        password:form.value.password,
        id: form.value.id,
        about: form.value.desc,
        department: form.value.dept,
     }
    }
    else{
      authData= {
        name: form.value.name,
        email: form.value.email,
        password:form.value.password,
        role: this.selectedRole,
        id: form.value.id,
      }
    }

    console.log(authData)
    this.authService.createUser(authData);
    this.authService.roleListener.next(this.selectedRole);
    
  }
}
