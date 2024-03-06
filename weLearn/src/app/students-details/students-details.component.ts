import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';
import { Courses } from '../courses'; 
import { Location } from '@angular/common'
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss']
})
export class StudentsDetailsComponent implements OnInit {
  enrolled :any;

  

  panelOpenState = false;
  skills = ["HTML","CSS","Javascript","Angular","React","Typescript"];

  assignmentsList :any[];
  enrolledList: any;

  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;

  constructor(private _service:ApiService,private location: Location,private route: ActivatedRoute,private authService: AuthService,public snackBar: MatSnackBar) { }
  course:any;
  courseId = '12345666'
  studentId:string;
  grade:string;
  
  ngOnInit(): void {

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.studentId = this.authService.sId;
    this.grade = this.authService.grade;
    this.route.params.subscribe((params: Params) =>{
      this.courseId = params['id'];
    } );


    this._service.getdata("courses/getCourse/"+this.courseId).subscribe(data=>{
      console.log(data);
      this.course = data;
    })


    this._service.getdata("courses/getCourse/"+this.courseId).subscribe(data=>{
      console.log(data);
      this.course = data;
    })

    this._service.postData("student/checkEnroll",{
      "studentId":this.studentId, 
      "courseId":this.courseId
  }).subscribe(bool =>{
    this.enrolled = bool
  })

    this._service.getOtherData("assignment/"+this.courseId).subscribe(data=>{
      console.log(data);
      this.assignmentsList = data;
  })


  }

  goBack(){
    this.location.back();
  }

  enroll(){
    console.log(this.studentId);
    this.enrolled = true;
    
  if(this.studentId)
    this._service.putData('student/'+this.studentId,{courseId:this.courseId}).subscribe(data=>{
      console.log(data);
      this.enrolled = true;
  })
  else{
    this.authService.studentIdListner.subscribe(studentId=>{
      this.studentId = studentId;
  })
  }
    
  }


  files: File[] = [];

  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  submitAssignement(){

    let formData = new FormData;
    formData.append("courseId",this.courseId);
    formData.append("studentId",this.studentId);
    formData.append("image",this.files[0],this.files[0].name);

    this._service.postData('studentSubmission',formData).subscribe(data=>{
        this.snackBar.open("Successfully Submitted", "", {
          duration: 2000,
       });
    },
    error=>{
      this.snackBar.open("Not Submitted,Try again", "", {
        duration: 2000,
     });
    })

  }

  download(url:any) {
    const a = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop()
    console.log(a.download)
    a.target = '_blank'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }


}
