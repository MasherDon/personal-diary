import { Component } from '@angular/core';
import { SidebarIs } from "../interface/sidebarIs";
import { ToastService } from "../service/toast.service";
import { StartTranslateService } from "../service/startTranslate.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-cap',
  templateUrl: './cap.component.html',
  styleUrls: ['./cap.component.css']
})

export class CapComponent {
  constructor(public toastService: ToastService, public startTranslateService: StartTranslateService, public authService: AuthService) {}
  onSidebar: SidebarIs = {
    onWin: false,
    sigOrReg: 0
  }

  // ngOnInit() {
  //
  // }
  //
  // ngOnChanges() {
  //
  // }

  changeSigOrReg(sigOrReg: number) {
    this.onSidebar.onWin = true;
    this.onSidebar.sigOrReg = sigOrReg;
  }
}
