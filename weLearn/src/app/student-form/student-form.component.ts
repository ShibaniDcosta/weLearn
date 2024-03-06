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
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  type:string ='';
  crud:string= '';


  
  
  studentIdFormControl = new FormControl('', [
    Validators.required
  ]);

  studentNameFormControl = new FormControl('', [
    Validators.required
  ]);

  studentMajorFormControl = new FormControl('', [
    Validators.required
  ]);

  studentEmailFormControl= new FormControl('', [
    Validators.required
  ])

  gradeFormControl= new FormControl('', [

  ])





  group_id = new FormControl();
  selectedRole:string ='';
  groupList: string[] = ["Wally", "Bills"];

  studentIdMatcher = new MyErrorStateMatcher();
  studentEmailMatcher= new MyErrorStateMatcher();
  studentMajorMatcher= new MyErrorStateMatcher();
  studentNameMatcher= new MyErrorStateMatcher();

  
  srcResult: any;

  constructor(  private _service:ApiService, public dialogRef: MatDialogRef<StudentFormComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.type=this.data.type;
    this.crud=this.data.crud;
    if(this.data.studentId){


      this.studentNameFormControl.setValue(this.data.studentName);
      this.studentMajorFormControl.setValue(this.data.studentMajor);      
      this.studentIdFormControl.setValue(this.data.studentId);
      this.studentEmailFormControl.setValue(this.data.studentEmail);    
      this.gradeFormControl.setValue(this.data.grade);      
  
    }
    
  }

  submitForm(){
    let userInput:any;

      userInput={
        studentName:  this.studentNameFormControl.value,
        studentMajor: this.studentMajorFormControl.value,
        studentId: this.studentIdFormControl.value,
        studentEmail:  this.studentEmailFormControl.value,
        grade: this.gradeFormControl.value,
      }


      this._service.putData('student/update/'+this.data._id,userInput).subscribe(res=>{
        console.log("posted successfully");
        this.dialogRef.close(userInput);  
      })
         

  }

  selectedFile: any = null;

  onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0] ?? null;
      console.log(this.selectedFile);

  }

}

