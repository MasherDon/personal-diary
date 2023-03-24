import { Component, Input } from '@angular/core';
import { MessageService } from "primeng/api";
import { ToastService } from "../toast.service";
import { Toast } from "../toast";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  providers: [MessageService, ToastService]
})

export class ToastComponent {
  constructor(public messageService: MessageService, public toastService: ToastService) {}

  @Input() data!: Toast;

  // ngOnInit() {
  //   if(this.toastService.getQuestions()) {
  //     setTimeout(() =>this.showConfirm(),1000);
  //   }
  // }

  ngOnChanges() {
    if(this.data.notRegister) {
      this.toastService.setToast('notRegister',false);
      setTimeout(() =>this.ofNotRegister(),1);
    }
  }

  close() {
    this.onNotRegister();
  }

  sig() {
    this.onNotRegister();
    this.toastService.setSigOrReg(true,false);
  }

  reg() {
    this.onNotRegister();
    this.toastService.setSigOrReg(true,true);
  }

  ofNotRegister() {
    this.messageService.add({key: 'notRegister', sticky: true, severity:'warn'});
  }
  onNotRegister() {
    this.messageService.clear('notRegister');
  }
}
