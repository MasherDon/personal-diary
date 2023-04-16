import { Component, Inject, Input } from '@angular/core';
import { ThemeService } from "../service/theme.service";
import { Record } from "../interface/record";
import { Page } from "../interface/page";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { RecordsService } from "../service/records.service";

// @ts-ignore
import { PageFlip } from 'page-flip';

import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-book-records',
  templateUrl: './book-records.component.html',
  styleUrls: ['./book-records.component.css']
})

export class BookRecordsComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public themeService: ThemeService, private angularFireAuth: AngularFireAuth,
              private recordsService: RecordsService) {}

  @Input() sigIn!: boolean;
  @Input() theme!: boolean;

  editorJsHTML = require("editorjs-html");
  edJsParser = this.editorJsHTML();

  pageFlip: PageFlip;

  records!: Record[]
  htmlRecord: Page[] = [];

  notFound: boolean = false;

  ngOnInit() {
    this.startBook().then(async () => {
      this.angularFireAuth.authState.subscribe(async user => {
        if (user) {
          // @ts-ignore
          this.records = await this.recordsService.getAllRecordsBDArray(user.uid)
        } else {
          this.records = await this.recordsService.getAllRecords();
        }
        await this.setHtml();
      });
    });
  }

  ngOnChanges() {

  }

  async startBook() {
    this.pageFlip = await new PageFlip(document.getElementById('book'), {
      width: 561,
      height: 675.5,
      size: "fixed",

      // minWidth: 561,
      // maxWidth: 561,
      // minHeight: 675.5,
      // maxHeight: 675.5,

      drawShadow: !this.themeService.getThemeBool(),
      flippingTime: 800,

      maxShadowOpacity: 0.3,
      showCover: true,
      mobileScrollSupport: false,
    });
    await this.pageFlip.loadFromHTML(document.querySelectorAll('.page'));
  }

  async setHtml() {
    const htmlArray = [];
    const html = [];
    for (let n = 0; n < this.records.length; n++) {
      for(let i = 0; i < this.records[n].text.length; i++) {
        const page = await this.edJsParser.parse(this.records[n].text[i]);
        htmlArray.push(page.join(''));
      }
    }
    for (let n = 0; n < htmlArray.length; n++) {
      html.push({html: htmlArray[n], page: n});
    }
    this.htmlRecord = html;
    setTimeout(() => {
      //this.pageFlip.updateFromHtml(document.querySelectorAll('.page'));
    })
  }

  leftOrRight(item: number) {
    return !(item % 2);
  }

  height() {
    const cap = document.getElementById('cap') as HTMLLinkElement;
    return `${document.documentElement.clientHeight - cap.offsetHeight - 16}px`
  }
}
