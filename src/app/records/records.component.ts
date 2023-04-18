import { Component, Inject, Input, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { RecordsService } from "../service/records.service";
import { Record } from "../interface/record";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { ThemeService } from "../service/theme.service";
import { AuthService } from "../service/auth.service";
import { VirtualScroller } from 'primeng/virtualscroller';

import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})

export class RecordsComponent {
  constructor(@Inject(DOCUMENT) public document: Document, private recordsService: RecordsService, private fireAuth: AngularFireAuth,
              public router: Router, public themeService: ThemeService, private authService: AuthService) {}

  records!: Record[];
  virtualRecord!: Record[];
  notFound!: boolean;

  @Input() sigIn!: boolean;
  @ViewChild('Records') RecordsList!: VirtualScroller;

  ngOnInit() {
    this.start();
  }

  ngOnChanges() {
    this.start();
  }

  start() {
    this.notFound = false;
    let records;
    this.fireAuth.authState.subscribe(async user => {
      if (user) {
        // @ts-ignore
        records = await this.recordsService.getAllRecordsBDArray(user.uid);
      } else {
        records = await this.recordsService.getAllRecords();
      }
      if (records?.length) {
        // @ts-ignore
        records = records.sort(this.sorting);
        for(let n = 0; n < records.length; n++ ) {

          records[n].date = new Date(records[n].date);

          if (records[n].title.length>12) {
            records[n].title = records[n].title.slice(0, 11) + '...';
          } else {
            records[n].title = records[n].title.slice(0, 11);
          }
        }
        this.records = records;
        this.virtualRecord = Array.from({ length: records.length });
      } else {
        this.notFound = true;
      }
    });
  }

  // @ts-ignore
  sorting(a: Record, b: Record) {
      if (a.date > b.date) return 1;
      if (a.date < b.date) return -1;
  }

  reset() {
    this.RecordsList.scrollToIndex(0, 'smooth');
  }

  delete(syllable: string) {
    if (this.authService.getSigIn()) {
      this.recordsService.deleteRecordBD(syllable).then(() => {
        this.deleteFunction(syllable);
      });
    } else {
      this.recordsService.deleteRecord(syllable).then(() => {
        this.deleteFunction(syllable);
      });
    }
  }

  deleteFunction(syllable: string) {
    const records = [];
    const virtualRecords = [];
    for(let n = 0; n < this.records.length; n++ ) {
      if (this.records[n].syllable !== syllable) {
        records.push(this.records[n]);
        virtualRecords.push(this.virtualRecord[n]);
      }
    }
    this.records = records;
    this.virtualRecord = virtualRecords;
    this.notFound = !this.records.length;
  }

  edit(syllable: string) {
    this.router.navigate(['/record', syllable],{queryParams: {edit: true}}).then();
  }

  height() {
    const cap = document.getElementById('cap') as HTMLLinkElement;
    return `${document.documentElement.clientHeight - cap.offsetHeight}px`
  }

  width() {
    return document.documentElement.clientWidth/2>600?`${document.documentElement.clientWidth/2}px`:'600px'
  }

  date(date: number) {
    return new Date(date);
  }

  loadCarsLazy(event: LazyLoadEvent) {
    setTimeout(() => {
      // @ts-ignore
      let loadedRecord = this.records.slice(event.first, event.first + event.rows);
      // @ts-ignore
      Array.prototype.splice.apply(this.virtualRecord,[...[event.first, event.rows],...loadedRecord]);
      // @ts-ignore
      event.forceUpdate();
    },1000);
  }
}
