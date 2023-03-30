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
  sigIn!: boolean;
  restore: boolean = false;

  onRestore() {
    this.restore = true;
    setInterval(() => this.active = 2,100);
  }

  changes() {
    if (this.active !== 2) {
      this.restore = false;
    }
  }

  ngOnChanges() {
    this.sigIn = this.authService.getSigIn();
    this.active = this.sigOrReg;
  }

  // ngOnInit() {
  //
  // }
}
