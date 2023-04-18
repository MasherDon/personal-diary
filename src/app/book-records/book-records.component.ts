import { Component, Inject, Input } from '@angular/core';
import { ThemeService } from "../service/theme.service";
import { Record } from "../interface/record";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { RecordsService } from "../service/records.service";
import { Router } from "@angular/router";

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
              private recordsService: RecordsService, public router: Router) {}

  @Input() sigIn!: boolean;

  editorJsHTML = require("editorjs-html");
  edJsParser = this.editorJsHTML();

  pageFlip: PageFlip;

  records!: Record[]

  notFound: boolean = false;
  bottom: boolean = false;
  not: boolean = false;

  first: number = 2;

  ngOnInit() {
    this.start();
  }

  ngOnChanges() {
    if (this.not) {
      this.router.navigate(['/record']).then();
    }
  }

  start() {
    this.startBook().then(async () => {
      let records;
      this.angularFireAuth.authState.subscribe(async user => {
        if (user) {
          // @ts-ignore
          records = await this.recordsService.getAllRecordsBDArray(user.uid)
        } else {
          records = await this.recordsService.getAllRecords();
        }
        if (records.length) {
          // @ts-ignore
          this.records = records.sort(this.sorting);
          await this.setHtml();
        } else {
          this.notFound = true;
        }
        this.bottom = true;
        setTimeout(async () => {
          await this.pageFlip.updateFromHtml(document.querySelectorAll('.page'));
          this.not = true;
        }, 100);
        setTimeout(() => {
          this.pageFlip.flip(2, 'bottom');
        },1000);
      });
    });
  }

  onPageChange(event: any) {
    if (this.not) {
      if (this.themeService.getAnimBook()) {
        if (this.first > event.page) {
          this.pageFlip.flip(event.page, 'top');
        }
        if (this.first < event.page) {
          this.pageFlip.flip(event.page, 'bottom');
        }
      } else {
        this.pageFlip.turnToPage(event.page);
      }
      this.first = event.page;
    }
  }

  // @ts-ignore
  sorting(a: Record, b: Record) {
    if (a.date > b.date) return 1;
    if (a.date < b.date) return -1;
  }

  async startBook() {
    this.pageFlip = await new PageFlip(document.getElementById('book'), {
      width: 561,
      height: 675.5,
      size: "fixed",

      drawShadow: false,
      flippingTime: 800,
      swipeDistance: 15,
      maxShadowOpacity: 0.3,

      useMouseEvents: !this.themeService.getSwitchBook(),
      disableFlipByClick: true,

      showCover: true,
      mobileScrollSupport: false,
    });
    await this.pageFlip.loadFromHTML(document.querySelectorAll('.page'));
  }

  async setHtml() {
    let records = this.records;
    let page = 1;
    for (let n = 0; n < records.length; n++) {
      records[n].date = new Date(records[n].date);
      if (records[n].title.length>12) {
        records[n].title = records[n].title.slice(0, 11) + '...';
      } else {
        records[n].title = records[n].title.slice(0, 11);
      }
      for(let i = 0; i < records[n].text.length; i++) {
        records[n].text[i] = {html: (await this.edJsParser.parse(records[n].text[i]).join('')), pag: page};
        page++;
      }
    }
    if (!(page%2)) {
      records[records.length-1].text.push({html: '', pag: page})
    }
    this.records = records;
  }

  leftOrRight(item: number) {
    return !(item % 2);
  }

  height() {
    const cap = document.getElementById('cap') as HTMLLinkElement;
    return `${document.documentElement.clientHeight - cap.offsetHeight}px`
  }
}
