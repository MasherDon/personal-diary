import { Component, Input } from '@angular/core';
import { UserData } from "../userData";
import { SigOrReg } from "../sigOrReg";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  @Input() data!: UserData;
  @Input() sigOrReg!: SigOrReg;
}
