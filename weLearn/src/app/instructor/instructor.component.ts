import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ApiService } from '../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Courses} from '../courses';
import { CourseFormComponent } from '../course-form/course-form.component';
import { CreateCourseComponent } from '../create-course/create-course.component';
import { Location } from '@angular/common'



const ELEMENT_DATA: Courses[] = [
  
  {courseNumber: '1', courseName: 'Course 1',  courseLink:'Som elink',courseDescription:"",courseInstructor:""},
  {courseNumber: '1', courseName: 'Course 2', courseLink:'Som elink',courseDescription:"",courseInstructor:""},
  {courseNumber: '1', courseName: 'Course 3', courseLink:'Som elink',courseDescription:"",courseInstructor:""},
];

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {

  displayedColumns: string[] = ['courseNumber','courseName'];
  columnsToDisplay: string[] = ['courseNumber','courseName','Actions'];


  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  courseInstructor: any;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private _dialog: MatDialog,private location: Location,private _router: Router, private _service:ApiService,private route: ActivatedRoute) {
    this.dataSource = new MatTableDataSource( ELEMENT_DATA);
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      this.courseInstructor = params['id'];
    } );
    
    // this.displayedColumns=  this.displayedColumns.concat(['myExtraColumn']);
    this._service.postData('instructor/getCourse',{"courseInstructor":this.courseInstructor}).subscribe((data:any)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }


  newCourse(){
    let dialogdata={
      crud:"Create Course",
      type:"Create",
      courseInstructor:this.courseInstructor
      
    }

    const dialogRef=this._dialog.open(CourseFormComponent,{panelClass: 'myapp-no-padding-dialog',
        data: dialogdata,
        height: '610px',
        width: '500px',
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this._service.postData('instructor/getCourse',{"courseInstructor":this.courseInstructor}).subscribe((data:any)=>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      })
    });

  }

  viewCourse(row:any){
    console.log(row);
    let dialogdata={
      crud:"Details",
      "courseInstructor":this.courseInstructor,
      "courseNumber": row.courseNumber, 
      "courseName": row.courseName,  
      "about":row.about,
      "courseDescription": row.courseDescription,
      "skills":row.skills,
      "requirements": row.requirements
    }

    const dialogRef=this._dialog.open(CourseFormComponent,{panelClass: 'myapp-no-padding-dialog',
        data: dialogdata,
        height: '610px',
        width: '600px',
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this._service.postData('instructor/getCourse',{"courseInstructor":this.courseInstructor}).subscribe((data:any)=>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      })
    });

  }

  editCourse(row:any){


    let dialogdata={
      crud:"Update Course",
      type:"Update",
      "courseInstructor":this.courseInstructor,
      "_id":row._id,
      "courseNumber" : row.courseNumber, 
      "courseName": row.courseName, 
      "about":row.about,
      "courseDescription": row.courseDescription,
      "skills":row.skills,
      "requirements": row.requirements
    }

    const dialogRef=this._dialog.open(CourseFormComponent,{panelClass: 'myapp-no-padding-dialog',
        data: dialogdata,
        height: '610px',
        width: '600px',
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this._service.postData('instructor/getCourse',{"courseInstructor":this.courseInstructor}).subscribe((data:any)=>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      })
    });
 
  }

  deleteCourse(row:any){
    console.log(row._id);
    this._service.deleteData('courses',row._id).subscribe(()=>{
      console.log("Record deleted");
      this._service.postData('instructor/getCourse',{"courseInstructor":this.courseInstructor}).subscribe((data:any)=>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      })
    })
  }

  goBack(){
    this.location.back();
  }

  goTo(row:any){
    this._router.navigate(['/enrolled/'+row._id]);
  }



  

}
