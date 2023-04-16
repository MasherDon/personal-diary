import { Component, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { ThemeService } from "../service/theme.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})

export class NotFoundComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public themeService: ThemeService) {}

  //calc(100vh - 66px)

  setHeight() {
    const cap = document.getElementById('cap') as HTMLLinkElement;
    return `${document.documentElement.clientHeight - cap.offsetHeight}px`
  }
}
