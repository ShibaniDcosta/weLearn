import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from "../../environments/environment"
import { BehaviorSubject, Subject } from 'rxjs';
import { Courses } from '../courses';

let BACKEND_URl=environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) {

   }

// httpParams = new HttpParams().set('ssl', 'false');

// options = { params: this.httpParams };


  getdata(endPoint:string){
  return this.http.get<Courses[]>(BACKEND_URl+endPoint);
  }

  getdataparams(endPoint:string,params:Object){
    return this.http.get<Courses[]>(BACKEND_URl+endPoint,params);
  }


  getOtherData(endPoint:string){
    return this.http.get<any>(BACKEND_URl+endPoint);
   }



  postData(endPoint:string,data:any){
   return this.http.post( BACKEND_URl+endPoint,data);
  }
  putData(endPoint:string,data:any){
    return this.http.put( BACKEND_URl+endPoint,data);
   }


  learning(endPoint:string,data:any){
    return this.http.post<any[]>( BACKEND_URl+endPoint,data);
   }

  customPost(endPoint:string,data:any){
    return this.http.post<Courses[]>( BACKEND_URl+endPoint,data);
   }

   

  deleteData(endPoint:string,id:any){
    return this.http.delete(BACKEND_URl+endPoint+'/'+id);
  }
  
}
