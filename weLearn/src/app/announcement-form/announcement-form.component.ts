import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyErrorStateMatcher } from '../add-form/add-form.component';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.scss']
})
export class AnnouncementFormComponent implements OnInit {
  selectedFile: any;

  TitleFormControl = new FormControl('', [
    Validators.required
  ]);

  descriptionFormControl= new FormControl('', [
    Validators.required
  ])

  TitleMatcher = new MyErrorStateMatcher();
  descriptionMatcher= new MyErrorStateMatcher();

  constructor(  private _service:ApiService, public dialogRef: MatDialogRef<AnnouncementFormComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {

  }

  submitForm(){
    let userInput:any;

      userInput={
        _Id : this.data.courseId,
        subject:  this.TitleFormControl.value,
        description: this.descriptionFormControl.value,
      }

      console.log(userInput);


      this._service.postData('annoouncement',userInput).subscribe(res=>{
        console.log("posted successfully");
        this.dialogRef.close(userInput);  
      })
         

  }


}

