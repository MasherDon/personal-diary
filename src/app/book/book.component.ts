import { Component } from '@angular/core';
import { AuthService } from "../service/auth.service";
import { ThemeService } from "../service/theme.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent {
  constructor(public authService: AuthService, public themeService: ThemeService) {}

}
