import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ApiService } from '../api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddFormComponent } from '../add-form/add-form.component';


export interface InstructorData{
  InstructorId: string;
  InstructorName: string;

}

const ELEMENT_DATA: InstructorData[] = [
  
  {InstructorId: '1', InstructorName: 'Kurt'},
  {InstructorId: '2', InstructorName: 'Amr Sabry'},
  {InstructorId: '3', InstructorName: 'Zuhang Xang'},
  {InstructorId: '4', InstructorName: 'Oleg'},
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  @Output() goBack = new EventEmitter<boolean>();
  displayedColumns: string[] = ['instructorID','instructorName'];
  columnsToDisplay: string[] = ['instructorID','instructorName','Actions'];


  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private _dialog: MatDialog,private _router: Router, private _service:ApiService, private router: Router) {
    this.dataSource = new MatTableDataSource( ELEMENT_DATA);
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this

    this._service.getdata('instructor').subscribe((data:any)=>{

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }


  addNewInstructor(){
    let dialogdata={
      crud:"Add Instructor",
      
    }

    const dialogRef=this._dialog.open(AddFormComponent,{panelClass: 'myapp-no-padding-dialog',
        data: dialogdata,
        height: '610px',
        width: '500px',
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this._service.getdata('instructor').subscribe((data:any)=>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      })
    });

  }

  

  viewInstructor(row:any){
    console.log(row);


    let dialogdata={
      crud:"Details",
      "_id":row._id,
      "InstructorId": row.instructorID, 
      "InstructorName": row.instructorName, 
      "About":row.about,
      "InstructorEmail":row.instructorEmail,
      "Department":row.department,

    }

    const dialogRef=this._dialog.open(AddFormComponent,{panelClass: 'myapp-no-padding-dialog',
        data: dialogdata,
        height: '610px',
        width: '600px',
      });
  }

  editInstructor(row:any){


    let dialogdata={
      crud:"Update Instructor",
      "_id":row._id,
      "InstructorId": row.instructorID, 
      "InstructorName": row.instructorName, 
      "About":row.about,
      "InstructorEmail":row.instructorEmail,
      "Department":row.department,
  
    }

    const dialogRef=this._dialog.open(AddFormComponent,{panelClass: 'myapp-no-padding-dialog',
        data: dialogdata,
        height: '610px',
        width: '600px',
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this._service.getdata('instructor').subscribe((data:any)=>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      })
    });
 
  }

  deleteInstructor(row:any){
    console.log(row.instructorID);
    this._service.deleteData('instructor',row._id).subscribe(()=>{
      console.log("Record deleted");
      this._service.getdataparams('instructor',{params:{"page_size":1000,"page_num":1}}).subscribe((data:any)=>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      })
    })
  }

  fetchCourses(row:any){
    console.log(row)
    this.displayedColumns = ['CourseId','CourseName', 'Location','InjurySeverity', 'Broadphaseofflight'];
    this.columnsToDisplay = ['CourseId','CourseName','Actions'];
    let ELEMENT_DATA2: any[] = [
  
      {CourseId: '1', CourseName: 'Course1'},
      {CourseId: '2', CourseName: 'Course2'},
      {CourseId: '3', CourseName: 'Course3'},
      {CourseId: '4', CourseName: 'Course4'},
    ];
    this.dataSource= new MatTableDataSource(ELEMENT_DATA2);
  }


  goTo(row:any){
    console.log(row.InstructorName);
    this.router.navigate(['/instructor/'+row.instructorName]);

  }

}
