import {Component, Input} from '@angular/core';
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  providers: [MessageService]

})
export class ToastComponent {

  @Input() question!: boolean;

  constructor(public messageService: MessageService) {}

  ngOnChanges() {
    if(this.question) this.showConfirm();
  }

  showConfirm() {
    this.messageService.add({key: 'notRegister', sticky: true, severity:'warn'});
  }

  onWin() {
    this.messageService.clear('notRegister');
  }

}
