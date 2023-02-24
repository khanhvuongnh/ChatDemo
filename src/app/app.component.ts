import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from './service/chat.service';

export interface ResultInterface {
  message: string,
  sender: string,
  time: Date
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
  mess: string = '';
  typing: boolean = false;
  listRes: ResultInterface[] = [];
  scrollTo: Element | undefined;
  // @ViewChild('messLoc') private messLoc: ElementRef
  constructor(private service: ChatService) {

  }
  ngAfterViewInit(): void {
    this.scrollTo = document.getElementById('mess')!;
    console.log(this.scrollTo);
  }
  ngOnInit(): void {


  }
  title = 'Chat';

  callAPI() {
    let messToSend: string = this.mess;
    this.listRes.push({ message: this.mess, sender: 'self', time: new Date() })
    // this.scrollTo!.scrollTop = this.scrollTo!.scrollHeight;
    window.scrollTo(0, 999999999999999);
    this.typing = true;
    this.mess = '';
    this.service.callAPI(messToSend).subscribe({
      next: (res: any) => {
        this.listRes.push({ message: res.result, sender: 'other', time: new Date() })
        window.scrollTo(0, 999999999999999);
        this.typing = false;
      },
      error: (errr) => {
        console.log(errr);
      }
    })
  }

}
