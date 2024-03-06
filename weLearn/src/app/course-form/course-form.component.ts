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
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  type:string ='';
  crud:string= '';
  selectedFile: any;

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

  constructor(  private _service:ApiService, public dialogRef: MatDialogRef<CourseFormComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.type=this.data.type;
    this.crud=this.data.crud;
    if(this.data.courseNumber){


      this.courseNumberFormControl.setValue(this.data.courseNumber);
      this.courseNameFormControl.setValue(this.data.courseName);      
      this.aboutCourseFormControl.setValue(this.data.about);
      this.descriptionFormControl.setValue(this.data.courseDescription);
      this.skillsFormControl.setValue(this.data.skills);      
      this.requirementsFormControl.setValue(this.data.requirements);
    }
    
  }

  submitForm(){
    let userInput:any;



      let formData = new FormData;
      formData.append("courseInstructor",this.data.courseInstructor);
      formData.append("id", this.data._id);
      formData.append("courseNumber",  this.courseNumberFormControl.value);
      formData.append("courseName", this.courseNameFormControl.value);
      formData.append("about", this.aboutCourseFormControl.value);
      formData.append("courseDescription",  this.descriptionFormControl.value);
      formData.append("skills",  this.skillsFormControl.value);
      formData.append("requirements", this.requirementsFormControl.value);
      formData.append("image",this.selectedFile,this.selectedFile.filename);


      if(this.type == 'Create'){
        console.log("create")
        console.log(FormData)
        this._service.postData('courseCreate',formData).subscribe(res=>{
          console.log("posted successfully");
          this.dialogRef.close(formData);  
        })

      }
      if(this.type == 'Update'){
        this._service.putData('courses/'+this.data._id,formData).subscribe(res=>{
          console.log("posted successfully");
          this.dialogRef.close(formData);  
        })

      }
      
         

  }


  onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0] ?? null;
      console.log(this.selectedFile);

  }


  

}
