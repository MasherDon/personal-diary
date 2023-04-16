import { Component } from '@angular/core';
import { StartTranslateService } from "../service/startTranslate.service";
import {ThemeService} from "../service/theme.service";

@Component({
  selector: 'app-editor-add-record',
  templateUrl: './editor-add-record.component.html',
  styleUrls: ['./editor-add-record.component.css']
})

export class EditorAddRecordComponent {
  constructor(public translateService: StartTranslateService, public themeService: ThemeService) {}

}
