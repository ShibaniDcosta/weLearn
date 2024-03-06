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
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {





  type:string ='';
  crud:string= '';
  
  instructorIdFormControl = new FormControl('', [
    Validators.required
  ]);

  instructorNameFormControl= new FormControl('', [
    Validators.required
  ])

  aboutFormControl = new FormControl('', [
    Validators.required
  ]);

  instructorEmailFormControl = new FormControl('', [
    Validators.required
  ]);


  departmentFormControl= new FormControl('', [
    Validators.required
  ])






  group_id = new FormControl();
  selectedRole:string ='';
  groupList: string[] = ["Wally", "Bills"];



  instructorIdMatcher = new MyErrorStateMatcher();
  instructorNameMatcher= new MyErrorStateMatcher();
  departmentMatcher = new MyErrorStateMatcher();
  instructorEmailMatcher = new MyErrorStateMatcher();
  aboutMatcher = new MyErrorStateMatcher();

  constructor(  private _service:ApiService, public dialogRef: MatDialogRef<AddFormComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.type=this.data.type;
    this.crud=this.data.crud;


    if(this.data.InstructorId){
      this.instructorIdFormControl.setValue(this.data.InstructorId);
      this.instructorNameFormControl.setValue(this.data.InstructorName);      
      this.aboutFormControl.setValue(this.data.About);
      this.instructorEmailFormControl.setValue(this.data.InstructorEmail);
      this.departmentFormControl.setValue(this.data.Department);     
      this.instructorEmailFormControl.setValue(this.data.InstructorEmail)
    }
    
  }

  submitForm(){
    let userInput:any;

      userInput={
        instructorID:  this.instructorIdFormControl.value,
        instructorName: this.instructorNameFormControl.value,
        about: this.aboutFormControl.value,
        department:  this.departmentFormControl.value,
        instructorEmail:  this.instructorEmailFormControl.value,

      }


      this._service.putData('instructor/'+this.data._id,userInput).subscribe(res=>{
        console.log("posted successfully");
        this.dialogRef.close(userInput);  
      })
         

  }


}
