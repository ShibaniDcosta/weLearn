import { Component, OnInit } from '@angular/core';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { ApiService } from '../api/api.service';
import { Courses } from '../courses';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],
    // navText: ['',''],

    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4 
      }
    },
    nav: true
  }

  slides :Courses[]= [
    // {id:"1",img: "https://picsum.photos/id/237/200/300", title:"Course 1"},
    // {id:"2", img: "https://picsum.photos/seed/picsum/200/300",title:"Course 2"},
    // {id:"3", img: "https://picsum.photos/200/300?grayscale", title:"Course 3"},
    // {id:"4", img: "https://picsum.photos/200/300/?blur=2", title:"Course 4"},
    // {id:"5", img: "https://picsum.photos/200/300?grayscale", title:"Course 5"},
    // {id:"6", img: "https://picsum.photos/200/300/?blur=2", title:"Course 6"}
  ];


  constructor(private _service:ApiService) { }

  ngOnInit(): void {
    this._service.getdata("courses").subscribe(data=>{
        console.log(data);
        this.slides = data;
    })
  }

  activeSlides: SlidesOutputData|undefined;

  // slidesStore: any[];


  getData(data: SlidesOutputData) {
    this.activeSlides = data;
    console.log(this.activeSlides);
  }

  getId(id:any){
    console.log(id);
  }

}
