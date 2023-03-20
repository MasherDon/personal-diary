import { Component } from '@angular/core';
import { PrimeNGConfig } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})

export class RecordsComponent {
  constructor(private config: PrimeNGConfig, private translateService: TranslateService) {
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }
  date: any;
}
