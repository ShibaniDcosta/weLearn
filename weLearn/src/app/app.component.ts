import { Component, Inject, Renderer2, OnInit, HostBinding } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GoogleApiService, UserInfo } from './google-api.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userInfo?: UserInfo;


  // isLoggedIn(): boolean {
  //   return this.googleApi.isLoggedIn()
  // }

  // logout() {
  //   this.googleApi.signOut()
  // }

  title = 'weLearn';

  get isDarkMode(): boolean {
    return this.currentTheme === 'theme-dark';
  }

  private currentTheme = 'theme-light';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    // private readonly googleApi: GoogleApiService
  ) {
    // googleApi.userProfileSubject.subscribe( info => {
    //   this.userInfo = info
    //   console.log(this.userInfo);
    // })
  }
  

  ngOnInit(): void {
    this.currentTheme = localStorage.getItem('activeTheme') || 'theme-light';
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
  }

  switchMode(isDarkMode: boolean) {
    this.currentTheme = isDarkMode ? 'theme-dark' : 'theme-light';
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
    localStorage.setItem('activeTheme', this.currentTheme);
  }
}
