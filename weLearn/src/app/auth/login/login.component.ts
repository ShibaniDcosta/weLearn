import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../auth.service";

interface Role {
  value: string;
  viewRole: string;
}

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  isLoading = false;
  selectedRole: string ='Student';

  roles: Role[] = [
    {value: 'STUDENT', viewRole : 'Student'},
    {value: 'INSTRUCTOR', viewRole : 'Instructor'},
    {value: 'ADMIN', viewRole : 'Admin'},
  ];

  constructor(public authService: AuthService, public router:Router) {
    console.log("Hello")
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.router.navigate(["/student"]);
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password,this.selectedRole);
  }

  reset(){

  console.log("clickec");
  }
}
