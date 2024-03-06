import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

let BACKEND_URl=environment.apiUrl;


interface Messages {
  username:string
  message:string 
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  username:string = 'username';
  message:string = '';
  messages:Messages[] = [];
  pusher:any;

  chatmessage:string ="";

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {

    Pusher.logToConsole = true;

    // nniki7888
    var pusher = new Pusher('a3abed38aec9002118fb', {
      cluster: 'us2'
    });

    var channel = pusher.subscribe('chat');
    channel.bind('message', (data:any) => {
      this.messages.push(data)
    });
  }


  submit(): void {
    console.log("submitted");
    console.log(this.message);
    console.log(this.username);

    this.http.post(BACKEND_URl+'messages', { 
      username: this.username,
      message: this.message
    }).subscribe(() => {
      console.log("response came form backend");
      this.message = ''
    });
    
  }

  chatSubmission(e:Event){
    console.log((e.target as HTMLTextAreaElement).value);
    console.log(this.messages);
    this.message = (e.target as HTMLTextAreaElement).value;
    // this.pusher.send_event("my-channel",this.message,"my-event");

    // this.pusher.trigger("my-channel", "my-event", this.message);
  }
  

}
