import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarIs } from "../interface/sidebarIs";
import { UserData } from "../interface/userData";
import { AuthService } from "../service/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})

export class SidebarComponent {
  constructor(public authService: AuthService) {}

  @Input() userDate!: UserData;
  @Input() onSidebar!: SidebarIs;
  @Input() sigOrReg!: number;
  @Output() closeWin = new EventEmitter();

  active: number = 0;

  ngOnChanges() {
    this.active = this.sigOrReg;
  }

  onRestore() {
    this.active = 2;
  }

  onInPut() {
    this.active = 0;
  }

  exitSidebar() {
    this.onSidebar.onWin = false;
  }
}
