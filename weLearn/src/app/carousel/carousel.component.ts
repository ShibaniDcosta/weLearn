import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { AuthService } from '../auth/auth.service';
import { Courses } from '../courses';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() slides?:Courses[];
  @Input() enrolled?:boolean;

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>'],

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

  


  constructor(private router: Router) { 
  }

  ngOnInit(): void {
    console.log(this.slides)
    
  }

  activeSlides: SlidesOutputData|undefined;

  getData(data: SlidesOutputData) {
    this.activeSlides = data;
    console.log(this.activeSlides);
  }

  getId(slide:any){
    this.router.navigate(['/studentDetails',slide._id]);
    console.log(slide);
  }

}
