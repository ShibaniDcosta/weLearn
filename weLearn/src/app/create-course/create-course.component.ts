import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../api/api.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
  type:string ='';
  crud:string= '';
  
  aboutCourseFormControl = new FormControl('', [
    Validators.required
  ]);

  courseNumberFormControl = new FormControl('', [
    Validators.required
  ]);

  courseNameFormControl = new FormControl('', [
    Validators.required
  ]);

  skillsFormControl= new FormControl('', [
    Validators.required
  ])

  requirementsFormControl = new FormControl('', [
    Validators.required
  ]);

  descriptionFormControl = new FormControl('', [
    Validators.required
  ]);






  group_id = new FormControl();
  selectedRole:string ='';
  groupList: string[] = ["Wally", "Bills"];



  aboutCourseMatcher = new MyErrorStateMatcher();
  skillsMatcher= new MyErrorStateMatcher();
  courseNameMatcher= new MyErrorStateMatcher();
  courseNumberMatcher= new MyErrorStateMatcher();

  requirementsMatcher = new MyErrorStateMatcher();
  descriptionMatcher = new MyErrorStateMatcher();

  srcResult: any;

  constructor(  private _service:ApiService, public dialogRef: MatDialogRef<CreateCourseComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.type=this.data.type;
    this.crud=this.data.crud;

  }

  submitForm(){
    let userInput:any;

      userInput={
        CourseNumber:  this.aboutCourseFormControl.value,
        CourseName: this.skillsFormControl.value,
        Location: this.requirementsFormControl.value,
        Description:  this.descriptionFormControl.value,

      }


      this._service.postData('/aviation/data',userInput).subscribe(res=>{
        console.log("posted successfully");
        this.dialogRef.close(userInput);  
      })
         

  }

  selectedFile: any = null;

  onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0] ?? null;
      console.log(this.selectedFile);

  }


  // onFileSelected() {
  //   const inputNode: any = document.querySelector('#file');
  
  //   if (typeof (FileReader) !== 'undefined') {
  //     const reader = new FileReader();
  
  //     reader.onload = (e: any) => {
  //       this.srcResult = e.target.result;
  //       console.log(this.srcResult);
  //     };
  
  //     reader.readAsArrayBuffer(inputNode.files[0]);
  //   }
  // }
  

}
