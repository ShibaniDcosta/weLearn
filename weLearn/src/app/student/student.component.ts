import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { Courses } from '../courses';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  wNext?: Courses[];
  recomm?: Courses[];
  learning?: any[];
  searchResult: any[];
  res:boolean=false;
  studentId:string='';
  show=false;
  constructor(private _service:ApiService,private route: ActivatedRoute,private authService: AuthService) { }

  ngOnInit(): void {
    this.studentId = this.authService.sId;

    this.route.params.subscribe((params: Params) => this.studentId = params['id']);

    this._service.getdata("courses/recommendCourse").subscribe(data=>{
      console.log("recommended");
      console.log(data);
        this.recomm = data;
    })

    this._service.getdata("courses/whatnext").subscribe(data=>{
      this.wNext = data;
    })

    this._service.learning("student/populate",{

      "studentId":this.studentId,
  
  }).subscribe(data=>{
    console.log(this.studentId);

      this.learning = data;
      if(this.learning.length != 0){
        this.show = true;
      }
  })

  }

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (filterValue == '' ||undefined){
      this.res = false;
      
    }
    else{
      this._service.customPost("courses/search",{text:filterValue}).subscribe(data=>{
        console.log(data);
        this.searchResult = data; 
        this.res = true;
       })

    }
    

    
    
  }

  // learning = [
  //   {id:"1",img: "https://picsum.photos/200/300/?blur=2", title:"Course 1"},
  //   {id:"2", img: "https://picsum.photos/seed/picsum/200/300",title:"Course 2"},
  //   {id:"3", img: "https://picsum.photos/200/300?grayscale", title:"Course 3"},
  //   {id:"4", img: "https://picsum.photos/200/300/?blur=2", title:"Course 4"},
  //   {id:"5", img: "https://picsum.photos/200/300?grayscale", title:"Course 5"},
  //   {id:"6", img: "https://picsum.photos/200/300/?blur=2", title:"Course 6"}
  // ];

  // wNext = [
  //   {id:"2", img: "https://picsum.photos/seed/picsum/200/300",title:"GOD"},
  //   {id:"3", img: "https://picsum.photos/200/300?grayscale", title:"Course 3"},
  //   {id:"4", img: "https://picsum.photos/200/300/?blur=2", title:"Course 4"},
  //   {id:"5", img: "https://picsum.photos/200/300?grayscale", title:"Course 5"},
  // ];

  // recomm = [
  //   {id:"6", img: "https://picsum.photos/200/300/?blur=2", title:"Course 6"},
  //   {id:"3", img: "https://picsum.photos/200/300?grayscale", title:"Course 3"},
  //   {id:"1",img: "https://picsum.photos/id/237/200/300", title:"Course 1"},
  //   {id:"2", img: "https://picsum.photos/seed/picsum/200/300",title:"Course 2"},
  //   {id:"4", img: "https://picsum.photos/200/300/?blur=2", title:"Course 4"},
  //   {id:"5", img: "https://picsum.photos/200/300?grayscale", title:"Course 5"}
  // ];


}
