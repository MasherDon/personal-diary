import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from "primeng/api";
import {Toast} from "../interface/toast";
import {SidebarIs} from "../interface/sidebarIs";
import {ToastService} from "../service/toast.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  providers: [MessageService]
})

export class ToastComponent {
  constructor(public messageService: MessageService, public toastService: ToastService) {}

  @Input() onSidebar!: SidebarIs;
  @Input() dataToast!: Toast;
  @Output() clickButton = new EventEmitter();

  ngOnChanges() {
    if(this.dataToast.notRegister) {
      this.toastService.setToast('notRegister',false);
      setTimeout(() =>this.offNotRegister(),1);
    }
  }

  sig() {
    this.clickButton.emit(0)
    this.onNotRegister();
  }

  reg() {
    this.clickButton.emit(1)
    this.onNotRegister();
  }

  offNotRegister() {
    this.messageService.add({key: 'notRegister', sticky: true, severity:'warn'});
  }

  onNotRegister() {
    this.messageService.clear('notRegister');
  }
}
