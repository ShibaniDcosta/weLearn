import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";
import { environment } from "src/environments/environment";

let BACKEND_URl=environment.apiUrl;

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string|undefined;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  public roleListener = new Subject<string>();
  public studentIdListner = new Subject<string>();
  public enrolledListListner = new Subject<any>();

  
  public sId:string;
  public grade:string;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getRoleListener() {
    return this.roleListener.asObservable();
  }


  createUser(authData:any) {
   
    this.http
      .post(BACKEND_URl+"user/signup", authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(["/login"]);
      });
  }

  login(email: string, password: string, role:string) {
    console.log("login page")
    console.log(role);
    const authData: AuthData = { email: email, password: password};
    // let role:string;
    this.roleListener.subscribe(cur=>{
        let currole = cur;
        console.log(currole)
        
        
    })


    
   

    this.http
      .post<{ token: string; expiresIn: number ;role:string,userId:string,studentInfo?:any,instructor?:Object}>(
        BACKEND_URl+"user/login",
        authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;

        
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          if(role == 'STUDENT'){
            this.sId = response.userId;
            this.grade = response.studentInfo.grade;
            this.studentIdListner.next(response.userId);
            this.router.navigate(["/student",response.userId]);
          }
          else if(role == 'INSTRUCTOR'){
            this.router.navigate(["/instructor",response.userId]);
          }else{
            this.router.navigate(["/admin"]);
      
          }
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = undefined;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
