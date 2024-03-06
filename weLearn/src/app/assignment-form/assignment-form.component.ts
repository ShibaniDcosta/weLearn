import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format } from 'path';
import { MyErrorStateMatcher } from '../add-form/add-form.component';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.scss']
})
export class AssignmentFormComponent implements OnInit {
  selectedFile: any;

  assignmentTitleFormControl = new FormControl('', [
    Validators.required
  ]);

  descriptionFormControl= new FormControl('', [
    Validators.required
  ])

  assignmentTitleMatcher = new MyErrorStateMatcher();
  descriptionMatcher= new MyErrorStateMatcher();

  constructor(  private _service:ApiService, public dialogRef: MatDialogRef<AssignmentFormComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {

  }

  submitForm(){
    let userInput:any;

    let formData = new FormData;
    formData.append("courseId",this.data.courseId);
    formData.append("title",this.assignmentTitleFormControl.value);
    formData.append("description",this.descriptionFormControl.value);
    formData.append("image",this.selectedFile,this.selectedFile.filename);

  


      this._service.postData('courseAssignment',formData).subscribe(res=>{
        console.log("posted successfully");
        this.dialogRef.close(formData);  
      })
         

  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    console.log(this.selectedFile);
  }

}
