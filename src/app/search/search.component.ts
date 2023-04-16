import { Component, Inject, ViewChild } from '@angular/core';
import { LazyLoadEvent } from "primeng/api";
import { VirtualScroller } from "primeng/virtualscroller";
import { Record } from "../interface/record";
import { RecordsService } from "../service/records.service";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {ActivatedRoute, Router} from "@angular/router";
import { ThemeService } from "../service/theme.service";
import { AuthService } from "../service/auth.service";
import { Tag } from "../interface/tag";

import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  constructor(@Inject(DOCUMENT) public document: Document, private recordsService: RecordsService, private fireAuth: AngularFireAuth,
              public router: Router, public themeService: ThemeService, private authService: AuthService, private activatedRoute: ActivatedRoute) {}

  @ViewChild('Records') RecordsList!: VirtualScroller;

  dateLang: Date[] = [];
  title: string = '';

  records!: Record[];
  virtualRecord!: Record[];

  notFound: boolean = false;

  saveBlock!: any;

  countries!: any[];
  selectedCountries!: Tag[];
  filteredCountries!: any[];

  ngOnInit() {
    // @ts-ignore
    const date = this.activatedRoute.queryParams['value']['date'];
    if (date) this.dateLang = [new Date(date), new Date(date)];
    // @ts-ignore
    const tag = this.activatedRoute.queryParams['value']['tag'];
    // @ts-ignore
    const title = this.activatedRoute.queryParams['value']['title'];
    if (title) this.title = title;
    this.fireAuth.authState.subscribe(async user => {
      if (user) {
        this.countries = await this.recordsService.getTagsBD(user.uid);
      } else {
        this.countries = await this.recordsService.getTags();
      }
      if (tag) {
        for(let n = 0; n < this.countries.length; n++) {
          if (this.countries[n]['tag'] === tag) this.selectedCountries = [this.countries[n]];
        }
      }
    });
  }

  filterCountry(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.tag.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        filtered.push(country);
      }
    }
    this.filteredCountries = filtered;
  }

  start() {
    this.notFound = false;
    let records: Record[] = [];
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

        if (this.selectedCountries?.length > 0) {
          records = this.searchTag(records);
        }

        if (this.dateLang?.length > 0) {
          records = this.searchDate(records);
        }

        if (this.title?.length > 0) {
          records = this.searchTitle(records);
        }

        for(let n = 0; n < records.length; n++ ) {
          records[n].date = new Date(records[n].date);
          if (records[n].title.length>12) {
            records[n].title = records[n].title.slice(0, 11) + ' ...';
          } else {
            records[n].title = records[n].title.slice(0, 11);
          }
        }
        if (this.records !== undefined) {
          const pop = [this.records[0], ...records];
          this.records = pop;
          this.virtualRecord = Array.from({ length: pop.length });
          setTimeout(()=> {
            this.records = records;
            if (!records?.length) this.notFound = true;
            this.virtualRecord = Array.from({ length: records.length });
          });
        } else {
          this.records = records;
          this.virtualRecord = Array.from({ length: records.length });
          if (!records?.length) this.notFound = true;
        }
      } else {
        this.notFound = true;
      }
    });
  }

  searchTitle(record: Record[]) {
    const pop = [];
    for (let n = 0; n < record.length; n++) {
      if (record[n].title.toLowerCase().indexOf(this.title.toLowerCase()) > -1) {
        pop.push(record[n])
      }
    }
    return pop;
  }

  searchDate(record: Record[]) {
    const pop = [];
    for (let n = 0; n < record.length; n++) {
      const day = new Date(record[n].date);
      if (this.dateLang[0].getFullYear() <= day.getFullYear() && day.getFullYear() <= this.dateLang[1].getFullYear() &&
        this.dateLang[0].getMonth() <= day.getMonth() && day.getMonth() <= this.dateLang[1].getMonth() &&
        this.dateLang[0].getDate() <= day.getDate() && day.getDate() <= this.dateLang[1].getDate()) {
        pop.push(record[n])
      }
    }
    return pop;
  }

  searchTag(record: Record[]) {
    const pop = [];
    for (let n = 0; n < record.length; n++) {
      let length = 0;
      for(let h = 0; h < this.selectedCountries.length; h++) {
        for (let i = 0; i < record[n].tag.length; i++) {
          if (record[n].tag[i].tag === this.selectedCountries[h].tag) {
            length++;
          }
        }
      }
      if (length === this.selectedCountries.length) {
        pop.push(record[n]);
      }
    }
    return pop;
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
    this.router.navigate(['/record', syllable, 'edit']).then();
  }

  height() {
    const search = document.getElementById('search') as HTMLLinkElement;
    const cap = document.getElementById('cap') as HTMLLinkElement;
    return `${document.documentElement.clientHeight - search.offsetHeight - cap.offsetHeight - 16}px`
  }

  width() {
    return document.documentElement.clientWidth/2>600?`${document.documentElement.clientWidth/2}px`:'600px'
  }

  click(event: any, syllable: any) {
    if (event.target !== event.currentTarget) return;
    this.router.navigate( ['/record', syllable]).then();
  }

  date(date: number) {
    return new Date(date);
  }

  setDate(date: any) {
    this.dateLang = [new Date(date), new Date(date)]
  }

  setTag(tag: string) {
    for(let n = 0; n < this.countries.length; n++) {
      if (this.countries[n]['tag'] === tag) this.selectedCountries = [this.countries[n]];
    }
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
