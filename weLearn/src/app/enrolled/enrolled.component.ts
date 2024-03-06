import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ApiService } from '../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StudentFormComponent } from '../student-form/student-form.component';
import { AssignmentFormComponent } from '../assignment-form/assignment-form.component';
import { AnnouncementFormComponent } from '../announcement-form/announcement-form.component';
import { Location } from '@angular/common'


export interface Students{
  studentId:string;
  studentName: string;
  studentMajor:string;
  assignmentSubmitted:Object;
  coursesselected:Object;
  studentEmail:string;
  grade:string;
}

const ELEMENT_DATA: Students[] = [
  
  {studentId: '1', studentName: 'Nikhil 1',  studentMajor:'CS',assignmentSubmitted:"",coursesselected:"",studentEmail:"nniki@gmail.com",grade:"10"},
  {studentId: '1', studentName: 'RAJU 2', studentMajor:'CS',assignmentSubmitted:"",coursesselected:"",studentEmail:"nniki12123@gmail.com",grade:"10"},
  {studentId: '1', studentName: 'Shibu 3', studentMajor:'CS',assignmentSubmitted:"",coursesselected:"",studentEmail:"sjhiba@gmail.com",grade:"10"},
];

@Component({
  selector: 'app-enrolled',
  templateUrl: './enrolled.component.html',
  styleUrls: ['./enrolled.component.scss']
})
export class EnrolledComponent implements OnInit {

  displayedColumns: string[] = ['studentId','studentName','grade'];
  columnsToDisplay: string[] = ['studentId','studentName','grade','Actions'];


  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  // courseID = "12345666";
  courseID = "";


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
      console.log("this is enrolled");
      this.courseID = params['id'];
      console.log(this.courseID);
    } );


    this._service.getOtherData('student/courseStudent/'+this.courseID).subscribe((data:any)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }



  newAnnouncement(){

    let dialogdata={
      "courseId": this.courseID, 
    }

    const dialogRef=this._dialog.open(AnnouncementFormComponent,{panelClass: 'myapp-no-padding-dialog',
        data: dialogdata,
        height: '470px',
        width: '500px',
    });

  }

  newAssignemnt(){

    let dialogdata={
      "courseId": this.courseID, 
    }

    const dialogRef=this._dialog.open(AssignmentFormComponent,{panelClass: 'myapp-no-padding-dialog',
        data: dialogdata,
        height: '470px',
        width: '500px',
    });


  }



  viewCourse(row:any){
    console.log(row);
    let dialogdata={
      crud:"Details",
      "studentId" : row.studentId, 
      "studentName": row.studentName, 
      "studentMajor":row.studentMajor,
      "studentEmail":row.studentEmail,
      "grade":row.grade
    }

    const dialogRef=this._dialog.open(StudentFormComponent,{panelClass: 'myapp-no-padding-dialog',
        data: dialogdata,
        height: '610px',
        width: '600px',
      });
  }

  editCourse(row:any){


    let dialogdata={
      crud:"Update Student",
      "_id": row._id,
      "studentId" : row.studentId, 
      "studentName": row.studentName, 
      "studentMajor":row.studentMajor,
      "studentEmail":row.studentEmail,
      "grade":row.grade
    }

    const dialogRef=this._dialog.open(StudentFormComponent,{panelClass: 'myapp-no-padding-dialog',
        data: dialogdata,
        height: '610px',
        width: '600px',
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this._service.getOtherData('student/courseStudent/'+this.courseID).subscribe((data:any)=>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      })
    });
 
  }

  deleteCourse(row:any){
    console.log(row.CourseNumber);
    this._service.deleteData('/aviation/data/',row.CourseNumber).subscribe(()=>{
      console.log("Record deleted");
      this._service.getdataparams('/aviation/data',{params:{"page_size":1000,"page_num":1}}).subscribe((data:any)=>{
        this.dataSource = new MatTableDataSource(data["data"]);
        this.dataSource.paginator = this.paginator;
      })
    })
  }


  downloadAssignment(row:any){

    if(row.assignmentSubmitted.length != 0){
      let arr = row.assignmentSubmitted;
      for (var val of arr) {
        if(this.courseID == val['courseId']){
          let url = val['submissionLink']
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
       
    }

  }

  goBack(){
    this.location.back();
  }



}

