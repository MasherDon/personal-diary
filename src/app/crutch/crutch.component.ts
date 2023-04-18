import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-crutch',
  templateUrl: './crutch.component.html',
  styleUrls: ['./crutch.component.css']
})
export class CrutchComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/']).then();
    },2500);
  }
}
