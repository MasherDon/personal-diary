import { Component } from '@angular/core';
import { StartTranslateService } from "../service/startTranslate.service";
import { ThemeService } from "../service/theme.service";

@Component({
  selector: 'app-editor-record',
  templateUrl: './editor-record.component.html',
  styleUrls: ['./editor-record.component.css']
})

export class EditorRecordComponent {
  constructor(public translateService: StartTranslateService, public themeService: ThemeService) {}

}
